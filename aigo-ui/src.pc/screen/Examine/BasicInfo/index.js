import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import ReportInfo from './ReportInfo';
import PolicyInfo from './PolicyInfo';

class BasicInfo extends Component {
    render() {
        return (
	        <div>
	            <ReportInfo dataSource={this.props.reportDetail ? this.props.reportDetail.data.reportInfo : ''} />
	            <PolicyInfo dataSource={this.props.reportDetail ? this.props.reportDetail.data.policyInfo : ''}  actions={this.props.actions} />
	        </div>
	    );
    }
}
 export default BasicInfo;