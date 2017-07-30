/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Table, Input, Icon, Button, Popconfirm } from 'antd';

import "./index.css";

class EditableCell extends React.Component {
    state = {
        value: this.props.value,
        editable: false,
        pagination: true
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ value });
    }
    check = () => {
        this.setState({ editable: false });
        if (this.props.onChange) {
            this.props.onChange(this.state.value);
        }
    }
    edit = () => {
        this.setState({ editable: true });
    }
    render() {
        const { value, editable } = this.state;
        return (<div className="editable-cell">
            {
                editable ?
                    <div className="editable-cell-input-wrapper">
                        <Input
                            value={value}
                            onChange={this.handleChange}
                            onPressEnter={this.check}
                            />
                        <Icon
                            type="check"
                            className="editable-cell-icon-check"
                            onClick={this.check}
                            />
                    </div>
                    :
                    <div className="editable-cell-text-wrapper">
                        {value || ' '}
                        <Icon
                            type="edit"
                            className="editable-cell-icon"
                            onClick={this.edit}
                            />
                    </div>
            }
        </div>);
    }
}



class EditableTable extends React.Component {
    constructor() {
        super();
        this.columns = [{
            title: '报案号',
            dataIndex: 'reportNo',
            width: '8%',
            key:1,
            render: (text, record, index) => (
                <EditableCell
                    value={text}
                    onChange={this.onCellChange(index, 'name')}
                    />
            )
        }, {
            title: '保单号',
            dataIndex: 'policyNo',
            width: '8%',
            key:2,
        },{
            title: '赔案号',
            dataIndex: 'ClaimNo',
            key:3,
            width: '8%'
        },{
            title: '投保人',
            key:4,
            dataIndex: 'applicant',
            width: '9%'
        },{
            title: '被保人',
            key:5,
            dataIndex: 'applicantedMan',
            width: '9%'
        },{
            title: '保单起止时间',
            key:6,
            dataIndex: 'reportState',
            width: '15%'
        },{
            title: '处理人',
            key:7,
            dataIndex: 'hanleMan',
            width: '7%'
        },{
            title: '最后操作日期',
            key:8,
            dataIndex: 'lastHanleTime',
            width: '10%'
        },{
            title: '最后操作者',
            key:9,
            dataIndex: 'lastHanleMan',
            width: '10%'
        } ,{
            title: '状态',
            key:10,
            dataIndex: 'lastHanleMan',
            width: '6%'
        } ,{
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            render: (text, record, index) => {
                return (
                        (
                                <div>
                                    <a href="http://localhost/Home#/report-check/cat1?_k=55gxge">查看</a>
                                    <a href="http://localhost/Home#/report-handle/cat1?_k=55gxge" style={{marginLeft:10}}>操作</a>
                                </div>
                        )
                );
            }
        }];

        this.state = {
            dataSource: [],
            count: 5
        };
    }


    onCellChange = (index, key) => {
        return (value) => {
            dataSource[index][key] = value;
            this.setState({ dataSource });
        };
    }

    test = () => {
        console.log('all the props',this.props);
    }

    render() {
        var dataSource = [];

        for(var name in this.props){
            switch(this.props[name]){
                case  0:
                var  dataSource  = this.props.dataSource0;
                break;
                case  '1':
                    var  dataSource  = this.props.dataSource1;
                    break;
                case  2:
                    var  dataSource  = this.props.dataSource2;
                    break;
                case  3:
                    var  dataSource  = this.props.dataSource3;
                    break;
                case  4:
                    var  dataSource  = this.props.dataSource4;
                    break;
                case  5:
                    var  dataSource  = this.props.dataSource3;
                    break;
                case  6:
                    var  dataSource  = this.props.dataSource4;
                    break;

            }

        }

        const columns = this.columns;
        return (<div onClick={this.test}>
            <Table bordered dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />
        </div>);
    }
}


export default EditableTable
