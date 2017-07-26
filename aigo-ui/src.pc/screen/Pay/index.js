import React from 'react';
import {Row, Col,Select,DatePicker,Radio,Icon ,Form,Button,Table,Input,Modal,Alert} from 'antd';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import fetch from "cathay-fetch";

class Pay extends React.Component {
	state={
		tableLoading:false,
		tableData:[],
		pageSize:5,
		totalRows:0,
		currentPage:1,
		loadedPage:[],
		selectedRows:[],
	}
	componentDidMount(){
		this.props.loadTableData.call(this,1)
	}
	render(){
		return (
			<div>
				<div style={{fontWeight: 'bold', fontSize: '200%'}}>赔款支付</div>
				<Form style={{marginTop: 50}}>
					<Row gutter={10}>
						<Col span={8}>
							<Form.Item label="赔案号" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								{
									this.props.form.getFieldDecorator('赔案号')(
										<Input placeholder="请输入"/>
									)
								}
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="保单号" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								{
									this.props.form.getFieldDecorator('保单号')(
										<Input placeholder="请输入"/>
									)
								}
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="创建时间" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								{this.props.form.getFieldDecorator('创建时间')(
									<DatePicker.RangePicker/>
								)}
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="状态" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								{
									this.props.form.getFieldDecorator('状态')(
										<Select placeholder="请选择">
											<Select.Option value="a">a</Select.Option>
											<Select.Option value="b">b</Select.Option>
										</Select>
									)
								}
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="支付类型" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								{
									this.props.form.getFieldDecorator('支付类型')(
										<Select placeholder="请选择">
											<Select.Option value="a">a</Select.Option>
											<Select.Option value="b">b</Select.Option>
										</Select>
									)
								}
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="收款人姓名" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								{
									this.props.form.getFieldDecorator('收款人姓名')(
										<Input placeholder="请输入"/>
									)
								}
							</Form.Item>
						</Col>
					</Row>
					<div style={{textAlign:'right',marginBottom:'50px'}}>
						<Button onClick={this.props.reloadTableData.bind(this)} type="primary" style={{marginRight:'15px'}}>搜索</Button>
						<Button onClick={()=>{
							this.props.form.resetFields()
							this.props.reloadTableData.call(this)
						}}>清除</Button>
					</div>
				</Form>
				<div>共搜索到 {this.state.totalRows} 条数据</div>
				<div style={{marginTop:'10px',marginBottom:'8px'}}><Button onClick={()=>{Modal.info({content:'生成了'+JSON.stringify(this.state.selectedRows)})}} style={{marginRight:'8px'}}>生成盘片</Button><Button onClick={()=>{Modal.info({content:'支付了'+JSON.stringify(this.state.selectedRows)})}}>确认支付</Button></div>
				<Alert message={'已选择 '+this.state.selectedRows.length+' 项数据。'} showIcon/>
				<Table
					loading={this.state.tableLoading}
					pagination={{
						total:this.state.totalRows,
						pageSize:this.state.pageSize,
						current:this.state.currentPage,
					}}
					onChange={(pagination)=>{
						this.props.loadTableData.call(this,pagination.current)
					}}
					bordered
					columns={[
						{
							title: '报案号',
							dataIndex: 'a',
							render: text=><Link to='/report-detail/{"reportNo":"B000002017032200008127","reporter":"叶锐1","reportTime":"2014-11-01 00:02:00","policyNo":"S117NL0TB00000207557369","claimNo":null,"operateTime":"2017-03-22 16:18:56","operator":"叶锐","operateStatus":null,"lastOperator":null,"insured":"王三","policyHolder":"王二","effectiveTime":"2017-02-27 00:00:00","expireTime":"2018-02-26 23:59:59","bizType":"BT","bizStatus":"准予立案","extendInfos":null,"key":0,"actionId":"ACTION_R11","source":"reportSource"}'>{text}</Link>,
						},
						{
							title: '保单号',
							dataIndex: 'b',
						},
						{
							title: '收款人姓名',
							dataIndex: 'c',
						},
						{
							title: '支付类型',
							dataIndex: 'd',
						},
						{
							title: '收款人户名',
							dataIndex: 'e',
						},
						{
							title: '收款人开户行',
							dataIndex: 'f',
						},
						{
							title: '收款人账户',
							dataIndex: 'g',
						},
						{
							title: '付款金额',
							dataIndex: 'h',
						},
						{
							title: '创建日期',
							dataIndex: 'i',
						},
						{
							title: '状态',
							dataIndex: 'j',
						},
					]}
					dataSource={this.state.tableData}
					rowSelection={{
						onChange:(selectedRowKeys,selectedRows)=>{
							this.setState({
								selectedRows:selectedRows,
								selectedRowKeys:selectedRowKeys,
							})
						},
						selectedRowKeys:this.state.selectedRowKeys,
					}}
				/>
			</div>
		)
	}
}

export default connect(
	state=>{
		return{
			tableData:[]
		}
	},
	dispatch=>{
		return{
			loadTableData:function(pageIndex){
				if(this.state.loadedPage[pageIndex-1]){
					return this.setState({
						currentPage:pageIndex
					})
				}
				this.setState({
					currentPage:pageIndex,
					tableLoading:true,
				})
				fetch('/payTableData?pageSize='+this.state.pageSize+'&currentPage='+pageIndex,{
					method: 'get'
				}).then(res=>{
					res.data.forEach((v,i)=>{
						v.key=(pageIndex-1)*this.state.pageSize+i
						this.state.tableData[(this.state.currentPage-1)*this.state.pageSize+i]=v
					})
					this.state.loadedPage[pageIndex-1]=true
					this.setState({
						tableLoading:false,
						tableData:this.state.tableData,
						totalRows:res.total,
					})
				})
			},
			reloadTableData:function(){
				this.setState({
					tableLoading:true,
					selectedRowKeys:[],
				})
				fetch('/payTableData?pageSize='+this.state.pageSize+'&currentPage=1&'+JSON.stringify(this.props.form.getFieldsValue()),{
					method: 'get'
				}).then(res=>{
					this.state.loadedPage=[true]
					res.data.forEach((v,i)=>{
						v.key=i
					})
					this.setState({
						currentPage:1,
						tableLoading:false,
						tableData:res.data,
						totalRows:res.total,
					})
				})
			},
		}
	},
)(Form.create()(Pay))