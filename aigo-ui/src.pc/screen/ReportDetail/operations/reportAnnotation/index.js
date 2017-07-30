import React from 'react'
//import fetch from "isomorphic-fetch"
import fetch from "cathay-fetch";
import { Modal, Button } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {reportAnnotation} from '../../../../actions/reportDetail';
import Url from '../../../../actions/Url';
const confirm = Modal.confirm;

function error(message) {
    Modal.error({
        content: message,
    });
}

class ReportAnnotation extends React.Component {

    componentDidMount(){
        this.showConfirm();
    }

    success(reportAn) {
        this.props.closeAction();
        this.props.actions.reportAnnotation(reportAn);
        window.location.href="#/result-page";
    }

    error() {
        var _this = this;
        Modal.error({
            content: '报案释放失败',
            onOk() {
                _this.props.closeAction();
            },
        });
    }

    showConfirm(){

        let reportInfo = this.props.reportDetail.data.reportInfo;
        let bodyInfo = {
          reportNo:reportInfo.reportNo
        };
        bodyInfo = JSON.stringify(bodyInfo);

        var _this = this;
        let policyNo = _this.props.reportDetail.data&&_this.props.reportDetail.data.policyInfo&&_this.props.reportDetail.data.policyInfo.policyNo?_this.props.reportDetail.data.policyInfo.policyNo:''
    confirm({
        content: '您确认要释放此报案？',
        onOk() {
            fetch(Url.updateReportInfo + '?policyNo=' + policyNo + '&actionId=ACTION_R40', {
                    method: 'PUT',
                    // credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:bodyInfo
                }
            ).then(reportAn => {

                    if(reportAn.code == 200){
                        _this.success(reportAn);
                        window.location.href = '#/result-page/' + reportAn.message;
                    }else{
                        Modal.error({
                            content: reportAn.message,
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
            reportAnnotation
        }, dispatch)
    }
})(ReportAnnotation);