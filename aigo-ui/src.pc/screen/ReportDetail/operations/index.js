import reportAnnotation from './reportAnnotation'
import ClaimRegistrationInfo from './ClaimRegistrationInfo'
import reportCancel from './reportCancel'
import acceptBtn from './acceptBtn'
import Survey from './Survey'
import DocumentUpload from './documentUpload'
import approveRegister from './approveRegister'
import RegisterEnter from './RegisterEnter'
import RegisterFinish from './RegisterFinish'
import RegisterAnnotation from './RegisterAnnotation'
import ClaimReject from './ClaimReject'
import CloseCase from './CloseCase'
import AdjustmentAnnotation from './AdjustmentAnnotation'

import React from 'react'
import {connect} from 'react-redux'

import fetch from "cathay-fetch";
import Url from '../../../actions/Url'

import {Form,Row,Col,Input,Button,message,Modal,Icon} from 'antd'

const operations = [
    {
        priority: 1,
        code: "survey",
        label: "查勘录入",
        operation: "expand",
        Component: Survey
    },
    {
        priority: 2,
        code: "reportAnnotation",
        label: "报案释放",
        operation: "expand",
        Component: reportAnnotation
    },
    {
        priority: 3,
        code: "reportCancel",
        label: "报案注销",
        operation: "expand",
        Component: reportCancel
    },
    {
        priority: 4,
        code: "documentUpload",
        label: "单证上传",
        operation: "expand",
        Component: DocumentUpload
    },
    {
        priority: 5,
        "code": "registerEnter",
        label: "立案录入",
        operation: "expand",
        Component: RegisterEnter
    },
    {
        priority: 6,
        "code": "approveRegister",
        label: "准予立案",
        operation: "expand",
        Component: approveRegister
    },
    {
        priority: 7,
        "code": "acceptBtn",
        label: "报案受理",
        operation: "modal",
        content:'确认受理此报案?',
        ok:(record,reportInfo)=>{

            if(!record){
                record = {}
                record.policyNo = record&&record.policyNo?record.policyNo:''
            }

            fetch(Url.updateReportInfo + '?policyNo=' + record.policyNo + '&actionId=ACTION_R20', {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "reportNo":record.reportNo?record.reportNo:reportInfo.reportNo
                        })
                    }
                ).then(reportAccept => {
                    if(reportAccept.code == 200){
                          location.replace(location.hash.replace('preferAction=acceptBtn&',''));
                          location.reload();
                    }else{
                        Modal.error({
                            content: reportAccept.message
                        });
                    }
            })
        }
    },
    {
        priority: 8,
        "code": "registerAccept",
        label: "立案受理",
        operation: "modal",
        content:"确定受理？",
        ok:record=>{
            fetch(Url.registerAcceptance, {
                    method: 'put',
                    // credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "reportNo": record.reportNo,
                        "policyNo": record.policyNo,
                        "actionId": "ACTION_C10"
                    })
                }
            ).then(reportAccept => {
                    if (reportAccept.code == 400) {
                        Modal.error({
                            content: reportAccept.message
                        });
                        return;
                    }
                    if (reportAccept.code == 200) {
                        location.replace(location.hash.replace('preferAction=registerAccept&',''));
                        location.reload();
                    }
                })
        }
    },
    {
        priority: 10,
        "code": "AdjustmentAcceptance",
        label: "理算受理",
        operation: "modal",
        content: "确定受理？",
        ok: record=>{
            fetch('/api/v1/registers/AdjustmentAcceptance',{
                method:'put',
                header:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    "reportNo": record.reportNo,
                    "policyNo": record.policyNo,
                    "actionId": "ACTION_A10"
                }),
            }).then(res=>{
                location.replace(location.hash.replace('preferAction=AdjustmentAcceptance&',''))
                location.reload()
            })
        },
    },
    {
        priority: 11,
        "code": "registerFinish",
        label: "立案完成",
        operation: "expand",
        Component: RegisterFinish
    },
    {
        priority: 12,
        "code": "registerAnnotation",
        label: "立案释放",
        operation: "expand",
        Component: RegisterAnnotation,
    },
    {
        priority: 13,
        "code": "claimReject",
        label: "拒赔",
        operation: "expand",
        Component: (
            connect(
                state=>({
                    reportNo: state.reportDetail.data.policyInfo.reportNo,
                    policyNo: state.reportDetail.data.policyInfo.policyNo,
                })
            )(Form.create()(
                class extends React.Component{
                    render(){
                        return(
                            <div>
                                <Row style={{marginBottom:'15px'}}>
                                    <Col span={2}><span style={{color:'red',marginRight:6}}>*</span>拒赔原因：</Col>
                                    <Col span={22}>
                                        {
                                            this.props.form.getFieldDecorator('refuseRemark',{
                                                rules: [{ required: true, message: '请输入' }],
                                            })(
                                                <Input
                                                    type="textarea"
                                                    autosize={{ minRows: 5}}
                                                />
                                            )
                                        }
                                    </Col>
                                </Row>
                                <div>
                                    <Button type="primary" onClick={()=>{
                                        this.props.form.validateFields((err,values)=>{
                                            if(!err){
                                                Modal.confirm({
                                                    content:'确定拒赔',
                                                    onOk:()=>{
                                                        fetch('/api/v1/claims/refuseClaim',{
                                                            method:'put',
                                                            header:{
                                                                'Content-Type':'application/json',
                                                            },
                                                            body:JSON.stringify({
                                                                "refuseRemark": this.props.form.getFieldValue('refuseRemark'),
                                                                "closeRemark": this.props.form.getFieldValue('refuseRemark'),
                                                                "reportNo": this.props.reportNo,
                                                                "policyNo": this.props.policyNo,
                                                                "actionId": "ACTION_V40",
                                                            })
                                                        }).then(res=>{
                                                            if(res.code==200){
                                                                Modal.confirm({
                                                                    content: res.message,
                                                                    iconType:'check-circle',
                                                                    onOk:()=>{
                                                                        location.reload()
                                                                    },
                                                                    onCancel:()=>{
                                                                        location.hash='#/report-search'
                                                                        location.reload()
                                                                    },
                                                                    okText:'留在详情页',
                                                                    cancelText:'去列表页',
                                                                })
                                                            }
                                                            else if(res.code == 400){
                                                                Modal.error({content: res.message})
                                                            }
                                                            else{
                                                                throw res.code
                                                            }
                                                        }).catch(e=>Modal.error({content:'失败：'+e}))
                                                    },
                                                    okText:'确定',
                                                    cancelText:'取消',
                                                })
                                            }
                                            else{
                                                Modal.warning({content:'请输入拒赔原因'})
                                            }
                                        })
                                    }} style={{marginRight:'8px'}}>提交</Button>
                                </div>
                            </div>
                        )
                    }
                }
            ))
        )
    },
    {
        priority: 14,
        "code": "adjustmentAnnotation",
        label: "理算释放",
        operation: "expand",
        Component: AdjustmentAnnotation
    },
    {
        priority: 15,
        "code": "closeCase",
        label: "结案",
        operation: "expand",
        Component: (
            connect(
                state=>({
                    reportNo: state.reportDetail.data.policyInfo.reportNo,
                    policyNo: state.reportDetail.data.policyInfo.policyNo,
                })
            )(Form.create()(
                class extends React.Component{
                    render(){
                        return(
                            <div>
                                <Row style={{marginBottom:'15px'}}>
                                    <Col span={2}>结案说明：</Col>
                                    <Col span={22}>
                                        {
                                            this.props.form.getFieldDecorator('closeRemark')(
                                                <Input
                                                    type="textarea"
                                                    autosize={{ minRows: 5}}
                                                />
                                            )
                                        }
                                    </Col>
                                </Row>
                                <div>
                                    <Button type="primary" onClick={()=>{
                                        Modal.confirm({
                                            content:'确定结案',
                                            onOk:()=>{
                                                fetch('/api/v1/claims/closeReport',{
                                                    method:'put',
                                                    header:{
                                                        'Content-Type':'application/json',
                                                    },
                                                    body:JSON.stringify({
                                                        "closeRemark": this.props.form.getFieldValue('closeRemark'),
                                                        "reportNo": this.props.reportNo,
                                                        "policyNo": this.props.policyNo,
                                                        "actionId": "ACTION_Z",
                                                    })
                                                }).then(res=>{
                                                    if(res.code == 200){
                                                        Modal.confirm({
                                                            content: res.message,
                                                            iconType:'check-circle',
                                                            onOk:()=>{
                                                                location.reload()
                                                            },
                                                            onCancel:()=>{
                                                                location.hash='#/report-search'
                                                                location.reload()
                                                            },
                                                            okText:'留在详情页',
                                                            cancelText:'去列表页',
                                                        })
                                                    }else{
                                                        Modal.error({
                                                            content:res.message
                                                        })
                                                    }
                                             
                                                })
                                            },
                                        })
                                    }} style={{marginRight:'8px'}}>提交</Button>
                                </div>
                            </div>
                        )
                    }
                }
            ))
        )
    },
    {
        priority: 16,
        "code": "registerEnter",
        label:'立案录入',
        operation:'expand',
        Component:RegisterEnter
    },
    {
        priority: 17,
        "code": "adjustmentEnter",
        label: "理算受理",
        operation: "modal",
        content: "确定受理？",
        ok: record=>{
            fetch('/api/v1/claims/adjustmentAcceptance',{
                method:'put',
                // header:{
                //     'Content-Type':'application/json',
                // },
                body:JSON.stringify({
                    "reportNo": record.reportNo,
                    "policyNo": record.policyNo,
                    "actionId": "ACTION_A10"
                }),
            }).then(res=>{
                location.replace(location.hash.replace('preferAction=adjustmentEnter&',''))
                location.reload()
            })
        },
    }
];


module.exports = operations;