import React from 'react'
//import fetch from "isomorphic-fetch"
import fetch from "cathay-fetch";
import { Modal, Button } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {reportAnnotation} from '../../../../actions/reportDetail';
import Url from '../../../../actions/Url';
const confirm = Modal.confirm;


class ReportAnnotation extends React.Component {

    componentDidMount(){
        this.showConfirm();
    }

    success(reportAn) {
        this.props.closeAction();
        this.props.actions.reportAnnotation(reportAn);
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
        content: '您确认要释放此立案？',
        onOk() {
            fetch('/api/v1/tasks/registerSaveInfo', {
                    // method: 'post',
                    // credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:bodyInfo
                }
            ).then(registerAn => {

                    if(registerAn.code == 200){
                        _this.success(registerAn);
                        window.location.href = '#/result-page/10';
                    }else{
                        Modal.error({
                            content: registerAn.message,
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