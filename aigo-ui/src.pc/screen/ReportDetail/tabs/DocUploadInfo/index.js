/**
 * Created by i01007600608 on 2017/2/9.
 */
import React from 'react';
import { Table, Input, Icon, Popconfirm } from 'antd';
import { Tabs, Button, Row, Col } from 'antd';
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

class RegisterInfo extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'order',
        }, {
            title: '单证类型',
            dataIndex: 'docType',
        }, {
            title: '文件',
            dataIndex: 'document',
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <div>
                        <a href="#">查看</a>
                    </div>
                );
            }}];

        this.state = {
            dataSource: [],
            count: 5,
            popFormValue:{}
        };
    }

    render() {
        const  dataSource  = this.state.docInfo?this.state.docInfo:[];
        const columns = this.columns;
        return (
                    <Table style={{height:'200px'}}
                        bordered
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                        />

        );
    }
}


export default connect(state => {
    return {
        docInfo:state
    }
}, dispatch => {
    return {
        actions: bindActionCreators({}, dispatch)
    }
})(RegisterInfo);