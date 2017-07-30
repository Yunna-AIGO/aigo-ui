import React, { Component } from 'react';
import { Table, Icon, Input, Row, Col, Pagination, Modal, Button } from 'antd';
import { connect } from 'react-redux';
import Url from '../../../../actions/Url';
import fetch from "cathay-fetch";

const confirm = Modal.confirm;

class ApprovalRejected extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.showConfirm();
    }

    success(reportAn) {
        this.props.closeAction();
        // this.props.actions.reportAnnotation(reportAn);//??????
        window.location.href = '#/result-page/10';
    }

    showConfirm() {
        var _this = this;
        const examineInfo = this.props.detailData.data.textarea;
        confirm({
            content: '您确认要驳回审批？',
            onOk() {
                fetch(Url.updateExamineApprovalOpinion, {
                        //method: 'post',
                        // credentials: 'same-origin',
                        // headers: {
                        //     'Content-Type': 'application/json'
                        // },
                        body: JSON.stringify(examineInfo)
                    }
                ).then(examineApprovalOpinion => {
                        if (examineApprovalOpinion.data.code == 200) {
                            alert(examineInfo);
                            _this.success(examineApprovalOpinion.data.message);
                        } else {
                            error();
                        }
                    })
            },
            onCancel() {
                _this.props.closeAction();
            }
        });
    }

    render() {
        return (
            <div>
            </div>
        );
    }
};
export default ApprovalRejected;
