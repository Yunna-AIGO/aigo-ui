import React from 'react'
import { Modal, Button } from 'antd';
//import fetch from "isomorphic-fetch"
import fetch from "cathay-fetch";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {reportAccept} from '../../../../actions/reportDetail';
import Url from '../../../../actions/Url';

const confirm = Modal.confirm;

function success() {

}

function error(message) {
    Modal.error({
        content: message
    });
}

class Cancel extends React.Component {

    componentDidMount(){
        this.showConfirm();
    }

    success(reportAccept){
        var _this = this;
        Modal.success({
            content: '准予立案成功',
            onOk() {
                _this.props.closeAction();
                _this.props.actions.reportAccept(reportAccept);
            },
            onCancel() {}
        });
    }

    showConfirm(){

        let reportInfo = this.props.reportDetail.data.reportInfo;
        let bodyInfo = {
          reportNo:reportInfo.reportNo
        };
        bodyInfo = JSON.stringify(bodyInfo);
        var _this = this;
        let policyNo = _this.props.reportDetail.data&&_this.props.reportDetail.data.policyInfo&&_this.props.reportDetail.data.policyInfo.policyNo?_this.props.reportDetail.data.policyInfo.policyNo:'';
        confirm({
            title: '确认后不可再修改，是否提交',
            content: '提交后不可再修改',
            onOk() {
                fetch(Url.updateReportInfo + '?policyNo=' + policyNo + '&actionId=ACTION_R50', {
                        method: 'PUT',
                        // credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:bodyInfo
                    }
                ).then(reportAccept => {
                        if(reportAccept.code == 200){
                            window.location.href = '#/result-page/' + reportAccept.message;
                        }else if(reportAccept.code == 400){
                            Modal.error({
                                content: reportAccept.message
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