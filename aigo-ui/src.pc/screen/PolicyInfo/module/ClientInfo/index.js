/**
 * Created by i01007600608 on 2017/2/9.
 */
import React from 'react';
import {Tabs, Button, Row, Col} from 'antd';
export default class ClientInfo extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        
    }

    render() {
        let customerInfo = this.props.customerInfo;
        let insuredList = this.props.customerInfo.insuredList?this.props.customerInfo.insuredList:[];
        let customerInfoHolder = customerInfo.holder || {};
        return (

            <div style={{marginTop:10}}>
                <Row style={{height:"40px"}} type="flex">
                    <Col span={4} style={{}}>投保人姓名：</Col>
                    <Col span={4} style={{marginLeft:-30}}>{customerInfoHolder.certName}</Col>
                    <Col span={4}>投保人证件类型：</Col>
                    <Col span={4} style={{marginLeft:-30}}>{customerInfoHolder.certType}</Col>
                    <Col span={4}>投保人证件号:</Col>
                    <Col span={4}>{customerInfoHolder.certNo}</Col>
                </Row>
                <Row style={{height:"40px"}} type="flex">
                    <Col span={4}>投保人渠道账户名称:</Col>
                    <Col span={4} style={{marginLeft:-30}}>{customerInfoHolder.accountName}</Col>
                    <Col span={4}>投保人渠道账户类型：</Col>
                    <Col span={4} style={{marginLeft:-30}}>{customerInfoHolder.accountType}</Col>
                    <Col span={4}>投保人渠道账户ID:</Col>
                    <Col span={4}>{customerInfoHolder.accountId}</Col>
                </Row>
                <Row style={{height:"40px"}} type="flex">
                    <Col span={4}>投保人联系方式：</Col>
                    <Col span={4} style={{marginLeft:-30}}>{customerInfoHolder.accountContact?customerInfoHolder.accountContact:''}</Col>
                    <Col span={4}>投保人地址：</Col>
                    <Col span={4} style={{marginLeft:-30}}>{customerInfoHolder.accountSite?customerInfoHolder.accountSite:''}</Col>
                </Row>
        

                {
                    insuredList.map((v,i)=>{return  (

            <div style={{marginTop:10}} key={i}>
                <Row style={{height:"40px"}} type="flex">
                    <Col span={4} style={{}}>被保人姓名：</Col>
                    <Col span={4} style={{marginLeft:-30}}>{v.certName}</Col>
                    <Col span={4}>被保人证件类型：</Col>
                    <Col span={4} style={{marginLeft:-30}}>{v.certType}</Col>
                    <Col span={4}>被保人证件号:</Col>
                    <Col span={4}>{v.certNo}</Col>
                </Row>
                <Row style={{height:"40px"}} type="flex">
                    <Col span={4}>被保人渠道账户名称:</Col>
                    <Col span={4} style={{marginLeft:-30}}>{v.accountName}</Col>
                    <Col span={4}>被保人渠道账户类型：</Col>
                    <Col span={4} style={{marginLeft:-30}}>{v.accountType}</Col>
                    <Col span={4}>被保人渠道账户ID:</Col>
                    <Col span={4}>{v.accountId}</Col>
                </Row>
                <Row style={{height:"40px"}} type="flex">
                    <Col span={4}>被保人联系方式：    </Col>
                    <Col span={4} style={{marginLeft:-30}}>{v.accountContact?v.accountContact:''}</Col>
                    <Col span={4}>被保人地址：</Col>
                    <Col span={4} style={{marginLeft:-30}}>{v.accountSite?v.accountSite:''}</Col>
                </Row>
            </div>

                        )})
                }

            </div>
        );
    }
}
