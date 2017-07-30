import React, { Component } from 'react';
import {Tabs, Button, Row, Col} from 'antd';
class ClientInfo extends Component {
    render() {
        return (
            <div>
                <Row style={{height: 40}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保单号：</Col>
                            <Col span={16}>11</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保险订单号：</Col>
                            <Col span={16}>1556113213215</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保单状态：</Col>
                            <Col span={16}>生效</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40,marginTop: 10}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>险种：</Col>
                            <Col span={16}>退货运费险</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保单类型：</Col>
                            <Col span={16}>独立保单</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40,marginTop: 10}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>出单时间：</Col>
                            <Col span={16}>2017-02-09 15:56:23</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保险起期：</Col>
                            <Col span={16}>2017-02-09 15:56:23</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保险止期：</Col>
                            <Col span={16}>2018-02-09 00:00:00</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40,marginTop: 10}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>保费：</Col>
                            <Col span={16}>¥900.00</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>累计赔偿限额：</Col>
                            <Col span={16}>¥300,000.00</Col>
                        </Row>
                    </Col>
                </Row>
                <Row style={{height: 40,marginTop: 10}}>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>退保时间：</Col>
                            <Col span={16}>-</Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row>
                            <Col span={8}>退保金额：</Col>
                            <Col span={16}>-</Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
};
export default  ClientInfo;

