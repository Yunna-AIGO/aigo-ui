/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import WrappedAdvancedSearchForm from './ReportSearchf'
import EditableTable from './ReportSearchResult'
import Title from '../../../../control/Title';

function callback(key) {
    console.log(key);
}
 export default class ApproveTask extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tab = ['全部','我得任务','审批任务'];
        return (
            <div>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <WrappedAdvancedSearchForm  deliverParames={this.deliverParames}  dataSource={this.props.reportInfo} />
                    <EditableTable dataSource={this.props.reportInfo} />
                </div>
            </div>
        );
    }
}


