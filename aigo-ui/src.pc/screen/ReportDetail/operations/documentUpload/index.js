/**
 * Created by i01007600608 on 2017/2/9.
 */
import React from 'react';
import './index.css'
import {Tabs, Row, Col} from 'antd';
import { Modal, Button } from 'antd';
import { Upload, message, Icon } from 'antd';
import { Select } from 'antd';
import { Table, Input, Popconfirm } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import CloseFrame from "../CloseFrame"

const Option = Select.Option;



function handleChange(value) {
    console.log(`selected ${value}`);
}

class DocumentUpload extends React.Component {

    constructor(props) {
        super(props);
        this.columns = [{
            title: '序号',
            dataIndex: 'number',
        }, {
            title: '单证类型',
            dataIndex: 'docType',
        }, {
            title: '文件',
            dataIndex: 'doc',
        },{
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                return (
                    <div>
                        <a href="#">查看</a>
                        <a href="#">删除</a>
                    </div>
                );
            },
        }];

        this.state = {
            dataSource: [],
            count: 5,
            popFormValue:{},
            tableValue:null
        };
    }

    uploadSuccess(){
        this.props.closeAction();
    }


    render() {
        let _this = this;
        const props = {
            name: 'file',
            action: '//jsonplaceholder.typicode.com/posts/',
            headers: {
                authorization: 'authorization-text',
            },
            multiple: true,
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                    _this.setState({
                        tableValue:info.file.response
                    });

                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        const  dataSource  = this.state.tableValue?this.state.tableValue:[];
        const columns = this.columns;
        return (
            <div style={{backgroundColor: '#edf8e8',padding:'20px 15px',border:'1px solid rgba(218, 240, 208, 1)',borderRadius:'3px'}}>
                <div style={{marginBottom:'10px',fontSize:'15px'}}>单证上传</div>
                <Row style={{height:"40px",lineHeight:"40px",marginBottom:'10px'}}>
                    <Col span={2}>单证类型:</Col>
                    <Col>
                        <Select
                            showSearch
                            style={{ width: 200 }}
                            placeholder="请选择"
                            optionFilterProp="children"
                            onChange={handleChange}
                            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                            <Option value="jack">承保资料</Option>
                            <Option value="lucy">出险通知书</Option>
                            <Option value="tom">事故证明</Option>
                            <Option value="ma">定损资料</Option>
                        </Select>
                    </Col>
                </Row>

                <Row>
                    <Col span={2}>附件上传:</Col>
                    <Col>
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" />上传文件
                            </Button>
                        </Upload>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col>
                        支持扩展名：zip，doc, docx, jpg, pdf...
                    </Col>
                </Row>

                <Row>
                    <Col span={2}></Col>
                    <Col span={22}>
                        <div style={{margin:'15px 0'}}>
                            <Table
                                bordered
                                dataSource={dataSource}
                                columns={columns}
                                pagination={false}
                                style={{width:'300px',display:'inline-block'}}
                                />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col span={2}></Col>
                    <Col>
                        <Button type="primary" onClick={this.uploadSuccess.bind(this)}>上传完成</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default connect(state => {
    return {
        reportDetail: state.reportDetail
    }
}, dispatch => {
    return {
        actions: bindActionCreators({

        }, dispatch)
    }
})(DocumentUpload);
