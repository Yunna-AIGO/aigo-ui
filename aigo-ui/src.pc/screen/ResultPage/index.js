import React from 'react'
import { Alert } from 'antd';
import { Button } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import { hashHistory } from 'react-router'

class ResultPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           countDown:3
        }
    }

    confirm (){
        hashHistory.push('/report-search')
        // window.location.href="#/report-search";
    }

    componentDidMount(){

        let interval = setInterval(() => {
            let countDown = this.state.countDown;
            countDown--;
            this.setState({
                countDown:countDown
            });
        },1000);

        setTimeout(() => {
            hashHistory.push('/report-search')
            // window.location.href="#/report-search?";
            clearInterval(interval);
        },3000);

    }

    render() {
        return (
            <div>
                <Alert
                    message="已成功"
                    description={`${this.state.countDown}秒后跳转至报案查询`}
                    type="success"
                    showIcon
                />
                <div>
                    <Button type="primary" onClick={this.confirm.bind(this)}>确认</Button>
                </div>
            </div>
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
})(ResultPage);