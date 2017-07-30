import {Form, Row, Col, Input, Button, Icon, DatePicker} from 'antd';
import React from 'react'
import './index.css';
import Title from '../../control/Title';
import {fetchPolicyByAntPolicyNo} from '../../actions/policy';
import {bindActionCreators} from "redux"
import {connect} from 'react-redux'
import {Select} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const {MonthPicker, RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

function onChange(){}

class AdvancedSearchForm extends React.Component {
    state = {
        expand: false,
        expendText: '展开搜索',
        pagination: true
    };

    _fetchData(conditions,page,perPage,sort,order) {
        this.props.actions.fetchPolicyByAntPolicyNo(conditions,page,perPage,sort,order);
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(values.channelPolicyNo==undefined){
                return;
            }else{
                this._fetchData(values);
            }
        });
    }

    onChange = (date, dateString) => {

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
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        const formItemLayout1 = {
            labelCol: {span: 6},
            wrapperCol: {span: 18},
        };
        const formFieldName = [{name: "保单号", key: "policyNo"},
        {name: "渠道保单号", key: "channelPolicyNo"},
        {name: "险种", key: "prodNo"}, 
        {name: "被保人姓名", key: "insuredCertName"}, 
        {name: "保险期间", key: "policyPeriod"}, 
        {name: "被保人证件号", key: "insuredCertNo"}];
    
        const children = [];
        for (let i = 0; i < formFieldName.length; i++) {
            if (formFieldName[i].name === "保险期间") {

                children.push(
                    <Col span={7} key={i}>
                        <FormItem {...formItemLayout1} label={formFieldName[i].name} style={{marginLeft:"15px"}}>
                            <RangePicker size="large" style={{width: "240px",marginRight:'30px'}}/>
                        </FormItem>
                    </Col>
                );
            }else if(formFieldName[i].name === '保单状态'){
                children.push(
                    <Col span={8} key={i}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name} style={{marginLeft:'60px'}}>
                            {getFieldDecorator(formFieldName[i].key, {
                                rules: [
                                    {required: false, message: '请选择保单状态'},
                                ]
                            })(
                                <Select placeholder="请选择" style={{width: "100%"}}>
                                    <Option value="true">有效</Option>
                                    <Option value="false">无效</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                );
            }else if(formFieldName[i].name === '渠道保单号'){
                children.push(
                    <Col span={8} key={i}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name} style={{}}>
                            {getFieldDecorator(formFieldName[i].key, {
                                rules: [
                                    {required: true, message: '请输入'},
                                ]
                            })(<Input placeholder="请输入"/>)}
                        </FormItem>
                    </Col>
                );
            }else if(formFieldName[i].name === '被保人证件号'){
                children.push(
                    <Col span={8} key={i}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name} style={{position:'relative',left:'20px'}} >
                            {getFieldDecorator(formFieldName[i].key)(
                                <Input placeholder="请输入"  />
                            )}
                        </FormItem>
                    </Col>
                );
            }else{
                children.push(
                    <Col span={8} key={i}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name}>
                            {getFieldDecorator(formFieldName[i].key)(
                                <Input placeholder="请输入"/>
                            )}
                        </FormItem>
                    </Col>
                );
            }
        }

        const
            expand = this.state.expand;
        const
            shownCount = expand ? children.length : 8;

        return (
            <div>
                <Title title="保单查询" style={{fontWeight: 'bold', fontSize: '200%'}}/>
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
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
        )
            ;
    }
}

const PolicySearch = Form.create()(AdvancedSearchForm);
export default  connect(state => {
    return {

    }
}, dispatch => {
    return {
        actions: bindActionCreators({fetchPolicyByAntPolicyNo}, dispatch)
    }
})(PolicySearch);








//展开搜索部分
// <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle.bind(this)}>
//     {this.state.expendText} <Icon type={expand ? 'up' : 'down'}/>
// </a>