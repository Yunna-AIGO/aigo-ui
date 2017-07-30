import React from 'react';
import './index.css';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button,Modal } from 'antd';
import { DatePicker } from 'antd';
import fetch from "cathay-fetch";

import Title from '../../control/Title';
import {
    fetchReportEnter
} from '../../actions/reportEnter';

import {connect} from 'react-redux'
import {bindActionCreators} from "redux";

import Url from "../../actions/Url";

const FormItem = Form.Item;
const Option = Select.Option;

function error(message) {
    Modal.info({
        title: message,
        onOk() {},
    });
}

function handleChange(value) {
    console.log(`selected ${value}`);
}
    

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        type:{},
        reason:{},
        startValue: null,
        endValue: null,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.actions.fetchReportEnter(values,reportEnter=>{
                    Modal.error({
                        content:reportEnter.message
                    });
                },reportEnter=>{
                    Modal.confirm({
                        content: reportEnter.message,
                        onOk() {
                            window.location.href = "#/report-search?";
                        },
                        onCancel(){}
                    });

                });
            }
        });
    }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChange = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChange('startValue', value);
  }

  onEndChange = (value) => {
    this.onChange('endValue', value);
  }

    componentDidMount(){

         fetch(Url.claimAcceptType, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(type => {
           this.setState({
                type:type
           });
        })

        fetch(Url.claimAcceptReason, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        ).then(reason => {
             this.setState({
                reason:reason
           });
        })

    }

    render() {
   
        const insuranceMap = this.state.type;
        const insuranceReasonMap = this.state.reason;
        const insuranceTypeOption = [];
        const insuranceReasonOption = [];

        if(!insuranceMap.data){
            insuranceMap.data = [];
            insuranceReasonMap.data = [];
        }

        if(insuranceMap && insuranceMap.data){
            if(insuranceMap.data.length && insuranceMap.data.length>0){
                for (let i = 0; i < insuranceMap.data.length ; i++) {
                    insuranceTypeOption.push(<Option key={insuranceMap.data[i].dictKey} value={insuranceMap.data[i].dictKey}>{insuranceMap.data[i].dictValue}</Option>);
                };

                for (let i = 0; i < insuranceReasonMap.data.length ; i++) {
                    insuranceReasonOption.push(<Option key={insuranceReasonMap.data[i].dictKey} value={insuranceReasonMap.data[i].dictKey}>{insuranceReasonMap.data[i].dictValue}</Option>);
                };
            }
        }



        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 17 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 14 },
                sm: { span: 10 },
            },
        };

        const lastFormItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 7 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };

        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 18,
                    offset: 6,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select className="icp-selector">
                <Option value="86">+86</Option>
            </Select>
        );
        return (
            <div>
                <Title title="报案录入" style={{fontWeight: 'bold', fontSize: '200%'}}/>
                    <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="保单号"
                        hasFeedback
                        >
                        {getFieldDecorator('policyNo', {
                            rules: [{
                                required: true, message: '请输入你的保单号',
                            },{
                                max: 64,message:'保单号过长'
                            }],
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="报案时间"
                        hasFeedback
                        className="report-time"
                        >
                        {getFieldDecorator('reportTime', {
                            rules: [{
                                required: true, message: '请选择日期时间',
                            }],
                        })(
                            <DatePicker 
                                style={{width:'100%'}} 
                                format="YYYY-MM-DD HH:mm:ss" 
                                onChange={this.onEndChange} 
                                disabledDate={this.disabledEndDate} 
                                showTime
                            />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="报案人"
                        hasFeedback
                        >
                        {getFieldDecorator('reporter', {
                            rules: [{
                                required: true,
                                message: '请输入报案人姓名',
                            },{
                                max: 64,
                                message: '姓名长度过长'
                            }],
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>

                     <FormItem
                     {...formItemLayout}
                     label="出险人"
                     hasFeedback
                     >
                     {getFieldDecorator('accidentMan', {
                     rules: [{
                         required: true,
                         message: '请输入出险人姓名',
                     },{
                         max: 64,
                         message: '出险人姓名长度过长'
                     }],
                     })(
                     <Input placeholder="请输入" />
                     )}
                     </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="报案人电话"
                        hasFeedback
                        >
                        {getFieldDecorator('reporterTel', {
                            rules: [{
                                required: true,
                                message: '请输入报案人电话',
                            },{
                                max: 64,
                                min: 11,
                                message: '号码长度有误',
                            }],
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="出险时间"
                        hasFeedback
                        className="insurance-time"
                        >
                        {getFieldDecorator('accidentTime', {
                            rules: [{
                                required: true, message: '请选择日期时间',
                            }],
                        })(
                            <DatePicker 
                                style={{width:'100%'}} 
                                format="YYYY-MM-DD HH:mm:ss" 
                                onChange={this.onStartChange} 
                                disabledDate={this.disabledStartDate} 
                                showTime
                            />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="出险类型"
                        hasFeedback
                        >
                        {getFieldDecorator('accidentType', {
                                rules: [
                                    {required: true, message: '请选择出险类型'}
                                ],
                            }
                        )(
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="请选择出险类型"
                                onChange={handleChange}
                                multiple
                            >
                                {insuranceTypeOption}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="出险原因"
                        hasFeedback
                        >
                        {getFieldDecorator('accidentReason', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请选择出险原因',
                                    },{
                                        max: 256,
                                        message: '内容长度过长',
                                    }
                                ],
                            }
                        )(
                            <Select  style={{width:'100%'}} placeholder="请选择出险原因" >
                                {insuranceReasonOption}
                            </Select>
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="出险地点"
                        hasFeedback
                        >
                        {getFieldDecorator('accidentPlace', {
                            rules: [{
                                required: true,
                                message: '请输入出险地点',
                            },{
                                max: 128,
                                message: '内容长度过长'
                            }],
                        })(
                            <Input placeholder="请输入" />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="出险经过"
                        hasFeedback
                        >
                        {getFieldDecorator('accidentDesc', {
                            rules: [{
                                max: 150,
                                message: '内容长度过长'
                            }],
                        })(
                            <Input type="textarea"  placeholder="请输入" rows={4} />
                        )}
                    </FormItem>

                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large" style={{marginLeft:-20}}>提交</Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}

const ReportEnter = Form.create()(RegistrationForm);


export default connect(state => {

    return {
        state: state
    }
}, dispatch => {
    return {
        actions: bindActionCreators({
            fetchReportEnter
        }, dispatch)
    }
})(ReportEnter);
