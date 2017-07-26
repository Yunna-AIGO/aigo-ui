import React from 'react'
import {Form, Row, Col, Input, Button, Icon, Table, DatePicker} from 'antd';
import Title from '../../control/Title';
import {connect} from 'react-redux'

class PolicyInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
        }
    }
    render() {
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
            <div style={{marginTop: 20}}>
                <Title title={title}/>
                < Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{ pageSize: 6 }}
                />
            </div>

        );
    }

}

export default connect(state => {
    return {
        policyInfo: state.policy
    }
}, dispatch => {
    return {

    }
})(PolicyInfo);
