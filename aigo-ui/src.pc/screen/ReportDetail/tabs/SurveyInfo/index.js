/**
 * Created by i01007600608 on 2017/2/9.
 */
import React from 'react';
import {Tabs, Button, Row, Col} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import Currency from "cathay-currency"
class SurveyInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
               <Row type="flex" style={{height: 40}}>
                    
                    <Col span={2}>查勘人：</Col>
                    <Col span={6}>{this.props.surveyInfo.surveyor}</Col>
                      
                    <Col span={2}>查勘方式：</Col>
                    <Col span={6}>{this.props.surveyInfo.surveyType}</Col>

            
                    <Col span={2}>初堪金额：</Col>
                    <Col span={6}>
                        <Currency>
                            {this.props.surveyInfo.lossAssessAmt}
                        </Currency>                        
                    </Col>

                </Row>

                
                <Row type="flex" style={{height: 40}}>                   
                    <Col span={2}>查勘开始时间：</Col>
                    <Col span={6}>{this.props.surveyInfo.surveyStartTime}</Col>                                 
                    <Col span={2}>查勘结束时间：</Col>
                    <Col span={6}>{this.props.surveyInfo.surveyEndTime}</Col>
                </Row>

                <Row type="flex" style={{height: 40}}>
                    <Col span={2}>情况说明：</Col>
                    <Col>{this.props.surveyInfo.surveyDesc}</Col>                   
                </Row>
           
            
            

            </div>
        );
    }
}


export default connect(state => {

    return {
        surveyInfo:
            state.reportDetail.data.surveyInfo?
                Object.assign({
                    surveyor:null,
                    surveyType:null,
                    lossAssessAmt:null,
                    surveyStartTime:null,
                    surveyEndTime:null,
                    surveyDesc:null,
                },state.reportDetail.data.surveyInfo)
            :
                {
                    surveyor:null,
                    surveyType:null,
                    lossAssessAmt:null,
                    surveyStartTime:null,
                    surveyEndTime:null,
                    surveyDesc:null,
                },
    }
}, dispatch => {
    return {
        actions: bindActionCreators({}, dispatch)
    }
})(SurveyInfo);
