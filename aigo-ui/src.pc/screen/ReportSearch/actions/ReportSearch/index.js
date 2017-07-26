/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import {Modal,Form,Input,Row,Col,Button,DatePicker,Select,Table} from 'antd';
import {searchReportsByConditions} from '../../../../actions/report';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {
	fetchReportAccept,
	reportAccept,
	reportCorrelation
} from "../../../../actions/reportDetail"
import fetch from "cathay-fetch";
import {Link} from 'react-router';
import Url from '../../../../actions/Url';
import '../../index.css';

const confirm = Modal.confirm;

class ReportSearch extends React.Component {
	state={
		loading:false,
		errorModal:false,
		dataSource: [],
		loadedPage:[],
		pageSize: 5,
		current: 1
	}
	componentDidMount(){
		this.props.form.setFieldsValue(this.props.searchCondition)
		this.loadTableData(this.props.searchCondition,this.props.page)	
	}

	loadTableData=(condition,page,pageSize)=>{
		let _this = this;
		// if(this.state.loadedPage[page-1]){
		// 	return
		// }

		this.setState({
			loading:true,
		})

		this.props.actions.searchReportsByConditions(condition,(value)=>{
		
			if(value.code==400){
				Modal.error({
					content: value.message,
					onOk:()=>{
						_this.props.form.resetFields()
						_this.props.actions.searchReportsByConditions({},(value)=>{
							if(value.code == 400){
								Modal.error({
									content: value.message
								})
							}
						},1,5)
					}
				});
			}
			this.setState({
				loading:false,
			})
			this.state.loadedPage[page-1]=true
		},page,this.state.pageSize)
	}

	

	handleSearch = (e) => {

		e.preventDefault();

		let values=this.props.form.getFieldsValue()
		if (values['reportPeriod'] && Object.prototype.toString.call(values['reportPeriod']) === "[object Array]") {
			values['beginTime'] = values['reportPeriod'][0].format('YYYY-MM-DD 00:00:00');
			values['endTime'] = values['reportPeriod'][1].format('YYYY-MM-DD 23:59:59');
			delete values.reportPeriod;
		}
		let routeQuery=new URLSearchParams(location.hash.split('?')[1])
		routeQuery.delete('page')
		routeQuery.delete('_k')
		routeQuery.set('condition',JSON.stringify(values))
		routeQuery.append('page',1)
		location.replace(
			location.hash.split('?')[0]+'?'+routeQuery
		)

		// this.props.form.setFieldsValue(searchCondition)
		this.loadTableData(values,this.props.page)
		this.setState({
			current:1
		})		
	}


	handleReset = () => {
		this.props.form.resetFields();
		let routeQuery=new URLSearchParams(location.hash.split('?')[1])
		routeQuery.delete('page')
		routeQuery.delete('condition')
		routeQuery.delete('_k')
		location.replace(
			location.hash.split('?')[0]+'?'+routeQuery
		)
		this.props.form.setFieldsValue(this.props.searchCondition)
		this.props.form.resetFields()
		// this.loadTableData(this.props.searchCondition,this.props.page)	
		// location.reload()
	}

	success(report) {
		this.props.actions.reportAccept(report);
	}

	registerEnter(record, id) {

		this.setState({
			spinning: true
		});

		var reportInfo = {};

		let obj = {};

		let _this = this;

		obj.reportNo = record.reportNo;

		obj.policyNo = record.policyNo;

		obj.actionId = "ACTION_C10";

		reportInfo.reportNo = record.reportNo;

		reportInfo = JSON.stringify(reportInfo);

		let policyNo = record.policyNo ? record.policyNo : '';

		confirm({
			content: '您确认要受理此立案？',
			onOk() {
				fetch(Url.registerAcceptance, {
						method: 'put',
						// credentials: 'same-origin',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(obj)
					}
				).then(reportAccept => {
						if (reportAccept.code == 400) {
							Modal.error({
								content: reportAccept.message
							});
							return;
						}
						if (reportAccept.code == 200) {
							_this.setState({
								spinning: false
							})
							window.location.href = "#/report-detail/" + JSON.stringify(record);
							_this.success(reportAccept);
						}
					})
			},
			onCancel() {

			}
		});



	}

	reportAccept() {
		this.props.actions.fetchReportAccept();
	}

	surveyEnter(record) {
		window.location.href = "#/report-detail/" + JSON.stringify(record);
	}

	reportRelease(record, id) {

		Modal.confirm({
			content: '您确认要释放此报案？',
			onOk() {
				fetch(Url.updateReportInfo + '?policyNo=' + (record.policyNo||'') + '&actionId=' + id, {
						method: 'put',
						// credentials: 'same-origin',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({reportNo:record.reportNo})
					}
				).then(reportAccept => {
					if (reportAccept.code == 400) {
						Modal.error({
							content: reportAccept.message
						});
						return;
					}
					if (reportAccept.code == 200) {
						window.location.reload();
					}
				})
			},
		});
	}

	accepting(record, id,preferAction) {


		this.setState({
			spinning: true
		})
		var reportInfo = {};

		reportInfo.reportNo = record.reportNo;

		reportInfo = JSON.stringify(reportInfo);

		let policyNo = record.policyNo ? record.policyNo : '';

		fetch(Url.updateReportInfo + '?policyNo=' + (record.policyNo||'') + '&actionId=' + id, {

				method: 'put',
				// credentials: 'same-origin',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({reportNo:record.reportNo})
			}
		).then(reportAccept => {
			if (reportAccept.code == 400) {
				Modal.error({
					content: reportAccept.message
				});
				return;
			}
			if (reportAccept.code == 200) {
				window.location.href = "#/report-detail/" + JSON.stringify(record)+'?preferAction='+preferAction;
				this.success(reportAccept);
			}
		})
	}

	renderActions(record) {

		switch (record.bizStatus) {
			case '待受理':
				record.actionId = "ACTION_R20";
	
				return (
					<div onClick={() => {
						// this.accepting(record,'ACTION_R20')
						window.location.href = "#/report-detail/" + JSON.stringify(record) + '?preferAction=acceptBtn';
					}}>
						<Link>
							报案受理
						</Link>
					</div>
				);
				break;
			case '受理中':
				return (
					<div>
						<div onClick={() => {
							record.actionId = "ACTION_R12";
							delete record.source;
							this.surveyEnter(record);
						}}>
							<Link>
								查勘录入
							</Link>
						</div>

						<div style={{width:5}}></div>
						<div onClick={() => {
							record.actionId = "ACTION_R40";
							this.reportRelease(record,'ACTION_R40')}}
						>
							<Link>
								报案释放
							</Link>
						</div>
					</div>
				);
				break;
			case '准予立案':
				record.actionId = "ACTION_C10"
				return (
					<div onClick={() => {
						window.location.href = "#/report-detail/" + JSON.stringify(record) + '?preferAction=registerAccept';
					}}>
						<Link>
							立案受理
						</Link>
					</div>
				);
				break;
			case '立案中':
				record.actionId = "ACTION_C11"
				return (
					<div onClick={() => {

					window.location.href = "#/report-detail/" + JSON.stringify(record) + '?preferAction=registerEnter';

					}}>
						<Link>
							立案录入
						</Link>
					</div>
				);
				break;
			case '已立案':
				return (
					<div onClick={() => {
						location.href = "#/report-detail/" + JSON.stringify(record)+'?preferAction=adjustmentEnter'
					}}>
						<Link>
							理算受理
						</Link>
					</div>
				);
				break;
			case '理算中':
				return (
					<div>
						<div onClick={() => {
							location.href = "#/report-detail/" + JSON.stringify(record)
						}}>
							<Link>
								理算录入
							</Link>
						</div>
					</div>
				);
				break;
			case '已结案':
				return (
					<div></div>
				);
				break;
		}

	}
	render() {

		return (
			<div>
				<div style={{padding: 24, background: '#fff', minHeight: 360}}>
					<Form
						className="ant-advanced-search-form"
						onSubmit={this.handleSearch}
					>
						<Row gutter={40}>
							<Col span={8}>
								<Form.Item label="报案号" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('reportNo')(
											<Input placeholder='请输入'/>
										)
									}
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="保单号" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('policyNo')(
											<Input placeholder='请输入'/>
										)
									}
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="赔案号" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('claimNo')(
											<Input placeholder='请输入'/>
										)
									}
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="报案人" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('reporter')(
											<Input placeholder='请输入'/>
										)
									}
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="处理人" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('operator')(
											<Input placeholder='请输入'/>
										)
									}
								</Form.Item>
							</Col>
							<Col span={8}>
								<Form.Item label="报案状态" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('bizStatus')(
											<Select allowClear={true} placeholder="请选择">
												<Select.Option value="R20">待受理</Select.Option>
												<Select.Option value="R30">受理中</Select.Option>
												<Select.Option value="C10">准予立案</Select.Option>
												<Select.Option value="R11">报案注销</Select.Option>
												<Select.Option value="C20">立案中</Select.Option>
												<Select.Option value="C30">已立案</Select.Option>
												<Select.Option value="A10">理算中</Select.Option>
												<Select.Option value="Z00">已结案</Select.Option>
												<Select.Option value="V40">已拒赔</Select.Option>
											</Select>
										)
									}
								</Form.Item>
							</Col>
							<Col span={8} className='report_time'>
								<Form.Item label="报案时间" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('reportPeriod')(
											<DatePicker.RangePicker size="large"/>
										)
									}
								</Form.Item>
							</Col>
						</Row>
						<Row className="formSearch">
							<Col span={24} style={{textAlign: 'right', marginBottom: '30px'}}>
								<Button type="primary" htmlType="submit">搜索</Button>
								<Button style={{marginLeft: 8}} onClick={this.handleReset}>
									清除
								</Button>
							</Col>
						</Row>
					</Form>

					<Table
						loading={this.state.loading}
						bordered
						dataSource={this.props.reportInfo||[]}
					
						columns={[
							{
								title: '报案号',
								dataIndex: 'reportNo',
								render: (text, record, index) => {
									record.actionId = "ACTION_R11";
									record.source = 'reportSource';
									return (
										<Link to={"/report-detail/" + JSON.stringify(record)}>
											{record.reportNo || null}
										</Link>
									)
								}
							},
							{
								title: '保单号',
								render: (text, record) => (
									<span>
										{record.policyNo ? record.policyNo : null}
									</span>
								)
							},
							{
								title: '赔案号',
								width: 80,
								render: (text, record) => (
									<span>
										{record.claimNo ? record.claimNo : null}
									</span>
							)
							},
							{
								title: '报案人',
								width: 90,
								render: (text, record) => (
									<span>
										{record.reporter ? record.reporter : null}
									</span>
								)
							},
							{
								title: '投保人',
								width: 60,
								render: (text, record) => (
									<span>
										{record.policyHolder ? record.policyHolder : null}
									</span>
								)
							},
							{
								title: '被保人',
								width: 60,
								render: (text, record) => (
									<span>
										{ record.insured ? record.insured : null}
									</span>
								)
							},
							{
								title: '保单起止时间',
								width: 130,
								render: (text, record) => (
									<span>
										<p>{record.effectiveTime ? record.effectiveTime : null}  ~ </p>
										<p>{record.expireTime ? record.expireTime : null}</p>
									</span>
								)
							},
							{
								title: '处理人',
								width: 60,
								render: (text, record) => (
									<span>
										{record.operator ? record.operator : null}
									</span>
								)
							},
							{
								title: '最后操作日期',
								width: 120,
								render: (text, record) => (
									<span>
										{record.operateTime ? record.operateTime : null}
									</span>
								)
							},
							{
								title: '最后操作者',
								width: 80,
								render: (text, record) => (
									<span>
										{record.lastOperator ? record.lastOperator : null}
									</span>
								)
							},
							{
								title: '状态',
								width: 60,
								render: (text, record) => {

									if (record.bizStatus && record.bizStatus == "报案注销") {
										return (<div>
											<span style={{color:'rgb(157,148,148)'}}>
											{record.bizStatus ? record.bizStatus : null}
											</span>
										</div>)
									} else if(record.bizStatus == "未关联保单"){
										return (<div>
											<span style={{color:'yellow'}}>
											{record.bizStatus ? record.bizStatus : null}
											</span>
										</div>)
									}
									else {
										return (<div>
											<span style={{color:'#3acd3a'}}>
											{record.bizStatus ? record.bizStatus : null}
											</span>
										</div>)
									}
								}
							},
							{
								title: '操作',
								width: 80,
								render: (text, record, index) =>this.renderActions(record)
							}
						]}
						pagination={{
							pageSize: this.state.pageSize,
							defaultCurrent:this.props.page,
							total:Number(this.props.total),
							current: this.state.current,
						}}
						onChange={pagination=>{
							this.loadTableData(this.props.searchCondition,pagination.current)
							this.setState({
								current: pagination.current
							})
							let routeQuery=new URLSearchParams(location.hash.split('?')[1])
							routeQuery.set('page',pagination.current)
							// routeQuery.append('pageSize',pagination.pageSize)
							routeQuery.delete('_k')
							location.replace(
								location.hash.split('?')[0]+'?'+routeQuery
							)
						}}
					/>
				</div>
			</div>
		);
	}
}

export default connect(state => {

	return {
		reportInfo: state.report.data&&state.report.data.tasks?state.report.data.tasks:[],
		total: state.report.data&&state.report.data.total?state.report.data.total:0
	}
	
}, dispatch => {
	return {
		actions: bindActionCreators({
			searchReportsByConditions,
			fetchReportAccept,
			reportAccept,
			reportCorrelation
		}, dispatch)
	}
})(Form.create()(ReportSearch));

