/**
 * Created by i01007600608 on 2017/2/9.
 */
import React from 'react';
import { Table, Input, Icon, Popconfirm } from 'antd';
import { Tabs, Button, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { ModalViewTable } from "./index1";
import {Form, Select,} from 'antd';
import Currency from 'cathay-currency'
const FormItem = Form.Item;

class RegisterInfo extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '险种',
            dataIndex: 'insuranceClass',
            key: 'insuranceClass',
        }, {
            title: '责任',
            dataIndex: 'accountability',
            key: 'accountability',
        }, {
            title: '保额',
            dataIndex: 'coverage',
            key: 'coverage',
            render: (text, record) => (
               <Currency>{text}</Currency>     
            ),
        }, {
            title: '免赔额',
            dataIndex: 'deductible',
            key: 'deductible',
        }, {
            title: '免赔率',
            dataIndex: 'deductibleRate',
            key: 'deductibleRate',
        }, {
            title: '立案金额',
            dataIndex: 'registerMoney',
            key: 'registerMoney',
            render: (text, record) => (
               <Currency>{text}</Currency>     
            ),
        }];

        this.state = {
            dataSource: [],
            count: 5,
            popFormValue:{}
        };
    }

    render() {
        const  dataSource  = this.props.registerTabInfo&&this.props.registerTabInfo.registerList?this.props.registerTabInfo.registerList:[];
        const columns = this.columns;
        const {getFieldDecorator} = this.props.form;
        const illustrateLayout = {
            labelCol: {span: 0},
            wrapperCol: {span: 24}
        };
        return (
           <div>

                <Table
                 bordered
                 dataSource={dataSource}
                 columns={columns}
                 pagination={false}
                 // style={{position:'relative',left:'-85px'}}
                />
                
                <span style={{display:'inline-block',marginRight:'20px',marginTop:'20px'}}>情况说明:</span>{this.props.registerTabInfo&&this.props.registerTabInfo.representation?this.props.registerTabInfo.representation:''}
   
           </div>
        );
    }
}

const RegisterInfoForm = Form.create()(RegisterInfo);

export default connect(state => {

let registerTabInfo = state.reportDetail.data.registerTabInfo?state.reportDetail.data.registerTabInfo:{};
    for(let i=0;i<registerTabInfo.registerList.length;i++){
        registerTabInfo.registerList[i]["deductibleRate"] = "N/A";
        registerTabInfo.registerList[i]["deductible"] = "N/A"
    }


    return {
        registerTabInfo:registerTabInfo
    }

}, dispatch => {
    return {
        actions: bindActionCreators({}, dispatch)
    }
})(RegisterInfoForm);