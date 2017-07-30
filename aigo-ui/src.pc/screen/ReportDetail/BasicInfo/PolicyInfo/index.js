import React from 'react'
import {Row, Col} from 'antd';
import {Link} from 'react-router';
import {Modal, Button} from 'antd';
import './index.css'
import {Alert} from 'antd';
import {Input} from 'antd';
import ConfirmBtn from './ConfirmBtn'
import fetch from "isomorphic-fetch"
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import {fetchPolicyInfoByPolicyNo} from "../../../../actions/reportDetail"

//关联组件
const LocalizedModal = React.createClass({
    getInitialState() {
        return {
            value: '',
            visible: false,
            show: false,
            message: ''
        };
    },
    showModal() {
        this.setState({
            visible: true
        });
    },
    componentWillReceiveProps(nextProps){

    },

    onchange(e){
        this.setState({
            value: e.target.value,
            show: false,
            visible: true
        });
    },
    handleOk(e) {
        this.props.fetchPolicyInfoByPolicyNo(this.state.value, this.props.reportInfo.reportNo, this.props.policyInfo.policyNo, 'ACTION_R14', (value) => {
            console.log('handleok');
            if (value.code == 200) {
                this.setState({
                    show: false,
                    visible: false
                });
            } else if (value.code == 400) {
                this.setState({
                    show: true,
                    visible: true
                });
            }
        });
    },

    repeatOk(e) {
        this.props.fetchPolicyInfoByPolicyNo(this.state.value, this.props.reportInfo.reportNo, this.props.policyInfo.policyNo, 'ACTION_R14', (value) => {

            if (value.code == 200) {
                this.setState({
                    show: false,
                    visible: false
                });

                let policyDataJson = location.hash.split('?')[0].split('/');

                let policyDataJsonQuery = policyDataJson[2]
     
                let policyData = JSON.parse(policyDataJsonQuery);

                policyData.policyNo = value.data.data.policyInfo.policyNo;

                policyDataJson[2] = JSON.stringify(policyData);

                let newPolicyData = policyDataJson.join('/');

                location.replace(location.hash.replace(location.hash,newPolicyData));


            } else if (value.code == 400) {
                this.setState({
                    show: true,
                    visible: true,
                    message: value.message
                });
            }
        });
    },

    handleCancel() {
        this.setState({
            visible: false,
            show: false
        });
    },
    render() {
        var show = this.state.show ? 'block' : 'none';
        let reportStatus = this.props.reportDetail.data && this.props.reportDetail.data.reportInfo && this.props.reportDetail.data.reportInfo.reportStatus ? this.props.reportDetail.data.reportInfo.reportStatus : '';
        if (reportStatus == "准予立案" || reportStatus == "报案注销" || this.props.correlation == 'correlation' || reportStatus == "待受理") {
            var isShow = true;
        } else {
            var isShow = false;  
        }   
        return (
            <div style={{width: '400px'}}>
                <a type="primary" hidden={isShow} onClick={this.showModal}>重新关联</a>
                <Modal title="关联保单" visible={this.state.visible}
                       onOk={this.repeatOk} onCancel={this.handleCancel}
                       okText="确定" cancelText="取消"
                >
                    <Alert message={this.state.message} type="error" showIcon
                           style={{marginTop: "-17px", display: show}}/>
                    <Row>
                        <Col span={3} offset={3} style={{marginTop: '3px'}}>保单号：</Col>
                        <Col span={14}><Input placeholder="请输入" onChange={this.onchange} ref="reInput"/></Col>
                        <Col span={4}></Col>
                    </Row>
                    <Row>
                        <Col style={{height: '50px'}}></Col>
                    </Row>
                </Modal>
            </div>
        );
    }
});


class Guarantee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: 123
        };
    }

    onchange(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        let reportStatus = this.props.reportDetail.data && this.props.reportDetail.data.reportInfo && this.props.reportDetail.data.reportInfo.reportStatus ? this.props.reportDetail.data.reportInfo.reportStatus : '';
        let policyBaseInfo = null;
        let customerInfo = null;
        let dataInfo = {
            action: "reportDetail",
            policyNo: this.props.dataSource.policyInfo&&this.props.dataSource.policyInfo.policyNo?this.props.dataSource.policyInfo.policyNo:'',
            reportNo: this.props.dataSource.policyInfo&&this.props.dataSource.policyInfo.reportNo?this.props.dataSource.policyInfo.reportNo:'',
        }
     
        let record = JSON.parse(this.props.record);
        if (this.props.dataSource && this.props.dataSource.policyInfo && this.props.dataSource.policyInfo.policyBaseInfo) {
            policyBaseInfo = this.props.dataSource.policyInfo.policyBaseInfo;
        }
        if (this.props.dataSource && this.props.dataSource.policyInfo && this.props.dataSource.policyInfo.customerInfo) {
            customerInfo = this.props.dataSource.policyInfo.customerInfo;
        }

        if (!this.props.dataSource.policyInfo) {

            if (reportStatus == "待受理" || reportStatus == "报案注销") {
                return (<div></div>)
            }

            return (
                <div>
                    <div className="wrap-policy" style={{marginTop:'20px'}}>
                        <Row>
                            <Col span={2} className="policy-num">保单号：</Col>
                            <Col span={10} className="policy-input">
                                <Input onChange={this.onchange.bind(this)} placeholder="请输入保单号"/>
                            </Col>
                            <Col span={1}></Col>
                            <Col span={4} className="policy-query">
                                <Link to={'/policy-search/'}>保单查询</Link>
                            </Col>
                            <Col span={9}></Col>
                        </Row>
                    </div>
                    <ConfirmBtn
                        fetchPolicyInfoByPolicyNo={this.props.actions.fetchPolicyInfoByPolicyNo}
                        policyNo={this.state.value}
                        policyInfo={this.props.dataSource.policyInfo}
                        reportInfo={this.props.dataSource.reportInfo}
                    />
                </div>
            )
        } else {
            return (
                <div className="policyInfo">

                    <Row style={{height: "40px", marginTop: "-30px"}}>
                        <Col span={2} style={{fontSize: "16px"}}>保单信息</Col>
                        <Col span={20}></Col>
                        <Col span={2}>
                            <Link to={"/policy-info/" + JSON.stringify(dataInfo)}>保单详情</Link>
                        </Col>
                    </Row>
                    <Row style={{height: "40px"}}>
                        <Col span={2}>保单号：</Col>
                        <Col
                            span={4}>{this.props.dataSource && this.props.dataSource.policyInfo && this.props.dataSource.policyInfo.policyNo ? this.props.dataSource.policyInfo.policyNo : null}</Col>
                        <Col span={2}>
                            <LocalizedModal
                                reportDetail={this.props.reportDetail}
                                fetchPolicyInfoByPolicyNo={this.props.actions.fetchPolicyInfoByPolicyNo}
                                policyInfo={this.props.dataSource.policyInfo}
                                reportInfo={this.props.dataSource.reportInfo}
                                correlation={this.props.correlation}
                                recordSource={record.source ? record.source : null}
                                record={record}
                            />
                        </Col>
                        <Col span={2}>险种：</Col>
                        <Col
                            span={10}>{policyBaseInfo && policyBaseInfo.prodNoName ? policyBaseInfo.prodNoName : null}</Col>
                    </Row>
                    <Row style={{height: "40px"}}>
                        <Col span={2}>被保险人：</Col>
                        <Col
                            span={6}>{customerInfo && customerInfo.insuredList && Object.prototype.toString.call(customerInfo.insuredList) === "[object Array]" && customerInfo.insuredList.length > 0 ? customerInfo.insuredList[0].certName : null}</Col>
                        <Col span={2}>保险期间：</Col>
                        <Col
                            span={10}>{policyBaseInfo && policyBaseInfo.effectStartTime ? policyBaseInfo.effectStartTime : null}~{policyBaseInfo && policyBaseInfo.effectEndTime ? policyBaseInfo.effectEndTime : null}</Col>
                    </Row>
                </div>
            )

        }
    }
}

export default connect(state => {
    return {
        reportDetail: state.reportDetail,
        correlation: state.correlation ? state.correlation : false
    }
}, dispatch => {
    return {
        actions: bindActionCreators({
            fetchPolicyInfoByPolicyNo
        }, dispatch)
    }
})(Guarantee);



