import React, { Component } from 'react';
import {Tabs, Button, Row, Col} from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


class SurveyInfo extends Component {
    render() {
        return (
            <div>
                <Row style={{height: 40}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保单号：</Col>
                            <Col span={16}>{this.props.surveyInfo.policyNumber}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保险订单号：</Col>
                            <Col span={16}>{this.props.surveyInfo.insuranceNumber}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保单状态：</Col>
                            <Col span={16}>{this.props.surveyInfo.policyStatus}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40,marginTop: 10}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>险种：</Col>
                            <Col span={16}>{this.props.surveyInfo.insuranceType}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保单类型：</Col>
                            <Col span={16}>{this.props.surveyInfo.policyType}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40,marginTop: 10}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>出单时间：</Col>
                            <Col span={16}>{this.props.surveyInfo.outTime}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保险起期：</Col>
                            <Col span={16}>{this.props.surveyInfo.insuranceStartTime}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保险止期：</Col>
                            <Col span={16}>{this.props.surveyInfo.insuranceEndTime}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40,marginTop: 10}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保费：</Col>
                            <Col span={16}>{this.props.surveyInfo.money}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>累计赔偿限额：</Col>
                            <Col span={16}>{this.props.surveyInfo.countMoney}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40,marginTop: 10}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>退保时间：</Col>
                            <Col span={16}>{this.props.surveyInfo.surrenderTime}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>退保金额：</Col>
                            <Col span={16}>{this.props.surveyInfo.surrenderMoney}</Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
};

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({}, dispatch)
    }
}
function mapStateToProps(state){   //采用合并对象？？？？？？？？？？？？？？？？？？？？？？
    return{
        surveyInfo:state.examine.data.surveyTabInfo ? 
            state.examine.data.surveyTabInfo 
            :
            {
             "policyNumber":"",
             "insuranceNumber":"",
             "policyStatus":"",
             "insuranceType":"",
             "policyType":"",
             "outTime":"",
             "insuranceStartTime":"",
             "insuranceEndTime":"",
             "money":"",
             "countMoney":"",
             "surrenderTime":"",
             "surrenderMoney":"",   
            }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SurveyInfo);

