/**
 * Created by i01007600608 on 2017/2/9.
 */
import React from 'react';
import ClaimFormInfo from './ClaimFormInfo';
import './index.css'

import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {Form,Tabs, Button, Row, Col,Input} from 'antd';
export default class ClaimRegistrationInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerInfo:null
        };
    }

    deliverParames(value){
        this.setState({
            registerInfo:value
        });
    }

    deliverClaim(){
        this.props.actions.reportDetailClaim();
    }

    render() {
        return (
            <div className="wrap-claimInfo">
                <div style={{fontSize:'20px',paddingTop:'-20px',marginBottom:'10px'}}>立案信息</div>
                <ClaimFormInfo registerInfo={this.props.reportDetail} actions={this.props.actions} />
                <Row style={{marginTop: '30px'}}>
                    <Col span={2}>情况说明：</Col>
                    <Col span={22}><Input type="textarea" placeholder="" autosize={{ minRows: 3, maxRows: 6 }} /></Col>
                </Row>
                <Row style={{marginTop:'30px'}}>
                    <Col span={4}>
                    </Col>
                    <Col span={3}>
                        <Button type="primary" onClick={this.deliverClaim.bind(this)}>立案完成</Button>
                    </Col>
                    <Col span={16}>
                        <Button>立案完成</Button>
                    </Col>
                </Row>
            </div>
        );
    }
}

