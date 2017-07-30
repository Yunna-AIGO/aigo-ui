import { Table, Input, Icon, Button, Popconfirm } from 'antd';
import React from 'react';
import {Tabs, Row, Col} from 'antd';
import Currency from 'cathay-currency'


export default class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '保险项目',
            dataIndex: 'name',
            key: 'name'
        }, {    
            title: '赔偿限额',
            dataIndex: 'amt',
            key: 'amt',
            render: (text, record) => (
               <Currency>{text}</Currency>     
            ),
        }, {
            title: '免赔额',
            dataIndex: 'deductible',
            key: 'deductible',
            render:(text,record)=>{
                if(record.deductible==null){
                    return  <span>N/A</span>
                }else{
                   return <span>{record.deductible}</span>
                }
            }
        }, {
            title: '免赔率',
            dataIndex: 'deductibleRate',
            key: 'deductibleRate',
            render:(text,record)=>{
                if(record.deductibleRate==null){
                    return  <span>N/A</span>
                }else{
                   return <span>{record.deductibleRate}</span>
                }
            }
        }];

        this.state = {
            dataSource: []
        };
    }
    onCellChange = (index, key) => {
        return (value) => {
            const dataSource = [...this.state.dataSource];
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }
    render() {
        const duties = this.props.duties;
        //console.log(duties);
        if(Array.isArray(duties)){
             duties.map((v,i)=>v.key=i);
        }
        //console.log('dataSource',duties);
        const columns = this.columns;
        return (
            <div>
                <Table bordered dataSource={duties} columns={columns} />
            </div>
        );
    }
}