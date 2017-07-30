import React from 'react'
import {Button, Modal} from 'antd'
import './index.css'

class ConfirmBtn extends React.Component {

    confirm() {
        this.props.fetchPolicyInfoByPolicyNo(this.props.policyNo, this.props.reportInfo && this.props.reportInfo.reportNo ? this.props.reportInfo.reportNo : null, this.props.policyInfo && this.props.policyInfo.policyNo ? this.props.policyInfo.policyNo : null,'ACTION_R13',(value) => {
            if(value.code == 400){
                Modal.error({
                    title: '',
                    content: value.message
                });
            }
        });
    }

    render() {
        return <div className="confirm-btn">
            <Button type="primary" onClick={this.confirm.bind(this)}>确定</Button>
        </div>
    }
}

export default ConfirmBtn