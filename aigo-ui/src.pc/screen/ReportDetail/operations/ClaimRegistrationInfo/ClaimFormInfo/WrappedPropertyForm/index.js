/**
 * Created by i01007600608 on 2017/2/9.
 */
import React from 'react';
import {connect} from 'react-redux'
import { Button, Row, Col,Table, Icon,Form ,Input,Modal,Select,Tabs} from 'antd';

let propertyItemColumns=[
    {
        title: '险种',
        dataIndex: 'a',
        key: 'a',
        render: (text) => ({'0':'雇主责任险','1':'家庭财产险'}[text])
    },
    {
        title: '责任',
        dataIndex: 'b',
        key: 'b',
        render: (text) => ({'0':'死亡伤残','1':'误工费'}[text])
    },
    {
        title: '保额',
        dataIndex: 'c',
        key: 'c'
    },
    {
        title: '免赔率',
        dataIndex: 'd',
        key: 'd'
    },
    {
        title: '免赔额',
        dataIndex: 'e',
        key: 'e'
    },
    {
        title: '立案金额',
        dataIndex: 'f',
        key: 'f'
    },
    {
        title: '理算金额',
        dataIndex: 'g',
        key: 'g'
    },
]

class PropertyForm extends React.Component {
    state={
        form:'block'
    }
    change=(v)=>{
        this.setState({
            form:'none'
        })
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(

            <Form>
                <Form.Item label="保单号：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
                    <span>F315NF0AA000011</span>
                </Form.Item>
                <Form.Item required label="险种：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('险种', {
                        rules: [{ required: true, message: '请选择' }],
                    })(
                        <Select placeholder="请选择">
                            <Select.Option value='0'>雇主责任险</Select.Option>
                            <Select.Option value='1'>家庭财产险</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item required label="责任范围：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
                    {getFieldDecorator('责任范围', {
                        rules: [{ required: true, message: '请选择' }],
                    })(
                        <Select onChange={this.change}>
                            <Select.Option value='0'>死亡伤残</Select.Option>
                            <Select.Option value='1'>误工费</Select.Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item required label="理算金额：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px',display:this.props.popFormValue.b=='0'?'':'none'}}>
                    {getFieldDecorator('理算金额', {
                        rules: [{ required: true, message: '请输入' }],
                    })(
                        <Input required placeholder="请输入"/>
                    )}
                </Form.Item>
                <Form.Item required label="误工天数：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px',display:this.props.popFormValue.b=='1'?'':'none'}}>
                    <Input placeholder="请输入" addonAfter="天"/>
                </Form.Item>
                <Form.Item required label="单日误工费：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px',display:this.props.popFormValue.b=='1'?'':'none'}}>
                    <Input disabled value="根据规则自动显示" addonAfter="/天"/>
                </Form.Item>
                <Form.Item required label="付款金额：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px',display:this.props.popFormValue.b=='1'?'':'none'}}>
                    <Input disabled value="根据误工天数和单日费用自动计算展示"/>
                </Form.Item>
                <Form.Item label="保额：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
                    <span>{this.props.popFormValue.c||'?'}</span>
                </Form.Item>
                <Form.Item label="免赔率：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
                    <span>{this.props.popFormValue.d||'?'}</span>
                </Form.Item>
                <Form.Item label="免赔额：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
                    <span>{this.props.popFormValue.e||'?'}</span>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedPropertyForm = Form.create()(PropertyForm);

export default WrappedPropertyForm;