/**
 * Created by i01007600608 on 2017/2/9.
 */
import React from 'react';
import './index.css';
import {Tabs, Button, Row, Col} from 'antd';
import Currency from 'cathay-currency';
export default class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let policyBaseInfo = null;
        //if (this.props.data && this.props.data.data.policyBaseInfo) {
            let data = this.props.data.data || {};
            policyBaseInfo = data.policyBaseInfo ;
        //}
        return (
            <div className="basicInfo">
                <Row style={{height: 40, marginTop: 10}} type="flex">
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>保单号：</Col>
                            <Col
                                span={16}>{policyBaseInfo && policyBaseInfo.policyNo ? policyBaseInfo.policyNo : '-'}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>保险订单号：</Col>
                            <Col
                                span={16}>{policyBaseInfo && policyBaseInfo.antPolicyNo ? policyBaseInfo.antPolicyNo : '-'}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>保单状态：</Col>
                            <Col
                                span={16}>{policyBaseInfo && policyBaseInfo.status ? policyBaseInfo.status : '-'}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40, marginTop: 10}} type="flex">
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>险种：</Col>
                            <Col
                                span={16}>{policyBaseInfo && policyBaseInfo.prodNoName ? policyBaseInfo.prodNoName : '-'}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>保单类型：</Col>
                            <Col
                                span={16}>{policyBaseInfo && policyBaseInfo.type ? policyBaseInfo.type : '-'}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40, marginTop: 10}} type="flex">
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>出单时间：</Col>
                            <Col
                                span={16}>{policyBaseInfo && policyBaseInfo.issueTime ? policyBaseInfo.issueTime : '-'}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>保险起期：</Col>
                            <Col
                                span={16}>{policyBaseInfo && policyBaseInfo.effectStartTime ? policyBaseInfo.effectStartTime : '-'}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>保险止期：</Col>
                            <Col
                                span={16}>{policyBaseInfo && policyBaseInfo.effectEndTime ? policyBaseInfo.effectEndTime : '-'}</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40, marginTop: 10}} type="flex">
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>保费：</Col>
                            <Col span={16}>
                                <Currency>{policyBaseInfo && policyBaseInfo.premium ? policyBaseInfo.premium :''}</Currency>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8} type="flex">
                        <Row type="flex">
                            <Col span={8}>保单限额：</Col>
                            <Col span={16}>
                                <Currency>
                                    {policyBaseInfo && policyBaseInfo.sumInsured?policyBaseInfo.sumInsured:''}
                                </Currency>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40, marginTop: 10}} type="flex">
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>退保时间：</Col>
                            <Col
                                span={16}>{policyBaseInfo && policyBaseInfo.surrenderTime ? policyBaseInfo.surrenderTime : '-'}</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row type="flex">
                            <Col span={8}>退保金额：</Col>
                            <Col span={16}>
                                <Currency>
                                    {policyBaseInfo?policyBaseInfo.surrenderFee:''}
                                </Currency>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}
