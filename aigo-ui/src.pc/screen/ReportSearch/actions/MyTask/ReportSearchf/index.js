/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Row, Col, Input, Button, Icon} from 'antd';
import {DatePicker, TimePicker} from 'antd';
import {Select} from 'antd';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Option = Select.Option;

function callback(key) {
    console.log(key);
}

class AdvancedSearchForm extends React.Component {
    constructor(props) {
        super(props)
    }
    state = {
        expand: false,
        expendText: '展开搜索'
    };
    handleSearch = (e) => {
        e.preventDefault();
        switch(this.props){
            case 2:
                break;
        }
        this.props.form.validateFields((err, values) => {
            this.props.deliverParames(values);
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
        const config = {
            rules: [{type: 'object', required: false, message: 'Please select time!'}],
        };
        const rangeConfig = {
            rules: [{type: 'array', required: false, message: 'Please select time!'}],
        };
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        };

        const formItemLayout1 = {
            labelCol: {span: 6},
            wrapperCol: {span: 18}
        };

        // To generate mock Form.Item
        const children = [];

        const formFieldName = [{name: "报案号", key: "reportNo"}, {name: "保单号", key: "policyNo"},{name: "赔案号", key: "claimNo"}, {name: "报案人", key: "incidentNotifier"}, {name: "处理人", key: "reportHandler"}, {
            name: "报案状态",
            key: "reportStatus"
        },{
            name: "报案时间",
            key: "reportPeriod"
        }];

        for (let i = 0; i < formFieldName.length; i++) {

            if (formFieldName[i].name === '报案状态') {
                children.push(
                    <Col span={8} key={i}>
                        <FormItem {...formItemLayout1} label={formFieldName[i].name}>
                            {getFieldDecorator(formFieldName[i].key)(
                                <FormItem
                                    {...formItemLayout}
                                    hasFeedback
                                >
                                    {getFieldDecorator(formFieldName[i].key, {
                                        rules: [
                                            {required: false, message: 'Please select your country!'},
                                        ]
                                    })(
                                        <Select placeholder="Please select a country" style={{width: "134%"}}>
                                            <Option value="china">待受理</Option>
                                            <Option value="use">受理中</Option>
                                        </Select>
                                    )}
                                </FormItem>
                            )}
                        </FormItem>
                    </Col>
                );
            } else if (formFieldName[i].name === '报案时间') {
                children.push(
                    <Col span={8} key={i}>
                        <FormItem {...formItemLayout1} label={formFieldName[i].name}>
                            {getFieldDecorator(formFieldName[i].key)(
                                <FormItem
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator(formFieldName[i].key, rangeConfig)(
                                        <RangePicker size="large" style={{width: "134%"}}/>
                                    )}
                                </FormItem>
                            )}
                        </FormItem>
                    </Col>
                );
            } else {
                children.push(
                    <Col span={8} key={i}>
                        <FormItem {...formItemLayout} label={formFieldName[i].name}>
                            {getFieldDecorator(formFieldName[i].key)(
                                <Input placeholder="placeholder" size="large"/>
                            )}
                        </FormItem>
                    </Col>
                );
            }

        }

        const expand = this.state.expand;
        const shownCount = expand ? children.length : 7;
        if (this.state.expand === true) {
            var displayblock1 = 'block';
        } else {
            var displayblock1 = 'none';
        }

        return (
            <Form
                className="ant-advanced-search-form"
                onSubmit={this.handleSearch}
            >
                <Row gutter={40}>
                    {children.slice(0, shownCount)}
                </Row>
                <Row>
                    <Col span={24} style={{textAlign: 'right', marginBottom: '30px'}}>
                        <a onClick={this.toggle}>
                            {this.state.expendText}<Icon type={expand ? 'up' : 'down'}/>
                        </a>
                    </Col>
                </Row>
                <Row className="formSearch">
                    <Col span={24} style={{textAlign: 'right', marginBottom: '30px'}}>
                        <Button type="primary" htmlType="submit">搜索</Button>
                        <Button style={{marginLeft: 8}} onClick={this.handleReset}>
                            清除
                        </Button>
                    </Col>
                </Row>
            </Form>
        );
    }
}

const WrappedAdvancedSearchForm = Form.create()(AdvancedSearchForm);
export default WrappedAdvancedSearchForm

