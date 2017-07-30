import React from 'react'
import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import './index.css';
import {  Row, Col} from 'antd';
import { Modal } from 'antd';
import { Select ,Form} from 'antd';
import WrappedPropertyForm from './WrappedPropertyForm';
import CollectionsPage from './CollectionPage'

const FormItem = Form.Item;

class ClaimFormInfo1 extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '险种',
            dataIndex: 'insuranceType',
        }, {
            title: '责任',
            dataIndex: 'duty',
        }, {
            title: '保额',
            dataIndex: 'amount',
        }, {
            title: '免赔额',
            dataIndex: 'deductible',
        }, {
            title: '免赔率',
            dataIndex: 'deductibleRatio',
        }, {
            title: '立案金额',
            dataIndex: 'claimAmount',
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    this.state.dataSource.length > 0?
                        (
                            <div>
                                <a onClick={this.popForm.bind(this,record)}>修改</a>
                                <a  onClick={this.onDelete(index)} style={{marginLeft:15}}>删除</a>
                            </div>

                        ) : null
                );
            },
        }];

        this.state = {
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
            insuranceValue:'',
            dutyRangeValue:'',
            registerValue:'',
            popFormValue:{},
        };
    }

    popForm(type,record) {
        this.setState({
            popFormValue:record,
            visible:true
        });
    }

    /*      input      */


    dutyChange (value){
        this.setState({
            dutyRangeValue:value
        })
    }


    showModal() {
        this.setState({
            visible: true,
        });
    }

    handleOk() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
        this.setState({ loading: false, visible: false });
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            insuranceType: this.state.insuranceValue,
            duty: this.state.dutyRangeValue,
            amount: '230,000,000',
            deductible: '0.00',
            deductibleRatio: '0',
            claimAmount: this.state.registerValue
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1
        });
    }

    onDelete = (index) => {
        return () => {
            const dataSource = [...this.state.dataSource];
            dataSource.splice(index, 1);
            this.setState({ dataSource });
        };
    }
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            insuranceType: 111,
            duty: 222,
            amount: '230,000,000',
            deductible: '0.00',
            deductibleRatio: '0',
            claimAmount: 333
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
    }
    render() {
        const { dataSource } = this.state;
        if(this.props.registerInfo){
        }
        const columns = this.columns;
        return (
            <div className="claim-form-info">
                <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
                <div>
                    <CollectionsPage
                        visible={this.state.visible}
                        popFormValue={this.state.popFormValue}
                        handleOk={this.handleOk.bind(this)}
                        actions={this.props.actions}
                        handleAdd={this.handleAdd.bind(this)}
                    />
                </div>
            </div>
        );
    }
}

const ClaimFormInfo = Form.create()(ClaimFormInfo1);

export default ClaimFormInfo