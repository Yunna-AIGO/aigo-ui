import React from 'react'
//import fetch from "isomorphic-fetch"
import fetch from "cathay-fetch";
import { Modal, Button } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {claimsReject} from '../../../../actions/reportDetail';
import Url from '../../../../actions/Url';
const confirm = Modal.confirm;


class CloseCase extends React.Component {

    componentDidMount(){
        this.showConfirm();
    }
    showConfirm(){
        let reportInfo = JSON.stringify(this.props.reportDetail.data.reportInfo);
        let _this = this;
        let policyNo = _this.props.reportDetail.data&&_this.props.reportDetail.data.policyInfo&&_this.props.reportDetail.data.policyInfo.policyNo?_this.props.reportDetail.data.policyInfo.policyNo:''
    confirm({
        content: '您确认要结案？',
        onOk() {
            fetch('/api/v1/tasks/registerSaveInfo', {
                    // method: 'post',
                    // credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(claimsReject => {

                    if(claimsReject.code == 200){
                        _this.props.closeAction();
                        window.location.href = '#/result-page/10';
                    }else{
                        Modal.error({
                            content: claimsReject.message,
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
            claimsReject
        }, dispatch)
    }
})(CloseCase);