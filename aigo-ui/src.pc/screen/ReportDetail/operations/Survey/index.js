import React from 'react'
import {Row, Col} from 'antd';
import {Modal, Button} from 'antd';
import {Form, Icon, Input, Select,} from 'antd';
//import './index.css'
import {Collapse} from 'antd';
const Panel = Collapse.Panel;
import {Cascader} from 'antd';
import {DatePicker, TimePicker} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
//import fetch from "isomorphic-fetch"
import fetch from "cathay-fetch";
import moment from "moment"
import Url from '../../../../actions/Url'
import {
    surveyTabInfo,
    fetchSaveSurvey
    } from '../../../../actions/reportDetail'
import './index.css'

const FormItem = Form.Item;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

function callback(key) {
   
}

// Just show the latest item.
function displayRender(label) {
    return label[label.length - 1];
}

function error(message) {
    Modal.error({
        content: message
    });
}

function onChange(value) {

}

const options = [{
    value: 'zhejiang',
    label: 'Zhejiang'
}, {
    value: 'jiangsu',
    label: 'Jiangsu'
}];


class SurveyEnter extends React.Component {

    normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    }

    static propTypes = {
        type: React.PropTypes.string,
    }

    static defaultProps = {
        type: 'form',
    }

    state = {
        surveyValue: null,
        endValue: null,
        endOpen: false,
    };

    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
        if (!startValue || !endValue) {
            return false;
        }
        return startValue.valueOf() > endValue.valueOf();
    }

    disabledAccidentTimeDate = (surveyValue) => {

        const accidentTime = moment(this.props.accidentTime,"YYYY-MM-DD HH:mm:ss");

        if (!surveyValue || !accidentTime) {
            return false;
        }
     
        return surveyValue.valueOf() < accidentTime.valueOf();
    }

    disabledEndDate = (endValue) => {
        const surveyValue = this.state.surveyValue;
        if (!endValue || !surveyValue) {
            return false;
        }
        return endValue.valueOf() <= surveyValue.valueOf();
    }

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }

    onStartChange = (value) => {
        this.onChange('surveyValue', value);
    }


    save = () => {
        this.props.form.setFieldsValue({
            explain: 34
        });
        this.props.actions.reportDetailSurvey();
        this.props.closeAction();
    }

    closeSurvey = () => {
        this.props.closeAction();
    }

    onEndChange = (value) => {
        this.onChange('endValue', value);
    }

    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({endOpen: true});
        }
    }

    handleEndOpenChange = (open) => {
        this.setState({endOpen: open});
    }

    surveySuccess(fieldsValue) {

        this.props.actions.fetchSaveSurvey(fieldsValue, () => {

        });
        this.props.closeAction();

    }

    updateSurvey(fieldsValue) {

        var _this = this;

        Modal.success({
            content: '查勘信息保存成功',
            onOk() {
                _this.props.actions.fetchSaveSurvey(fieldsValue, () => {

                });
                _this.props.closeAction();
            },
            onCancel() {
            },
        });
    }

    addSurveyInfo(fieldsValue) {

        let _this = this;
        let surveyInfo = this.props.surveyInfo;
        if(surveyInfo){
            fieldsValue.surveyNo = surveyInfo.surveyNo;
        }

        fieldsValue.reportNo = this.props.reportDetail.data.reportInfo.reportNo;

        fetch(Url.addOrUpdateSurveyInfo + '?actionId=ACTION_R12',{
                //method: 'post',
                // credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(fieldsValue)
            }
        ).then(survey => {
                if(survey.code == 200){
                    _this.surveySuccess(survey);
                }else if(survey.code == 400){
                    Modal.error({
                        content: survey.message
                    });
                }
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let _this = this;
        this.props.form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }

            fieldsValue['surveyStartTime'] = fieldsValue['surveyStartTime'].format('YYYY-MM-DD HH:mm:ss');
            fieldsValue['surveyEndTime'] = fieldsValue['surveyEndTime'].format('YYYY-MM-DD HH:mm:ss');
            _this.addSurveyInfo(fieldsValue);

            // Should format date value before submit.
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 8, offset: 1},
            wrapperCol: {span: 11, offset: 1},
        };
        const startSurveyLayout = {
            labelCol: {span: 7, offset: 1},
            wrapperCol: {span: 15, offset: 1},
        };

        const startTimeLayout = {
            labelCol: {span: 10},
            wrapperCol: {span: 11, offset: 1},
        };

        const endTimeLayout = {
            labelCol: {span: 10},
            wrapperCol: {span: 11, offset: 1},
        };

        const illustrateLayout = {
            labelCol: {span: 3},
            wrapperCol: {span: 20}
        };

        let startTimeMoment = this.props.surveyInfo&&this.props.surveyInfo.surveyStartTime?moment(this.props.surveyInfo.surveyStartTime, "YYYY-MM-DD HH:mm:ss"):'';
        let endTimeMoment = this.props.surveyInfo&&this.props.surveyInfo.surveyEndTime?moment(this.props.surveyInfo.surveyEndTime, "YYYY-MM-DD HH:mm:ss"):'';

        const config = {
            rules: [{type: 'object', required: true, message: '请选择日期'}],
            initialValue:startTimeMoment
        };

        const config1 = {
            rules: [{type: 'object', required: true, message: '请选择日期'}],
            initialValue:endTimeMoment
        };
        const {surveyValue, endValue, endOpen} = this.state;
        return (

            <Form inline onSubmit={this.handleSubmit} >
                <div className="survey-info">查勘信息</div>
                <Row style={{height: 50, marginLeft: 1}}>
                    <Col span={8}>
                        <FormItem
                            {...formItemLayout}
                            label="查勘方式"
                            hasFeedback
                        >
                            {getFieldDecorator('surveyType', {
                                    rules: [
                                        {required: true, message: '请选择查勘方式'}
                                    ],
                                    initialValue:this.props.surveyInfo&&this.props.surveyInfo.surveyType?this.props.surveyInfo.surveyType:''
                                }
                            )(
                                <Select placeholder="请选择查勘方式" style={{minWidth: 154}}>
                                    <Option value="1">自主查勘</Option>
                                    <Option value="2">公估查勘</Option>
                                    <Option value="3">代查勘</Option>
                                    <Option value="4">其他</Option>
                                </Select>
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} offset={1}>
                        <FormItem
                            {...startTimeLayout}
                            label="查勘开始时间"
                            >
                            {getFieldDecorator('surveyStartTime', config)(
                                <DatePicker 
                                    format="YYYY-MM-DD HH:mm:ss" 
                                    style={{width:'140%'}}
                                    disabledDate = {this.disabledAccidentTimeDate}
                                    onOpenChange = {this.handleStartOpenChange}
                                    onChange = {this.onStartChange}
                                    showTime
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row style={{height: 60}}>
                    <Col span={8}>
                        <FormItem
                            label="初堪金额"
                            {...startSurveyLayout}
                            >
                            {getFieldDecorator('lossAssessAmt', {
                                rules: [
                                    { required: true, message: '请输入金额'},
                                ],
                                initialValue:this.props.surveyInfo&&this.props.surveyInfo.lossAssessAmt?this.props.surveyInfo.lossAssessAmt:''
                            })(
                                <Input onChange={this.cc} addonBefore={<Icon type="user"/>} placeholder="" />
                            )}
                        </FormItem>
                    </Col>
                    <Col span={8} offset={1}>
                        <FormItem
                            {...endTimeLayout}
                            label="查勘结束时间"
                            >
                            {getFieldDecorator('surveyEndTime', config1)(
                                <DatePicker 
                                    style={{width:'140%'}} 
                                    format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate = {this.disabledEndDate}
                                    onOpenChange = {this.handleEndOpenChange}
                                    onChange = {this.onEndChange}
                                    showTime
                                />
                            )}
                        </FormItem>
                    </Col>
                </Row>

                <Row style={{marginLeft: '-11px', height: 100}}>
                    <Col>
                        <FormItem
                            {...illustrateLayout}
                            label="情况说明："
                            >
                            {getFieldDecorator('surveyDesc', {
                                rules: [
                                    {required: true, message: '请输入情况说明'},
                                    {max: 500, message: '输入内容过长'}
                                ],
                                initialValue:this.props.surveyInfo&&this.props.surveyInfo.surveyDesc?this.props.surveyInfo.surveyDesc:''
                            })(
                                <Input type="textarea" rows={6} placeholder="" className='claim-textarea'/>
                            )}
                        </FormItem>

                    </Col>
                </Row>

                <Row>
                    <Col offset={2}>
                        <FormItem>
                            <Button type="primary" className="btn-claim" htmlType="submit">保存</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

const Survey = Form.create()(SurveyEnter);

export default connect(state => {
    return {
        reportDetail: state.reportDetail,
        surveyInfo: state.reportDetail.data.surveyInfo,
        accidentTime:state.reportDetail.data.reportInfo.accidentTime
    }
}, dispatch => {
    return {
        actions: bindActionCreators({
            surveyTabInfo,
            fetchSaveSurvey
        }, dispatch)
    }
})(Survey);