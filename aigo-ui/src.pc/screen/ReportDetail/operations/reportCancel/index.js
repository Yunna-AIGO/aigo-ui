import React from 'react'
//import fetch from "isomorphic-fetch"
import fetch from "cathay-fetch";
import { connect } from 'react-redux'
import { bindActionCreators } from "redux";
import { reportAccept } from '../../../../actions/reportDetail';
import { hashHistory } from 'react-router'
import Url from '../../../../actions/Url';
import { Modal, Button } from 'antd';

const confirm = Modal.confirm;


class Cancel extends React.Component {

    componentDidMount() {
        this.showConfirm();
    }

    success(reportAccept) {
        this.props.closeAction();
        this.props.actions.reportAccept(reportAccept);
        // window.location.href="#/result-page";
    }

    showConfirm() {

        let reportInfo = this.props.reportDetail.data.reportInfo;
        let bodyInfo = {
          reportNo:reportInfo.reportNo
        };
        bodyInfo = JSON.stringify(bodyInfo);


        var _this = this;
        let policyNo = _this.props.reportDetail.data&&_this.props.reportDetail.data.policyInfo&&_this.props.reportDetail.data.policyInfo.policyNo?_this.props.reportDetail.data.policyInfo.policyNo:''

        confirm({
            content: '您确认要注销此报案',
            onOk() {
                
                fetch(Url.updateReportInfo + '?policyNo=' + policyNo + '&actionId=ACTION_R30', {
                        method: 'put',
                        // credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: bodyInfo
                    }
                ).then(reportCancel => {
                        if (reportCancel.code == "200") {
                            _this.success(reportCancel);
                            hashHistory.push(`result-page/${reportCancel.message}`);
                            // window.location.href = '#/result-page/' + reportCancel.message;
                        } else {
                            Modal.error({
                                content: reportCancel.message
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
})(Cancel);

