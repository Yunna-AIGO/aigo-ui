import React,{ Component } from 'react'
import { Row, Col } from 'antd';

class PolicyInfo extends Component {

    render() {
        return (
            <div className="reportInfo">
                <Row style={{height: "40px", fontSize: "16px", marginTop: "-30px"}}>
                    <Col span={24}>保单信息</Col>
                </Row>
                <Row style={{height: "40px"}}>
                    <Col span={2}>保单号:</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.policyNo ? this.props.dataSource.policyNo : null}</Col>
                    <Col span={2}>险种:</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.policyType ? this.props.dataSource.policyType : null}</Col>
                </Row>
                <Row style={{height: "40px"}}>
                    <Col span={2}>被保险人:</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.policyPerson ? this.props.dataSource.policyPerson : null}</Col>
                    <Col span={2}>保险时间:</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.policyTime ? this.props.dataSource.policyTime : null}</Col>
                </Row>

            </div>

        )
    }

}

export default PolicyInfo;
