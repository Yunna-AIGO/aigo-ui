/**
 * Created by i01007600619 on 2017/4/25.
 */
import React from 'react';
import {Tabs, Button, Row, Col} from 'antd';
export default class insuredInfo extends React.Component {

    render() {
        insuredInfo = this.props.insuredInfo;
        // console.log('insuredInfo',insuredInfo);
        return (
             <Row style={{height:"40px"}}>
                    <Col span={3} style={{}}>投保人姓名：</Col>
                    <Col span={5} style={{marginLeft:-30}}>1</Col>
                    <Col span={3}>投保人证件类型：</Col>
                    <Col span={6} style={{marginLeft:-30}}>2</Col>
                    <Col span={2}>投保人证件号:</Col>
                    <Col span={5}>3</Col>
                </Row>
            <div style={{marginTop:10}}>
                <Row style={{height:"40px"}}>
                    <Col span={3}>投保人姓名：</Col>
                    <Col span={5} style={{marginLeft:-30}}>{insuredInfo.certName}</Col>
                    <Col span={3}>投保人证件类型：</Col>
                    <Col span={6} style={{marginLeft:-30}}>{insuredInfo.certType}</Col>
                    <Col span={2}>投保人证件号:</Col>
                    <Col span={5}>{insuredInfo.certNo}</Col>
                </Row>
                <Row style={{height:"40px"}}>
                    <Col span={4}>投保人渠道账户名称:</Col>
                    <Col span={4} style={{marginLeft:-30}}>{insuredInfo.accountName}</Col>
                    <Col span={4}>投保人渠道账户类型：</Col>
                    <Col span={5} style={{marginLeft:-30}}>{insuredInfo.accountType}</Col>
                    <Col span={3}>投保人渠道账户ID:</Col>
                    <Col span={5}>{insuredInfo.accountId}</Col>
                </Row>
                <Row style={{height:"40px"}}>
                    <Col span={3}>投保人联系方式：    </Col>
                    <Col span={5} style={{marginLeft:-30}}>{insuredInfo.accountContact?insuredInfo.accountContact:''}</Col>
                    <Col span={3}>投保人地址：</Col>
                    <Col span={6} style={{marginLeft:-30}}>{insuredInfo.accountSite?insuredInfo.accountSite:''}</Col>
                </Row>
            </div>
        );
    }
}