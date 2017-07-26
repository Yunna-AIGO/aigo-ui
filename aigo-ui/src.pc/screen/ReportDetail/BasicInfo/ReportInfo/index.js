import React from 'react'
import {Row, Col} from 'antd';
import './index.css'

class Reportcase extends React.Component {

    render() {

        return (
            <div className="reportInfo">
                <Row type="flex" style={{height: "40px", fontSize: "16px", marginTop: "-30px"}}>
                    <Col span={24}>报案信息</Col>
                </Row>
                <Row type="flex" style={{height: "40px"}}>
                    <Col span={2}>报案号：</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.reportNo ? this.props.dataSource.reportNo : null}</Col>
                    <Col span={2}>报案人：</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.reporter ? this.props.dataSource.reporter : null}</Col>
                    <Col span={2}>报案人电话：</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.reporterTel ? this.props.dataSource.reporterTel : null}</Col>
                </Row>
                <Row type="flex" style={{height: "40px"}}>
                    <Col span={2}>报案时间：</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.reportTime ? this.props.dataSource.reportTime : null}</Col>
                    <Col span={2}>出险原因：</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.accidentReason ? this.props.dataSource.accidentReason : null}</Col>
                    <Col span={2}>出险类型：</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.accidentType ? this.props.dataSource.accidentType : null}</Col>
                </Row>
                <Row type="flex" style={{height: "40px"}}>
                    <Col span={2}>出险时间：</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.accidentTime ? this.props.dataSource.accidentTime : null}</Col>
                    <Col span={2}>出险地点：</Col>
                    <Col
                        span={6}>{this.props.dataSource && this.props.dataSource.accidentPlace ? this.props.dataSource.accidentPlace : null}</Col>
                </Row>
                <Row type="flex" style={{paddingBottom: '8px'}}>
                    <Col span={2}>出险经过：</Col>
                    <Col span={22}>
                        {this.props.dataSource && this.props.dataSource.accidentDesc ? this.props.dataSource.accidentDesc : null}
                    </Col>
                </Row>

            </div>

        )
    }

}

export default Reportcase
