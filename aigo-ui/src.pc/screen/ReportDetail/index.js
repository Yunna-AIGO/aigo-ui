import React from 'react'
import './index.css'
import Detail from '../../control/Detail'
import {
    fetchReportByReportNo
} from '../../actions/reportDetail';
import {Input,Tabs, Button, Row, Col,Spin} from 'antd';

import {connect} from 'react-redux'
import {bindActionCreators} from "redux";

import './index.css'
import BasicInfo from './BasicInfo'
import steps from './steps'

class ReportDetail extends React.Component {
    state={
        loading:true,
    }
    componentDidMount() {
        let record = JSON.parse(this.props.params.record);
        this.props.actions.fetchReportByReportNo(record.reportNo, record.policyNo ? record.policyNo : null, record.actionId,()=>{
            this.setState({
                loading:false,
            })
        });
        /*mock*/
        //this.props.actions.fetchReportByReportNo();
    }

    render() {
        return (
            this.state.loading?
                <div style={{textAlign:'center'}}><Spin/></div>
            :
                <Detail
                    detailData={this.props.reportDetail}
                    actions={this.props.actions}
                    preferAction={this.props.location.query.preferAction}
                >
                    <BasicInfo record={this.props.params.record} />
                </Detail>
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
             fetchReportByReportNo,
             fetchReportByReportNo
         }, dispatch)
     }
 })(ReportDetail);

