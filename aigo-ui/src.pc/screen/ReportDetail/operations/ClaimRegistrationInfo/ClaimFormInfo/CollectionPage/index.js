import React from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import './index.css';
import {  Row, Col} from 'antd';
import { Modal } from 'antd';
import { Select ,Form} from 'antd';
import WrappedPropertyForm from '../WrappedPropertyForm'
const Option = Select.Option;

function handleChange(value) {
    console.log(`selected ${value}`);
}

const FormItem = Form.Item;

class CollectionsPage1 extends React.Component {
    state = {
        dataSource: [{
            key: '0',
            insuranceType: '家庭财产责任险',
            duty: '房屋保险',
            amount: '230,000,000',
            deductible: '0.00',
            deductibleRatio: '0',
            claimAmount: '立案金额'
        },{
            key: '1',
            insuranceType: '家庭财产责任险',
            duty: '房屋保险',
            amount: '230,000,000',
            deductible: '0.00',
            deductibleRatio: '0',
            claimAmount: '立案金额'
        }],
        count: 5,
        visible: false
    };

    componentWillReceiveProps() {
        this.setState({
            visible:this.props.visible
        });
    }
    change=(v)=>{
        this.setState({
            form:'none'
        })
    }

    showModal = () => {
        this.setState({ visible: true });
    }

    handleCancel = () => {
        this.setState({ visible: false });
    }

    handleOk =() => {

    }

    handleCreate = () => {
        const form = this.form;
        this.props.actions.fetchButtonStateByPolicyNo();
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            form.resetFields();

        });
    }

    saveFormRef = (form) => {
        this.form = form;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
                <div>
                    <Button className="enter-btn" type="default" onClick={this.showModal.bind(this)}>
                        +录入
                    </Button>

                    <Modal
                        title="新增险种责任信息"
                        visible={this.state.visible}
                        onOk={()=>{
                          this.props.form.validateFields((err, values) => {
                               if(!err){
                                    this.props.handleAdd();
                                    this.props.form.resetFields();
                                    this.setState({ visible: false });
                                }
                          });

                        }}
                        onCancel={this.handleCancel.bind(this)}
                        popFormValue={this.props.popFormValue}
                    >

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
                            <Form.Item required label="立案金额：" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
                                {getFieldDecorator('立案金额', {
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

                    </Modal>
                </div>
        );
    }
}

const CollectionsPage = Form.create()(CollectionsPage1);
export default CollectionsPage