import React from 'react'
//import fetch from "isomorphic-fetch"
import fetch from "cathay-fetch";
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {registerFinish} from '../../../../actions/reportDetail';
import Url from '../../../../actions/Url';
import { Modal, Button } from 'antd';

const confirm = Modal.confirm;


class Cancel extends React.Component {

    componentDidMount() {
        this.showConfirm();
    }

    success(reportAccept) {
        this.props.closeAction();
        this.props.actions.registerFinish(reportAccept);
    }

    showConfirm() {

        var _this = this;

        confirm({
            content: '您确认要完成立案？',
            onOk() {
                fetch("/api/v1/tasks/registerSaveInfo", {
                        method: 'put',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                ).then(registerFinish => {
                        if (registerFinish.code == "200") {
                            _this.success(registerFinish);
                            window.location.href = '#/result-page/3';
                        } else {
                            Modal.error({
                                content: registerFinish.message?registerFinish.message:'立案完成'
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
            registerFinish
        }, dispatch)
    }
})(Cancel);

