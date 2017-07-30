import React from 'react'
import { Modal, Button } from 'antd';
//import fetch from "isomorphic-fetch"
import fetch from "cathay-fetch";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {reportAccept} from '../../../../actions/reportDetail';
import Url from '../../../../actions/Url';

const confirm = Modal.confirm;

function error() {
    Modal.error({
        content: '报案受理失败'
    });
}


class AcceptBtn extends React.Component {

    componentDidMount() {
        this.showConfirm();
    }

    success(reportAccept) {
        var _this = this;
        Modal.success({
            content: reportAccept.message,
            onOk() {
                location.reload()
                // _this.props.closeAction();
                // _this.props.actions.reportAccept(reportAccept);
            },
            onCancel() {
            }
        });
    }

    showConfirm() {

        let reportInfo = this.props.reportDetail.data.reportInfo;

        var _this = this;
        confirm({
            content: '您确认要受理报案？',
            onOk() {
                fetch(Url.updateReportInfo + '?policyNo=' + _this.props.reportDetail.data.policyInfo.policyNo + '&actionId=ACTION_R20', {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            reportNo:reportInfo.reportNo
                        })
                    }
                ).then(reportAccept => {
                        if (reportAccept.code == 200) {
                            _this.success(reportAccept);
                        } else {
                             Modal.error({
                                content: reportAccept.message,
                            });
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
            <div></div>
        )
    }

}

export default connect(state => {
    return {
        reportDetail: state.reportDetail
    }
}, dispatch => {
    return {
        actions: bindActionCreators({
            reportAccept
        }, dispatch)
    }
})(AcceptBtn);