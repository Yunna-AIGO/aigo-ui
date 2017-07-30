import React, { Component } from 'react';
import { Table, Icon, Input, Row, Col, Pagination, Modal, Button } from 'antd';
import { connect } from 'react-redux';
import Url from '../../../../actions/Url';

const confirm = Modal.confirm;
function error(message) {
    Modal.error({
        content: message
    });
}

class Tables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns : [
                {
                    title: "审核结果",
                    dataIndex: "examineResult",
                    key: "examineResult",
                },
                {
                    title: '审核人',
                    dataIndex: 'examinePerson',
                    key: 'examinePerson',
                },
                {
                    title: '流程号',
                    dataIndex: 'examineNo',
                    key: 'examineNo',
                },
                {
                    title: '审核时间',
                    dataIndex: 'examineTime',
                    key: 'examineTime',
                },
                {
                    title: '审核意见',
                    dataIndex: 'examineOpinion',
                    key: 'examineOpinion',
                }
            ],
            tabledata:[
                {
                    examineResult: "John Brown",
                    examinePerson: "32",
                    examineNo: "12ewejwqewq321312321323123",
                    examineTime: "2017-02-13",
                    examineOpinion: "钟昊最帅"
                },
                {
                    examineResult: "Jim Green",
                    examinePerson: "42",
                    examineNo: "1232131232132312asdsadasd3",
                    examineTime: "2017-02-13",
                    examineOpinion: "你们有比我帅的"
                },
                {
                    examineResult: "Joe Black",
                    examinePerson: "32",
                    examineNo: "123213123213231231asdasdas",
                    examineTime: "2017-02-13",
                    examineOpinion: "我最帅，我最帅"
                }
            ]
        }
    }

    render() {
        return (
            <div>
                <div style={{marginTop:'20px',borderTop:'1px solid #EBEBEB'}}>
                    <Row style={{height: "40px", fontSize: "16px", marginTop: "30px"}}>
                        <Col span={24}>审核日志</Col>
                    </Row>
                    <Table columns={this.state.columns} dataSource={this.state.tabledata} pagination={false}/>
                    <div style={{marginTop:'40px'}}>
                        <Row type="flex">
                            <Col span={22} order={2}>
                                <Input type="textarea" placeholder="请输入备注" autosize={{ minRows: 2, maxRows: 6 }}/>
                            </Col>
                            <Col span={2} order={1}>
                                请填写意见:
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        );
    }
};
export default Tables;