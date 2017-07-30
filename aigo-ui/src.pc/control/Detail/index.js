import React from 'react'
import './index.css'
import {Tabs, Alert, Table, Icon, Input, Row, Col, Pagination,Button,Modal } from 'antd';
import { createForm } from 'rc-form';

import './index.css'
import Steps from './Steps'
import steps from '../../screen/ReportDetail/steps'
import tabs from '../../screen/ReportDetail/tabs';
import operations from '../../screen/ReportDetail/operations';
import "./Buttons/index.css"

class OperationGroup extends React.Component {
	state={
		show:null
	}
	onClick=v=>{
		switch(v.operation){
			case 'expand':
				this.setState({
					expandModule:this.state.expandModule?null:v.expandModule
				})
			break
			case 'modal':
				Modal.confirm({
					content:v.content,
					onOk:v.ok,
					okText:'确定',
					cancelText:'取消',
				})
			break
		}
	}
	close=()=>{
		this.setState({
			expandModule:null,
		})
	}

	render(){
		return(
			<div>
				<div style={{padding:'20px 15px',border:'1px solid #daf0d0',background:'#edf8e8',borderRadius:'3px',display:this.state.expandModule?'':'none',position:'relative'}}>
					<Icon type="close" style={{position:'absolute',top:'6px',right:'4px',cursor:'pointer'}} onClick={()=>this.setState({expandModule:null})}/>
					{this.state.expandModule}
				</div>
				<div className="ct-detail-actions">
					<div>
						{
							this.props.operations.map((v,i)=>(
								<Button
									key={i}
									size="large"
									type={i==0?'primary':'default'}
									onClick={()=>{
										this.onClick(v)
									}}
								>{v.text}</Button>
							))
						}
					</div>
					{this.state.expandModule?<div className="mask">请先完成当前操作</div>:null}
				</div>
			</div>
		)
	}
}

class TabsContents extends React.Component {
	render(){
		return(
			<div className="ct-detail-tabs">
				<Tabs
					type="card"
					defaultActiveKey={this.props.defaultActiveKey}
				>
					{
						this.props.tabs.map((v,i)=>(
							<Tabs.TabPane
								tab={v.title}
								key={v.key||i}
							>
								{(()=>{
									if(v.layout=='grid'){
										return(
											<div>grid</div>
										)
									}
									if(v.layout=='table'){
										return(
											<div>table</div>
										)
									}
									if(v.content){
										return v.content
									}
								})()}
							</Tabs.TabPane>
						))
					}
				</Tabs>
			</div>
		)
	}
}

class Detail extends React.Component {

	componentDidMount(){
		let operation
		if(this.props.preferAction){
			operation=operations.find(v=>v.code==this.props.preferAction)
		}
		if(!operation)return
		this.operationGroup.onClick((()=>{
			return {
				text:operation.label,
				operation:operation.operation,
				expandModule:operation.operation=='expand'?React.createElement(operation.Component,{
				closeAction: () => {
					this.operationGroup.close()
				},
				actions: this.props.actions,
				detailData:this.props.detailData
			}):null,
				content:operation.content,
				ok:()=>{operation.ok(this.props.detailData.data.policyInfo,this.props.detailData.data.reportInfo)},
			}
		})())
		setTimeout(()=>{
			window.scroll(0,99999)
		},11)
	}

    renderSteps() {
        return(
			<Steps
				items={steps}
				currentStep={this.props.detailData.status.currentStep}
			/>
		)
    }

    renderTips() {
        let tips = this.props.detailData.tips;
        if (tips){
			return(
				<Alert
					message={tips}
					type="warning"
					showIcon
				/>
			)
        }
		else{
			return null
		}
    }

    renderTabs() {
        return(
			<TabsContents
				tabs={this.props.detailData.tabs.map((key) => {

					let tabConfig = tabs.find(v=>v.code==key);

					return{
						title:tabConfig.label,
						key:key,
						content:React.createElement(tabConfig['Component']),
					}
				})}
				defaultActiveKey={this.props.detailData.status.currentTab||tabs[0].code}
			/>
		)
    }

    renderButtons() {
        return (

			<OperationGroup ref={ref=>this.operationGroup=ref} operations={this.props.detailData.operations.map(item=> {
				let operation = operations.find(v=>v.code==item);
				return{
					text:operation.label,
					operation:operation.operation,
					expandModule:operation.operation=='expand'?React.createElement(operation.Component,{
						closeAction: () => {
							this.operationGroup.close()
							this.setState({
								expandModule: null
							})
						},
						OperationGroup: OperationGroup,
						actions: this.props.actions,
						detailData:this.props.detailData
					}):null,
					content:operation.content,
					ok:()=>{operation.ok(this.props.detailData.data.policyInfo,this.props.detailData.data.reportInfo)},
				}
				})}
			/>
        )
    }

    examine(){
        let tabledataArr = [];
        if(this.props.actions.fetchExamine){
            const dataTable = this.props.detailData.data.tabledata;
            tabledataArr = dataTable.map((val,index)=>{
                let newval = Object.assign({key:index},val); //浅拷贝
                return newval;
            });
        }

        const data = this.props.actions.fetchExamine;
        if(!data){
            return null;
        }
        const { getFieldProps } = this.props.form;  

        return (
            <div style={{marginTop:'20px',borderTop:'1px solid #EBEBEB'}}>
                <Row style={{height: "40px", fontSize: "16px", marginTop: "30px"}}>
                    <Col span={24}>审核日志</Col>
                </Row>
                <Table
					columns={[
						{
							title: "审核结果",
							dataIndex: "examineResult",
							key: "examineResult",
						},
						{
							title: '审核人',
							dataIndex: 'examinePerson',
							key: 'examinePerson',
						},
						{
							title: '流程号',
							dataIndex: 'examineNo',
							key: 'examineNo',
						},
						{
							title: '审核时间',
							dataIndex: 'examineTime',
							key: 'examineTime',
						},
						{
							title: '审核意见',
							dataIndex: 'examineOpinion',
							key: 'examineOpinion',
						},
					]}
					dataSource={tabledataArr}
					pagination={false}
				/>
                <div style={{marginTop:'40px'}}>
                    <Row type="flex">
                        <Col span={22} order={2}>
                            <Input type="textarea" 
                                placeholder="请输入备注" 
                                autosize={{ minRows: 2, maxRows: 6 }}
                                {...getFieldProps('textarea',{
                                    onChange:text=>{
									   this.props.detailData.data.textarea = text.target.value;
								   }
                                })}  
                            />
                        </Col>
                        <Col span={2} order={1}>
                            请填写意见:
                        </Col>
                    </Row>
                </div>
            </div> 
        );
    }


    render() {

        return (

            <div className="ct-detail">

                <h2>{this.props.title}</h2>

                {this.renderSteps()}

                {this.renderTips()}

                {this.props.children}

                {this.renderTabs()}

                {this.examine()}

                {this.renderButtons()}

            </div>
        )
    }
}
export default createForm()(Detail);