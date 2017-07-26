import React from 'react'
//import fetch from "isomorphic-fetch"
import fetch from "cathay-fetch";
import { Modal, Button } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {reportAnnotation} from '../../../../actions/reportDetail';
import Url from '../../../../actions/Url';
const confirm = Modal.confirm;


class AdjustmentAnnotation extends React.Component {

    componentDidMount(){
        this.showConfirm();
    }

    showConfirm(){
        let reportInfo = JSON.stringify(this.props.reportDetail.data.reportInfo);
        var _this = this;
        let policyNo = _this.props.reportDetail.data&&_this.props.reportDetail.data.policyInfo&&_this.props.reportDetail.data.policyInfo.policyNo?_this.props.reportDetail.data.policyInfo.policyNo:''
    confirm({
        content: '您确认要理算释放？',
        onOk() {
            fetch('/api/v1/tasks/registerSaveInfo', {
                    // method: 'post',
                    // credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            ).then(adjustment => {

                    if(adjustment.code == 200){
                        _this.props.closeAction();
                        window.location.href = '#/result-page/10';
                    }else{
                        Modal.error({
                            content: adjustment.message,
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
        }, dispatch)
    }
})(AdjustmentAnnotation);