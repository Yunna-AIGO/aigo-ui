import React from 'react';

import ReportInfo from './ReportInfo'
import PolicyInfo from './PolicyInfo'
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"


import {
    fetchReportDetailByPolicyNo,
    fetchReportByReportNo,
    reportDetailClaim,
    fetchSaveSurvey,
    fetchButtonStateByPolicyNo,
    claimDetailPolicy,
    fetchPolicyInfoByPolicyNo
} from '../../../actions/reportDetail';


class BasicInfo extends React.Component {

    render() {
        return <div>
            <ReportInfo dataSource={this.props.reportDetail&&this.props.reportDetail.data&&this.props.reportDetail.data.reportInfo?this.props.reportDetail.data.reportInfo:''}/>

            <PolicyInfo dataSource={this.props.reportDetail&&this.props.reportDetail.data?this.props.reportDetail.data:''}
                        actions={this.props.actions}
                        record={this.props.record}
            />
        </div>
    }
}

export default connect(state => {


    if(state.reportDetail.data.reportInfo.accidentType instanceof Array){
        state.reportDetail.data.reportInfo.accidentType = state.reportDetail.data.reportInfo.accidentType?state.reportDetail.data.reportInfo.accidentType.join(' '):'';
    }

    return {
        reportDetail: state.reportDetail
    }
}, dispatch => {
    return {
        actions: bindActionCreators({
            fetchReportDetailByPolicyNo,
            fetchReportByReportNo,
            reportDetailClaim,
            fetchSaveSurvey,
            fetchButtonStateByPolicyNo,
            claimDetailPolicy,
            fetchPolicyInfoByPolicyNo
        }, dispatch)
    }
})(BasicInfo);