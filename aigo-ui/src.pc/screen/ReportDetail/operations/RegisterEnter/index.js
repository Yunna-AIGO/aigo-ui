import React from 'react'
import { Modal, Button,Row,Col,Input } from 'antd';
import {Form, Icon, Select,} from 'antd';
import Currency from 'cathay-currency';
import fetch from "cathay-fetch";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {
        reportAccept,
        registerEnterData,
        saveRegisterEnterData
    } from '../../../../actions/reportDetail';
import Url from '../../../../actions/Url';
import cloneDeep from 'lodash/cloneDeep'

import {Table,Popconfirm} from 'antd';

const Option = Select.Option;

const confirm = Modal.confirm;
const FormItem = Form.Item;

function handleChange(value) {
    console.log(`selected ${value}`);
}

class RegisterEnter extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            newRegisterFormShow:'none',
            registerFormModalVisible:false,
            newRegisterRecord:[],
            popRegisterRecordIndex:0,
            tableFieldsConfig:[
                {
                    title:'险种',
                    dataIndex:'insuranceClass',
                    key:'insuranceClass'
                },
                {
                    title:'责任',
                    dataIndex:'accountability',
                    key:'accountability'
                },
                {
                    title:'保单号',
                    dataIndex:'policyNo',
                    key:'policyNo'
                },
                {
                    title:'免赔额',
                    dataIndex:'deductible',
                    key:'deductible'
                },
                {
                    title:'免赔率',
                    dataIndex:'deductibleRate',
                    key:'deductibleRate'
                },
                {
                    title:'立案金额',
                    dataIndex:'registerMoney',
                    key:'registerMoney',
                    render: (text, record) => (
                       <Currency>{text}</Currency>     
                    ),
                },
                {
                    title:'限额',
                    dataIndex:'coverage',
                    key:'coverage',
                    render: (text, record) => (
                       <Currency>{text}</Currency>     
                    ),
                }
            ],
            isSelected:true,
        };
    }

    toggleNewRegisterForm = () => {
        if(this.state.newRegisterFormShow){
            this.setState({
                newRegisterFormShow: '',
            });
        }
        else{
            this.setState({
                newRegisterFormShow: 'none',
            });
        }
    }

    componentDidMount(){
       
    }

    showRegisterFormModal=index=>{

        if(~index){
            this.props.form.setFieldsValue(this.state.newRegisterRecord[index])
        }
        else {
            this.props.form.resetFields()
        }
        this.setState({
            registerFormModalVisible:true,
            popRegisterRecordIndex:index,
        })
    }

    hideRegisterFormModal=()=>{
        this.setState({
            registerFormModalVisible:false,
        })
    }

    registerFormModalOk=()=>{
        this.props.form.validateFields((err,values)=>{
            if(!err){
                if(~this.state.popRegisterRecordIndex){
                    this.state.newRegisterRecord[this.state.popRegisterRecordIndex].insuranceClass=values.insuranceClass
                    this.state.newRegisterRecord[this.state.popRegisterRecordIndex].accountability=values.accountability
                    this.state.newRegisterRecord[this.state.popRegisterRecordIndex].registerMoney=values.registerMoney
                    this.state.newRegisterRecord[this.state.popRegisterRecordIndex].coverage=this.props.policyCoverageInfo.find(v=>v.name==values.insuranceClass).duties.find(v=>v.name==values.accountability).amt
                    this.props.form.resetFields()
                }
                else{
                    values.key=this.state.newRegisterRecord.length?this.state.newRegisterRecord[this.state.newRegisterRecord.length-1].key+1:0
                    values.deductibleRate='N/A'
                    values.deductible='N/A'
                    values.policyNo = this.props.policyNo
                    if (this.props.policyCoverageInfo.find(v=>v.name==values.insuranceClass).duties) {
                        if(values.accountability == undefined){
                            values.accountability = '';
                        }
                        values.coverage=this.props.policyCoverageInfo.find(v=>v.name==values.insuranceClass).duties.find(v=>v.name==values.accountability).amt
                    }else{
                        values.coverage=this.props.policyCoverageInfo.find(v=>v.name==values.insuranceClass).amt
                    }
                    
                    this.state.newRegisterRecord.push(values)
                }
                this.setState({
                    registerFormModalVisible:false,
                    newRegisterRecord:this.state.newRegisterRecord,
                })
            }
        })
    }

    deleteNewRegisterRecord=index=>{
        this.setState({
            newRegisterRecord:this.state.newRegisterRecord.filter((v,i)=>{
                return i!=index
            }),
        })
    }


    showConfirm(tableValue) {

        let obj ={};
        let _this = this;
        let tableData = this.state.newRegisterRecord;

        obj.registerList = cloneDeep(tableData);
        obj.policyNo = this.props.policyNo;
        obj.reportNo = this.props.reportNo;
        obj.actionId = 'ACTION_C30';
        obj.representation = this.state.textValue;

        confirm({
            content: '您确认要完成立案？',
            onOk() {

                var policyListInfo = cloneDeep(_this.props.policyCoverageInfo);

                policyListInfo.forEach((v,i)=>{
                    for(let i=0;i<obj.registerList.length;i++){
                        if(v.name == obj.registerList[i].insuranceClass){
                            obj.registerList[i].insuranceClass = v.code
                        }

                        for(let j=0;j<v.duties.length;j++){
                            if(obj.registerList[i].accountability && v.duties[j].code && obj.registerList[i].accountability == v.duties[j].name){
                                obj.registerList[i].accountability = v.duties[j].code
                            }
                        }
                    }
                })

                for(let i=0;i<obj.registerList.length;i++){
                    delete obj.registerList[i].surveyDesc;
                    delete obj.registerList[i].policyNo;
                    delete obj.registerList[i].key;
                    delete obj.registerList[i].deductible;
                    delete obj.registerList[i].deductibleRate;
                    delete obj.registerList[i].coverage;
                }

                fetch(Url.addRegisterInfo, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:JSON.stringify(obj)
                    }
                ).then(registerFinish => {
                        if (registerFinish.code == "200") {
                            window.location.href = '#/result-page/3';
                        } else {
                            Modal.error({
                                content: registerFinish.message?registerFinish.message:'立案完成'
                            });
                        }
                    })
            },
            onCancel() {

            }
        });
    }

    change(e){
        this.setState({
            textValue:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
    
        });
    }

    dutyChange = (value) => {
        this.setState({
            amt:(this.props.data.find(v=>v.name==this.props.form.getFieldValue('insuranceClass')).duties.find(v=>v.name==this.props.form.getFieldValue('accountability'))||{amt:''}).amt
        })
    }

    deleteTableRow = (index) => {
        const tableData = [...this.state.tableData];
        tableData.splice(index, 1);
        this.setState({ tableData });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const illustrateLayout = {
            labelCol: {span: 0},
            wrapperCol: {span: 24}
        };

        const provinceData = this.props.insuranceType;

        var tableValue;

        return (
            <div>
                <div style={{padding:'10px 0',fontSize:'18px'}}>立案信息</div>

                <Table
                    bordered
                    columns={[...this.state.tableFieldsConfig,{
							title: '操作',
							render: (text, record, index) => (
								<div>
									<a onClick={()=>{this.showRegisterFormModal(index)}}>修改 </a>
									<Popconfirm
										title="确定删除?"
										onConfirm={() => this.deleteNewRegisterRecord(index)}
									>
										<a href="#">删除</a>
									</Popconfirm>
								</div>
							)
						}]}
                    dataSource={this.state.newRegisterRecord}
                    style={{backgroundColor:'#fff'}}
                    pagination={false}
                    />
                <div>
                    <Button onClick={()=>{this.showRegisterFormModal(-1)}} style={{margin:'15px 0'}} >+新增</Button>
                </div>
            <Modal title="险种责任信息"
                   title={~this.state.popRegisterRecordIndex?"修改险种责任信息":"新增险种责任信息"}
                   visible={this.state.registerFormModalVisible}
                   onOk={this.registerFormModalOk}
                   onCancel={this.hideRegisterFormModal}
            >
                <Form style={{marginLeft:'60px'}}>
                    <Form.Item
                        key={1}
                        label={'保单号'}
                        labelCol={{span:6}}
                        wrapperCol={{span:14}}
                    >
                        <span>{this.props.policyNo}</span>
                    </Form.Item>
                    <Form.Item
                        required
                        label="险种"
                        labelCol={{span:6}}
                        wrapperCol={{span:14}}
                    
                        >
                        {this.props.form.getFieldDecorator('insuranceClass', {
                            rules: [
                                { required: true, message: '请选择' },
                                { max: 30, message: '内容过长'}
                            ],
                            initialValue:this.props.policyCoverageInfo[0].name,
                        })(
                            <Select  placeholder="请选择" onChange={value=>{
								this.props.form.setFieldsValue({accountability:this.props.policyCoverageInfo.find(v=>v.name==value).duties[0].name})
							}}>
                                {this.props.policyCoverageInfo.map((v,i)=>(
                                    <Select.Option value={v.name} key={i}>{v.name}</Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item
                        required
                        label="责任"
                        labelCol={{span:6}}
                        wrapperCol={{span:14}}
                    
                        >
                        {this.props.form.getFieldDecorator('accountability', {
                            rules: [
                                { max: 30, message:'内容过长' }
                            ],
                            initialValue:this.props.policyCoverageInfo[0].duties?this.props.policyCoverageInfo[0].duties[0].name:'',
                        }) (
                            <Select placeholder="请选择">
                                {this.props.policyCoverageInfo.find(v=>v.name==this.props.form.getFieldValue('insuranceClass')).duties.map((v,i)=>(
                                    <Select.Option value={v.name} key={i}>{v.name}</Select.Option>
                                ))}
                            </Select>
                        )}
                    </Form.Item>
                    <Form.Item
                        required
                        label="立案金额"
                        labelCol={{span:6}}
                        wrapperCol={{span:14}}
                
                        >
                        {this.props.form.getFieldDecorator('registerMoney', {
                            rules: [{ 
                                required: true, 
                                message: '请输入', 
                                pattern: /^[1-9]\d*(\.\d+)?$/,

                            }],
                        })(
                            <Input  required placeholder="未填写立案金额"/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="保额"
                        labelCol={{span:6}}
                        wrapperCol={{span:14}}
                    >
                        <span>
                            <Currency>
                                {(this.props.policyCoverageInfo.find(v=>v.name==this.props.form.getFieldValue('insuranceClass')).duties.find(v=>v.name==this.props.form.getFieldValue('accountability'))||{amt:this.props.policyCoverageInfo.find(v=>v.name==this.props.form.getFieldValue('insuranceClass')).amt}).amt}
                            </Currency>
                        </span>
                    </Form.Item>

                    <Form.Item
                        label="免赔率"
                        labelCol={{span:6}}
                        wrapperCol={{span:14}}
                
                        >
                        <span>N/A</span>
                    </Form.Item>
                    <Form.Item
                        label="免赔额"
                        labelCol={{span:6}}
                        wrapperCol={{span:14}}
                    
                        >
                        <span>N/A</span>
                    </Form.Item>
                </Form>

            </Modal>

                <Form inline onSubmit={this.handleSubmit}>
                    <Row>
                        <Col span={2}>
                            情况说明:
                        </Col>
                        <Col span={22}>
                            <FormItem
                                {...illustrateLayout}
                                style={{width:'95%'}}
                                >
                                {getFieldDecorator('surveyDesc', {
                                    rules: [
                                        {required: false, message: '请输入情况说明'},
                                        {max: 512, message:'内容过长'}
                                    ],
                                    initialValue:this.props.surveyInfo&&this.props.surveyInfo.surveyDesc?this.props.surveyInfo.surveyDesc:''
                                })(
                                    <Input rows={4} type="textarea"  placeholder="请输入" onChange={this.change.bind(this)} style={{width:'100%'}} />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={3}>
                            <Button type="primary" onClick={()=>{this.showConfirm(tableValue)}} style={{margin:'15px 0px 15px 84px'}}>立案完成</Button>
                        </Col>
                    </Row>

                </Form>

            </div>
        )
    }

}

const RegisterEnters = Form.create()(RegisterEnter);

export default connect(state => {

    let policyCoverageInfo = state.reportDetail.data.policyInfo&&state.reportDetail.data.policyInfo.policyCoverageInfo?state.reportDetail.data.policyInfo.policyCoverageInfo:[];

    policyCoverageInfo.forEach(v=>{
        if(!v.duties){
            v.duties=[{
                amt:v.amt,
                name:'',
            }]
        }
        else if(typeof v.duties=='string'){
            v.duties=JSON.parse(v.duties)
        }
    })

    console.log('policyCoverageInfo',policyCoverageInfo);

    return {
        reportDetail: state.reportDetail,
        policyNo:state.reportDetail.data.policyInfo.policyNo,
        reportNo:state.reportDetail.data.policyInfo.reportNo,
        duty:[],
        policyCoverageInfo:state.reportDetail.data.policyInfo.policyCoverageInfo,
    }
}, dispatch => {
    return {
        actions: bindActionCreators({
            registerEnterData,
            saveRegisterEnterData
        }, dispatch)
    }
})(RegisterEnters);

