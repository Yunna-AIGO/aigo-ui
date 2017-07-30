import React from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
import { Button, Row, Col,Table, Icon,Form ,Input,Modal,Select,Tabs,Popconfirm,message} from 'antd';
import fetch from "cathay-fetch";

import Currency from 'cathay-currency';

let propertyItemColumns=[
	{
		title: '险种',
		dataIndex: 'insuranceClass',
	},
	{
		title: '责任',
		dataIndex: 'accountability',
	},
	{
		title: '保额',
		dataIndex: 'coverage',
        render: (text, record) => (
           <Currency>{text}</Currency>     
        ),
	},
	{
		title: '免赔率',
		dataIndex: 'deductibleRate',
	},
	{
		title: '免赔额',
		dataIndex: 'deductible',
		render: (text, record) => (
           <Currency>{text}</Currency>     
        ),
	},
	{
		title: '立案金额',
		dataIndex: 'registerMoney',
		render: (text, record) => (
           <Currency>{text}</Currency>     
        ),
	},
	{
		title: '理算金额',
		dataIndex: 'adjustmentMoney',
		render: (text, record) => (
           <Currency>{text}</Currency>     
        ),
	},
]

let payItemColumns=[
	{
		title: '收款人',
		dataIndex: 'payee',
	},
	{
		title: '支出类型',
		dataIndex: 'payType',
	},
	{
		title: '支付方式',
		dataIndex: 'payWay',
	},
	{
		title: '开户行',
		dataIndex: 'bank',
	},
	{
		title: '收款人户名',
		dataIndex: 'payeeAccountName',
	},
	{
		title: '收款人银行账户/支付宝账户',
		dataIndex: 'payeeAccount',
	},
	{
		title: '付款币种',
		dataIndex: 'currency',
	},
	{
		title: '付款金额',
		dataIndex: 'amount',
		render: (text, record) => (
           <Currency>{text}</Currency>     
        ),
	},
	{
		title: '备注',
		dataIndex: 'remark',
	},
]

// 弹出理算信息填写表单
let AjustmentModalForm=Form.create()(
	class extends React.Component{
		render(){
			return(
				<Form>
					<Form.Item label="保单号" labelCol={{span:6}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
						<span>{this.props.policyNo}</span>
					</Form.Item>
					<Form.Item
						required
						label="险种"
						labelCol={{span:6}}
						wrapperCol={{span:14}}
						style={{marginBottom:'10px'}}
					>
						{this.props.form.getFieldDecorator('insuranceClass', {
							rules: [{ required: true, message: '请选择' }],
							initialValue:this.props.policyCoverageInfo[0].name,
						})(
							<Select placeholder="请选择" onChange={value=>{
								this.props.form.setFieldsValue({accountability:this.props.policyCoverageInfo.find(v=>v.name==value).duties[0].name})
							}}>
								{this.props.policyCoverageInfo.map((v,i)=>(
									<Select.Option value={v.name} key={i}>{v.name}</Select.Option>
								))}
							</Select>
						)}
					</Form.Item>
					<Form.Item
						required
						label="责任"
						labelCol={{span:6}}
						wrapperCol={{span:14}}
						style={{marginBottom:'10px'}}
					>
						{this.props.form.getFieldDecorator('accountability', {
							rules: [{ required: true, message: '请选择' }],
							initialValue:this.props.policyCoverageInfo[0].duties[0].name,
						}) (
							<Select placeholder="请选择">
								{this.props.policyCoverageInfo.find(v=>v.name==this.props.form.getFieldValue('insuranceClass')).duties.map((v,i)=>(
									<Select.Option value={v.name} key={i}>{v.name}</Select.Option>
								))}
							</Select>
						)}
					</Form.Item>
					<Form.Item
						required
						label="理算金额"
						labelCol={{span:6}}
						wrapperCol={{span:14}}
						style={{marginBottom:'10px'}}
					>
						{this.props.form.getFieldDecorator('adjustmentMoney', {
							rules: [{ required: true, message: '请输入理算金额' }],
						})(
							<Input type="number" required placeholder="未填写理算金额"/>
						)}
					</Form.Item>
					<Form.Item
						label="保额"
						labelCol={{span:6}}
						wrapperCol={{span:14}}
						style={{marginBottom:'10px'}}
					>
						<span>
							<Currency>
								{(this.props.policyCoverageInfo.find(v=>v.name==this.props.form.getFieldValue('insuranceClass')).duties.find(v=>v.name==this.props.form.getFieldValue('accountability'))||{amt:'N/A'}).amt}
							</Currency>
						</span>
					</Form.Item>
					<Form.Item
						label="免赔率"
						labelCol={{span:6}}
						wrapperCol={{span:14}}
						style={{marginBottom:'10px'}}
					>
						<span>N/A</span>
					</Form.Item>
					<Form.Item
						label="免赔额"
						labelCol={{span:6}}
						wrapperCol={{span:14}}
						style={{marginBottom:'10px'}}
					>
						<span>N/A</span>
					</Form.Item>
				</Form>
			)
		}
	}
)

// 弹出理赔支付填写表单
let PayModalTabForm=Form.create()(
	class extends React.Component{
		render(){
			return(
				<Form>
					<Row type="flex">
						<Form.Item label="支出类型：" labelCol={{span:10}} wrapperCol={{span:14}}>
							{this.props.form.getFieldDecorator('payType', {
								rules: [{ required: true, message: '请输入' }],
								initialValue:"赔款支出"
							})(
								<Select placeholder="请选择" style={{width:'250px'}}>
									<Select.Option value="赔款支出">赔款支出</Select.Option>
									<Select.Option value="律师费">律师费</Select.Option>
									<Select.Option value="公估费">公估费</Select.Option>
									<Select.Option value="查勘费">查勘费</Select.Option>
									<Select.Option value="其它">其它</Select.Option>
								</Select>
							)}
						</Form.Item>
					</Row>

					<Row type="flex">
						<Form.Item label="收款人：" labelCol={{span:10}} wrapperCol={{span:14}} style={{margin:'-15px 0 10px 5px'}}>
							{this.props.form.getFieldDecorator('payee', {
								rules: [
									{ required: true, message: '请输入' },
								],
							})(
								<Input maxLength="64"  style={{width:'250px'}} required placeholder="请输入内容"/>
							)}
						</Form.Item>						
					</Row>

					<Row type="flex">
						<Form.Item label="收款人户名：" labelCol={{span:10}} wrapperCol={{span:14}} style={{margin:'0 0 10px -5px'}}>
						{
							this.props.form.getFieldDecorator('payeeAccountName', {
								rules: [
									{ required: true, message: '请输入' },
								],
							})(
								<Input maxLength="64"  style={{width:'250px'}} required placeholder="请输入内容"/>
							)
						}
						</Form.Item>					
					</Row>

					<Row type="flex">
						<Form.Item label="收款人账户：" labelCol={{span:10}} wrapperCol={{span:14}} style={{margin:'0 0 10px -5px'}}>
							{
								this.props.form.getFieldDecorator('payeeAccount', {
									rules: [
										{ required: true, message: '请输入' },
									],
								})(
									<Input maxLength="64"  style={{width:'250px'}} required placeholder="请输入内容"/>
								)
							}
						</Form.Item>
					</Row>

					<Row type="flex">
						<Form.Item label="付款币种：" labelCol={{span:10}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
							{
								this.props.form.getFieldDecorator('currency', {
									rules: [{ required: true, message: '请输入' }],
									initialValue:"人民币"
								})(
									<Select placeholder="请选择" style={{width:'250px'}} >
										<Select.Option value="人民币" >人民币</Select.Option>
									</Select>
								)
							}
						</Form.Item>
					</Row>

					{(()=>{ // 开户行填写，银行转账才有
						if(this.props.way=='bank'){
							return(
								<Row type="flex">
									<Form.Item
										label="开户行："
										labelCol={{span:10}}
										wrapperCol={{span:14}}
										style={{margin:'0 0 10px 5px'}}
									>
										{
											this.props.form.getFieldDecorator('bank', {
												rules: [
													{ required: true, message: '请输入' },
												],
											})(
												<Input maxLength="64"  style={{width:'250px'}} required placeholder="请输入内容"/>
											)
										}
									</Form.Item>
								</Row>
							)
						}
						return null
					})()}
					<Row type="flex">
						<Form.Item label="付款金额：" labelCol={{span:10}} wrapperCol={{span:14}} style={{marginBottom:'10px'}}>
							{
								this.props.form.getFieldDecorator('amount', {
									rules: [
										{ required: true, message: '请输入付款金额' },
										{ max:20, message: '付款金额太大'},
									],
								})(
									<Input max="99999999999999999999"  style={{width:'250px'}}  type="number" required placeholder="请输入内容"/>
								)
							}
						</Form.Item>
					</Row>
				
					<Row type="flex">
						<Form.Item label="付款备注：" labelCol={{span:10}} wrapperCol={{span:14}} style={{margin:'0 0 10px -45px'}}>
							{
								this.props.form.getFieldDecorator('remark',{
									rules: [
										{ max:256, message: '备注长度不能超过256'},
									],
								})(
									<Input
										maxLength="256"
										placeholder="请输入备注"
										type="textarea"
										autosize={{ minRows: 3}}
										style={{width:'370px'}} 
									/>
								)
							}
						</Form.Item>
					</Row>
		
				</Form>
			)
		}
	}
)

class AdjustmentContent extends React.Component {
	state = {
		batchDetailVisible: false,
		newAdjustmentFormShow:'none',
		textValue1:null,
		ajustmentFormModalVisible:false,
		payFormModalVisible:false,
		popBatchIndex:0,
		newAjustmentRecord:[],
		popAjustmentRecordIndex:0,
		newPayRecord:[],
		popPayRecordIndex:0,
		popPayTabIndex:'1',
	}

	// 点击新增按钮
	toggleNewAdjustmentForm = () => {
		if(this.state.newAdjustmentFormShow){
			this.setState({
				newAdjustmentFormShow: '',
			});
		}
		else{
			this.setState({
				newAdjustmentFormShow: 'none',
			});
		}
	}
	showBatchDetail = index => {
		this.setState({
			batchDetailVisible: true,
			popBatchIndex:index,
		});
	}
	hideBatchDetail = () => {
		this.setState({
			batchDetailVisible: false,
		});
	}
	showAdjustmentFormModal=index=>{

		// 如果是修改
		if(~index){ // 设置表单值
			this.ajustmentModalForm.setFieldsValue(this.state.newAjustmentRecord[index])
		}

		// 如果是新增
		else if(this.ajustmentModalForm){ // 重置表单
			this.ajustmentModalForm.resetFields()
		}

		this.setState({
			ajustmentFormModalVisible:true,
			popAjustmentRecordIndex:index,
		})
	}
	showPayFormModal=index=>{

		// 如果是修改
		if(~index){
			if(this.state.newPayRecord[index].payWay=='支付宝'){ // 重置第一个支付方式表单
				this.state.popPayTabIndex='2'
				this.payModalTabForm2.setFieldsValue(this.state.newPayRecord[index])
				this.payModalTabForm1&&this.payModalTabForm1.resetFields()
			}
			else{ // 重置第二个支付方式表单
				this.state.popPayTabIndex='1'
				this.payModalTabForm1.setFieldsValue(this.state.newPayRecord[index])
				this.payModalTabForm2&&this.payModalTabForm2.resetFields()
			}
		}

		// 如果是新增
		else{ // 重置两个支付方式表单
			this.state.popPayTabIndex='1'
			this.payModalTabForm1&&this.payModalTabForm1.resetFields()
			this.payModalTabForm2&&this.payModalTabForm2.resetFields()
		}
		this.setState({
			payFormModalVisible:true,
			popPayRecordIndex:index,
			popPayTabIndex:this.state.popPayTabIndex,
		})
	}
	hideAdjustmentFormModal=()=>{
		this.setState({
			ajustmentFormModalVisible:false,
		})
	}
	hidePayFormModal=()=>{
		this.setState({
			payFormModalVisible:false,
		})
	}

	// 理算信息弹窗填写确定
	adjustmentFormModalOk=()=>{
		this.ajustmentModalForm.validateFields((err,values)=>{
			if(!err){

				// 如果是修改
				if(~this.state.popAjustmentRecordIndex){ // 改变旧的值
					this.state.newAjustmentRecord[this.state.popAjustmentRecordIndex].insuranceClass=values.insuranceClass
					this.state.newAjustmentRecord[this.state.popAjustmentRecordIndex].accountability=values.accountability
					this.state.newAjustmentRecord[this.state.popAjustmentRecordIndex].adjustmentMoney=values.adjustmentMoney
					this.state.newAjustmentRecord[this.state.popAjustmentRecordIndex].coverage=this.props.policyCoverageInfo.find(v=>v.name==values.insuranceClass).duties.find(v=>v.name==values.accountability).amt
					this.state.newAjustmentRecord[this.state.popAjustmentRecordIndex].registerMoney=(this.props.registerList.find(v=>v.insuranceClass==values.insuranceClass&&v.accountability==values.accountability)||{registerMoney:'N/A'}).registerMoney
				}

				// 如果是新增
				else{ // 增加一条新的数据
					values.key=this.state.newAjustmentRecord.length?this.state.newAjustmentRecord[this.state.newAjustmentRecord.length-1].key+1:0
					values.deductibleRate='N/A'
					values.deductible='N/A'
					values.coverage=this.props.policyCoverageInfo.find(v=>v.name==values.insuranceClass).duties.find(v=>v.name==values.accountability).amt
					values.registerMoney=(this.props.registerList.find(v=>v.insuranceClass==values.insuranceClass&&(v.accountability==values.accountability||v.accountability==''&&values.accountability=='N/A'))||{registerMoney:'N/A'}).registerMoney
					this.state.newAjustmentRecord.push(values)
				}

				this.setState({
					ajustmentFormModalVisible:false,
					newAjustmentRecord:this.state.newAjustmentRecord,
				})
			}
		})
	}

	// 支付弹窗填写确定
	payFormModalOk=()=>{

		// 支付宝表单or银行表单
		if(this.state.popPayTabIndex=='1'){
			this.payModalForm=this.payModalTabForm1
		}
		else{
			this.payModalForm=this.payModalTabForm2
		}

		this.payModalForm.validateFields((err,values)=>{
			if(!err){
				values.payWay=this.state.popPayTabIndex=='1'?'银行转账':'支付宝'
				values.bank=values.bank||'N/A'

				// 如果是修改
				if(~this.state.popPayRecordIndex){
					values.key=this.state.newPayRecord[this.state.popPayRecordIndex].key
					this.state.newPayRecord[this.state.popPayRecordIndex]=values
				}

				// 如果是新增
				else{
					values.key=this.state.newPayRecord.length?this.state.newPayRecord[this.state.newPayRecord.length-1].key+1:0
					this.state.newPayRecord.push(values)
				}

				this.setState({
					payFormModalVisible:false,
					newPayRecord:this.state.newPayRecord,
					popPayTabIndex:'1',
				})
			}
		})
	}

	// 删除一条刚才填写的理算信息
	deleteNewAjustmentRecord=index=>{
		if(!index){
			this.setState({
				newPayRecord:[]
			})
		}
		this.setState({
			newAjustmentRecord:this.state.newAjustmentRecord.filter((v,i)=>{
				return i!=index
			}),
		})
	}

	// 删除一条刚才填写的支付信息
	deletenewPayRecord=index=>{
		this.setState({
			newPayRecord:this.state.newPayRecord.filter((v,i)=>{
				return i!=index
			}),
		})
	}

	// 支付填写弹窗支付方式tab切换
	payModalTabChange=index=>{
		this.setState({
			popPayTabIndex:index
		})
	}

	// 提交新增
	submitNewAjustmentBatch=()=>{

		// 要提交的数据，从state克隆
		let newAjustmentRecord=this.state.newAjustmentRecord.map(v=>Object.assign({},v))
		let newPayRecord=this.state.newPayRecord.map(v=>Object.assign({},v))

		// 需要有数据输入
		if(!newAjustmentRecord.length){
			return Modal.warning({
				content: '请输入理算信息',
			});
		}
		if(!newPayRecord.length){
			return Modal.warning({
				content: '请输入支付信息',
			});
		}

		// 提交前格式化数据
		newAjustmentRecord.forEach(v=>{
			v.deductibleRate=''
			v.deductible=''
			if(v.registerMoney=='N/A'){
				v.registerMoney=''
			}
			if(v.accountability=='N/A'){
				v.accountability=''
			}
			else{
				v.accountability=this.props.policyCoverageInfo.find(vv=>vv.name==v.insuranceClass).duties.find(vv=>vv.name==v.accountability).code
			}
			v.insuranceClass=this.props.policyCoverageInfo.find(vv=>vv.name==v.insuranceClass).code
		})
		newPayRecord.forEach(v=>{
			v.currency='CNY'
			v.payWay={
				'银行转账':'01',
				'支付宝':'02',
			}[v.payWay]
			v.payType={
				'赔款支出':'01',
				'律师费':'02',
				'公估费':'03',
				'查勘费':'04',
				'其它':'05',
			}[v.payType]
			if(v.bank==='N/A'){
				v.bank=''
			}
		})

		// 提交
		fetch('/api/v1/claims/adjustmentInfo',{
			header:{
				'Content-Type':'application/json',
			},
			body:JSON.stringify({
				adjustmentInfo:newAjustmentRecord,
				payInfo:newPayRecord,
				adjustmentRemark:this.props.form.getFieldValue('adjustmentRemark'),
				reportNo:this.props.reportNo,
				policyNo:this.props.policyNo,
				claimNo:this.props.claimNo,
				actionId:'ACTION_A30',
			})
		}).then(res=>{
			if(res.code==200){
				this.setState({
					newAdjustmentFormShow: 'none',
				})
				setTimeout(()=>location.reload(),555)
				message.success('添加成功')
			}
			else{
				throw res
			}
		}).catch(e=>Modal.error({content:`失败：${e.message}`}))
	}
	render(){

		return (
			<div>
				<Table bordered columns={[
					{
						title: '理算批次',
						dataIndex: 'adjustmentBatch',
					},
					{
						title: '理算内容',
						dataIndex: 'adjustmentContent',
					},
					{
						title: '理算总额',
						dataIndex: 'adjustmentSum',
						render: (text, record) => (
           					<Currency>{text}</Currency>     
        				),
					},
					{
						title: '审核状态',
						dataIndex: 'reviewStatus',
					},
					{
						title: '资金状态',
						dataIndex: 'fundStatus',
					},
					{
						title: '操作',
						render: (text,record,index) => <div><a onClick={()=>{this.showBatchDetail(index)}}>详情</a></div>
					}
				]} dataSource={this.props.adjustmentTabInfo} pagination={false}/>
				<style>{'.adjustment .ant-modal-content{background-color:#edf8e8}'}</style>
				<Modal
					wrapClassName="adjustment"
					width={1160}
					visible={this.state.batchDetailVisible}
					onCancel={this.hideBatchDetail}
					footer={null}
				>
					<div style={{fontSize:"12px",margin:'19px 0 11px'}}>理算信息</div>
					<Table
						bordered
						columns={propertyItemColumns}
						dataSource={this.props.adjustmentTabInfo[this.state.popBatchIndex]&&this.props.adjustmentTabInfo[this.state.popBatchIndex].adjustmentInfo||[]}
						style={{backgroundColor:'#fff'}}
						pagination={false}
					/>
					<div style={{fontSize:"12px",margin:'19px 0 11px'}}>理赔支付</div>
					<Table
						bordered
						columns={payItemColumns}
						dataSource={this.props.adjustmentTabInfo[this.state.popBatchIndex]&&this.props.adjustmentTabInfo[this.state.popBatchIndex].payInfo||[]}
						style={{backgroundColor:'#fff'}}
						pagination={false}
					/>
					<Row style={{marginTop:'15px'}}>
						<Col span={2}>理算说明：</Col>
						<Col span={22}>{this.props.adjustmentTabInfo[this.state.popBatchIndex]&&this.props.adjustmentTabInfo[this.state.popBatchIndex].adjustmentRemark}</Col>
					</Row>
				</Modal>
				<div style={{margin:'12px 0 22px',display:this.props.currentStep=='closeCase'?'none':''}}>
					<Button onClick={this.toggleNewAdjustmentForm}>+新增</Button>
				</div>
				<div style={{
					backgroundColor:'#edf8e8',
					border:'1px solid #daf0d0',
					borderRadius:'4px',
					padding:'15px',
					position:'relative',
					display:this.state.newAdjustmentFormShow
				}}>
					<Icon type="close" style={{position:'absolute',top:'15px',right:'15px',cursor:'pointer'}} onClick={this.toggleNewAdjustmentForm}/>
					<div style={{fontSize:"14px",paddingBottom:'15px'}}>新增理算记录</div>
					<div>
						<div style={{fontSize:"12px",paddingBottom:'10px'}}>理算信息</div>
						<Table
							bordered
							columns={[...propertyItemColumns,{
								title: '操作',
								render: (text, record, index) =>(
									<div>
										<a onClick={()=>{this.showAdjustmentFormModal(index)}}>修改</a>
										<Popconfirm
											title="确定删除?"
											onConfirm={() => this.deleteNewAjustmentRecord(index)}
										>
										{' '}
											<a href="#">删除</a>
										</Popconfirm>
									</div>
								)
							}]}
							dataSource={this.state.newAjustmentRecord}
							style={{backgroundColor:'#fff'}}
							pagination={false}
						/>
						<div>
							<Button style={{margin:'10px 0 22px'}} onClick={()=>{this.showAdjustmentFormModal(-1)}}>+新增</Button>
						</div>
						<Modal
							title={~this.state.popAjustmentRecordIndex?"修改险种责任信息":"新增险种责任信息"}
							visible={this.state.ajustmentFormModalVisible}
							onOk={this.adjustmentFormModalOk}
							onCancel={this.hideAdjustmentFormModal}
						>
							<AjustmentModalForm
								ref={ref=>this.ajustmentModalForm=ref}
								policyNo={this.props.policyNo}
								policyCoverageInfo={this.props.policyCoverageInfo}
							/>
						</Modal>
					</div>
					<div style={{display:this.state.newAjustmentRecord.length?'':'none'}}>
						<div style={{fontSize:"12px",paddingBottom:'10px'}}>理赔支付</div>
						<Table
							bordered
							columns={[...payItemColumns,{
								title: '操作',
								render: (text, record, index) =>(
									<div>
										<a onClick={()=>{this.showPayFormModal(index)}}>修改 </a>
										<Popconfirm
											title="确定删除?"
											onConfirm={() => this.deletenewPayRecord(index)}
										>
											<a href="#">删除</a>
										</Popconfirm>
									</div>
								)
							}]}
							dataSource={this.state.newPayRecord}
							style={{backgroundColor:'#fff'}}
							pagination={false}
						/>
						<div style={{margin:'10px 0 22px'}}>
							<Button onClick={()=>{this.showPayFormModal(-1)}}>+新增</Button>
						</div>
						<Modal
							title={~this.state.popAjustmentRecordIndex?"修改支付":"新增支付"}
							visible={this.state.payFormModalVisible}
							onOk={this.payFormModalOk}
							onCancel={this.hidePayFormModal}
						>
							<div className="ct-detail-tabs">
								<Tabs type="card" activeKey={this.state.popPayTabIndex} onChange={this.payModalTabChange}>
									<Tabs.TabPane tab="银行支付" key="1" style={{paddingTop:'20px'}}>
										<PayModalTabForm ref={ref=>this.payModalTabForm1=ref} way="bank"/>
									</Tabs.TabPane>
									<Tabs.TabPane tab="支付宝" key="2" style={{paddingTop:'20px'}}>
										<PayModalTabForm ref={ref=>this.payModalTabForm2=ref}/>
									</Tabs.TabPane>
								</Tabs>
							</div>

						</Modal>
					</div>
					<Row style={{marginBottom:'15px'}}>
						<Col span={2}>理算说明：</Col>
						<Col span={22}>
							{
								this.props.form.getFieldDecorator('adjustmentRemark')(
									<Input
										placeholder="请输入备注"
										type="textarea"
										autosize={{ minRows: 5}}
									/>
								)
							}
						</Col>
					</Row>
					<Row>
						<Col span={2}></Col>
						<Col span={22}>
							<Button type="primary" onClick={this.submitNewAjustmentBatch} style={{marginRight:'8px'}}>提交</Button>
							<Button onClick={this.toggleNewAdjustmentForm}>取消</Button>
						</Col>
					</Row>
				</div>
			</div>
		)
	}
}


export default connect(state => {

	//对后端返回的数据格式化
	let adjustmentTabInfo=state.reportDetail.data.adjustmentTabInfo||[]
	state.reportDetail.data.policyInfo.policyCoverageInfo.forEach(v=>{
		if(!v.duties){
			v.duties=[{
				amt:v.amt,
				name:'N/A',
			}]
		}
		else if(typeof v.duties=='string'){
			v.duties=JSON.parse(v.duties)
		}
	})

	
	adjustmentTabInfo.forEach((v,i)=>{
		v.key=i
		v.adjustmentContent=v.adjustmentContent.map(vv=>state.reportDetail.data.policyInfo.policyCoverageInfo.find(vvv=>vvv.code===vv[0]).duties.find(vvv=>vvv.code===vv[1]).name)
		v.adjustmentInfo=v.adjustmentInfo||[]
		v.reviewStatus={
			'01':'待提交（初始状态）',
			'02':'待审核',
			'03':'审核中',
			'04':'审核通过',
			'05':'审核驳回',
		}[v.reviewStatus]
		v.fundStatus={
			'01':'待支付',
			'02':'支付中',
			'03':'已支付',
		}[v.fundStatus]
		v.adjustmentInfo.forEach((vv,ii)=>{
			vv.key=ii
			vv.deductibleRate='N/A'
			vv.deductible='N/A'
			if(vv.accountability){
				vv.accountability=state.reportDetail.data.policyInfo.policyCoverageInfo.find(vvv=>vvv.code==vv.insuranceClass).duties.find(vvv=>vvv.code==vv.accountability).name
			}
			else{
				vv.accountability='N/A'
			}
			vv.insuranceClass=state.reportDetail.data.policyInfo.policyCoverageInfo.find(vvv=>vvv.code==vv.insuranceClass).name
			if(vv.registerMoney===''){
				vv.registerMoney='N/A'
			}
		})
		v.adjustmentRemark=v.adjustmentRemark||'N/A'
		v.payInfo=v.payInfo||[]
		v.payInfo.forEach((vv,ii)=>{
			vv.key=ii
			vv.currency='人民币'
			vv.payType={
				'01':'赔款支出',
				'02':'律师费',
				'03':'公估费',
				'04':'查勘费',
				'05':'其它',
			}[vv.payType]
			vv.payWay={
				'01':'银行转账',
				'02':'支付宝',
			}[vv.payWay]
			if(vv.bank===''){
				vv.bank='N/A'
			}
		})
	})


    return {
		reportNo: state.reportDetail.data.policyInfo.reportNo,
		policyNo: state.reportDetail.data.policyInfo.policyNo,
		claimNo: state.reportDetail.data.policyInfo.claimNo,
		currentStep: state.reportDetail.status.currentStep,
		adjustmentTabInfo:adjustmentTabInfo,
		policyCoverageInfo:state.reportDetail.data.policyInfo.policyCoverageInfo,
		registerList:state.reportDetail.data.registerTabInfo.registerList,
    }
}, dispatch => {
	return {

	}
})(Form.create()(AdjustmentContent));

