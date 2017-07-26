import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import Detail from '../../control/Detail';
import BasicInfo from './BasicInfo';
import steps from './steps';
import operations from './operations';
import tabs from './tabs';
import { fetchExamine } from '../../actions/examine';
import AuditLog from './AuditLog';
import queryString from "query-string";


class Examine extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        let hash = location.hash.split('?')[1];
        let parsedQuery = queryString.parse(hash) || {};
        this.props.examineActions.fetchExamine(parsedQuery.reportNo);
    }

    render() {
        //console.log(JSON.stringify(this.props.examineDetail.data.tabledata)+'!!');
        return (
            <div>
                <Detail
                    detailData={this.props.examineDetail}
                    steps={steps}
                    operations={operations}
                    tabs={tabs}
                    actions={this.props.examineActions}

                >
                    <BasicInfo reportDetail={this.props.examineDetail}/>
                </Detail>

            </div>
        );
    }
};

function mapDispatchToProps(dispatch){
    return {
        examineActions:bindActionCreators({fetchExamine},dispatch)
    }
}
function mapStateToProps(state){
    return{
        examineDetail:state.examine
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Examine);