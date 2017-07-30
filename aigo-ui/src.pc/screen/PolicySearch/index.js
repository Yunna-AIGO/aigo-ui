/**
 * Created by i01007600608 on 2017/1/22.
 */
import React from 'react';
import SearchResult from './SearchResult';
import SearchConditions from './SearchConditions';
import './index.css';

import {Form, Row, Col, Input, Button, Icon, Table, DatePicker,Select,Modal} from 'antd';
import Title from '../../control/Title';
import {connect} from 'react-redux'
import {fetchPolicyByAntPolicyNo} from '../../actions/policy';
import {bindActionCreators} from "redux"


const Option = Select.Option;
const FormItem = Form.Item;
const {MonthPicker, RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';


class Policy extends React.Component {
	 state = {
        expand: false,
        expendText: '展开搜索',
        pagination: true,
        dataSource: [],
        loading: false,
    };

    fetchData(conditions,page,perPage,sort,order) {

        this.props.actions.fetchPolicyByAntPolicyNo(conditions,page,perPage,sort,order,(value)=>{

			Modal.error({
				content: value.message?value.message:'',
			});

        });

        this.setState({
            loading:false,
        })
    }

    fetchPolicyData = (page,perPage) => {

        this.setState({
            loading:true,
        })

    	this.props.form.validateFields((err, values) => {

    	  	if(!err){
	            if(values.channelPolicyNo==undefined){
	                return;
	            }else{
	                this.fetchData(values,page,perPage);
	            }
    	  	}

        });

    }

    handleSubmit = (e) => {
        this.setState({
            loading:true,
        })
        e.preventDefault();

         this.props.form.validateFields((err, values) => {

            if(!(values.certNo || values.channelPolicyNo || values.policyNo)){

                Modal.error({
                    content: '请输入保单号、渠道保单号、被保人证件号中的一项!',
                });

                return;
            }

            if(!err){
                this.fetchData(values,1,5);
            }

        });

    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const expand = this.state.expand;
        let expendText = this.state.expendText;
        if (expand)
            expendText = '收起搜索';
        else
            expendText = '展开搜索';
        this.setState({expand: !expand, expendText: expendText});
    }

    render() {

        /*------------筛选项初始化-----------*/

    	const {getFieldDecorator} = this.props.form;

        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        }

        const formFieldName = [
	        {name: "保单号", key: "policyNo"},
	        {name: "渠道保单号", key: "channelPolicyNo"},
	        {name: "险种", key: "prodNo"}, 
	        {name: "被保人姓名", key: "certName"}, 
	        {name: "被保人证件号", key: "certNo"},
            {name: "保险期间", key: "policyPeriod"}, 
        ]
    
        const children = []

        for (let i = 0; i < formFieldName.length; i++) {
            if (formFieldName[i].name === "保险期间") {

                children.push(
                    <Col span={7} key={i} style={{height:'55px'}}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name} >
                        	  {getFieldDecorator(formFieldName[i].key, {
                                rules: [
                                    {required: false, message: '请选择时间'},
                                ]
                            })(
                                <RangePicker  
                                    size="large" 
                                    style={{width: "268px",height:'40px'}}
                                    format="YYYY-MM-DD HH:mm:ss"
                                />
                            )}
                        
                        </FormItem>
                    </Col>
                );

            }else if(formFieldName[i].name === '保单状态'){
                children.push(
                    <Col span={8} key={i} style={{height:'55px'}}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name} style={{marginLeft:'60px'}}>
                            {getFieldDecorator(formFieldName[i].key, {
                                rules: [
                                    {required: false, message: '请选择保单状态'},
                                ]
                            })(
                                <Select placeholder="请选择" style={{width: "100%",height:'40px'}}>
                                    <Option value="true">有效</Option>
                                    <Option value="false">无效</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                );
            }else if(formFieldName[i].name === '渠道保单号'){
                children.push(
                    <Col span={8} key={i} style={{height:'55px'}}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name} >
                            {getFieldDecorator(formFieldName[i].key, {
                                rules: [
                                    {required: false, message: '请输入'},
                                ]
                            })(<Input placeholder="请输入"/>)}
                        </FormItem>
                    </Col>
                );
            }else if(formFieldName[i].name === '被保人证件号'){
                children.push(
                    <Col span={8} key={i} style={{height:'55px'}}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name} >
                            {getFieldDecorator(formFieldName[i].key,{
                            	rules: [
                                    {required: false, message: '请输入'},
                                ]	
                            }
                            	)(
                                <Input placeholder="请输入" />
                            )}
                        </FormItem>
                    </Col>
                );
            }else{
                children.push(
                    <Col span={8} key={i} style={{height:'55px'}}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name}>
                            {getFieldDecorator(formFieldName[i].key)(
                                <Input placeholder="请输入"/>
                            )}
                        </FormItem>
                    </Col>
                );
            }
        }

        const expand = this.state.expand;
        const shownCount = expand ? children.length : 8;

        /*-------------表格----------*/

        let dataSource = this.props.policyInfo.policies || [];
        dataSource.map((val,index)=>{
            val.key=index;
        })
        const title = '共搜索到' + dataSource.length + '条数据';
        const columns = [
        {
            title: '保单号',
            key: 'policyNo',
            // dataIndex: 'policyNo',
            render: (text, record) => <a href={"#/policy-info/"+record.policyNo} >{record.policyNo}</a>,
        },
        {
            title: '险种',
            dataIndex: 'prodNoName',
            key: 'prodNoName'
        }, 
        {
            title: '投保人',
            dataIndex: 'certNamme',
            key: 'certNamme',
        }, 
        {
            title: '被保人',
            dataIndex: 'insuredCertName',
            key: 'insuredCertName'
        },
        {
            title: '保单期间',
            key: '5',
            render: (text, record) => (
                <div>
                    <span>
                        {record.startTime} ~ {record.endTime}
                    </span>
                </div>
            )
        },
        {
            title: '保单状态',
            dataIndex: 'status',
            key: '6'
        }];

        return (
            <div>
              <div>
                <Title title="保单查询" style={{fontWeight: 'bold', fontSize: '200%'}}/>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSubmit}
                    style={{marginTop: 50}}
                >
                    <Row gutter={40}>
                        {children.slice(0, shownCount)}
                    </Row>
                    <Row>
                        <Col span={24} style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">搜索</Button>
                            <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                                清除
                            </Button>
                        </Col>
                    </Row>
                </Form>
           	 </div>

              <div style={{marginTop: 20}}>
                <Title title={title}/>
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    loading={this.state.loading}
                    pagination={{ 
                        pageSize: 5,
                        total: Number(this.props.policyInfo.total?this.props.policyInfo.total:0)
                    }}
                    onChange={pagination=>{
                        this.fetchPolicyData(pagination.current,pagination.pageSize)
                    }}
                />
              </div>

            </div>
        );
    }
}


const PolicySearch = Form.create()(Policy);

export default  connect(state => {
    return {
    	policyInfo: state.policy?state.policy:{}
    }
}, dispatch => {
    return {
        actions: bindActionCreators({fetchPolicyByAntPolicyNo}, dispatch)
    }
})(PolicySearch);