import React from 'react';
import { Spin,Row, Col,Steps,Modal ,Breadcrumb ,Form,Button,Table,Input } from 'antd';
import {Link} from 'react-router';
import {connect} from 'react-redux';

class PerformanceDetail extends React.Component {
	state={
		inputModalVisible:false,
		monthLoading:true,
		performanceLoading:true,
	}
	componentDidMount(){
		this.props.loadPerformance.call(this)
		this.props.loadMonthDataSource.call(this)
	}
	popInput=()=>{
		this.setState({
			inputModalVisible:true
		})
	}
	inputModalOK=()=>{
		this.setState({
			inputModalVisible:false
		})
	}
	inputModalCancel=()=>{
		this.setState({
			inputModalVisible:false
		})
	}
	render(){
		return(
			<div>
				<Breadcrumb style={{marginBottom:'30px'}}>
					<Breadcrumb.Item><Link to="/performance">薪酬作业</Link></Breadcrumb.Item>
					<Breadcrumb.Item>XX公司X月薪酬作业</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{fontWeight: 'bold', fontSize: '200%'}}>XX公司X月薪酬作业</div>
				<style>.sale-detail.ant-steps{'{margin:40px 0}'}</style>
				<Steps current={1} className="sale-detail">
					<Steps.Step title="待提交" description="Step1" />
					<Steps.Step title="待审核" description="Step2" />
					<Steps.Step title="审核通过" description="Step3" />
				</Steps>
				<div style={{marginBottom:'20px'}}>
					<span style={{fontWeight:'bold'}}>薪酬明细表</span> <a>查看</a> <Button style={{marginLeft:'5px'}} size='small' onClick={()=>{location.href='http://nginx.org/download/nginx-1.11.10.zip'}}>下载</Button> <span style={{fontWeight:'bold',marginLeft:'50px'}}>基础数据表</span> <Button style={{marginLeft:'5px'}} size='small' onClick={()=>{location.href='http://nginx.org/download/nginx-1.11.10.zip'}}>下载</Button>
				</div>
				<div style={{fontSize:'16px',padding:'20px 0 10px',borderTop:'1px solid #EBEBEB'}}>作业信息</div>
				<Row style={{height:'30px'}}>
					<Col span={12}><span style={{fontWeight:'bold'}}>新建人员：</span>小张 <span style={{fontWeight:'bold',paddingLeft:'20px'}}>新建时间：</span>2015-09-09 20:00</Col>
					<Col span={12}><span style={{fontWeight:'bold'}}>最后操作人员：</span>小张 <span style={{fontWeight:'bold',paddingLeft:'20px'}}>操作时间：</span>2015-09-09 20:00</Col>
				</Row>
				<Spin spinning={this.state.monthLoading} tip="获取数据中...">
					<Table bordered pagination={false} columns={[
						{
							title: '',
							dataIndex: 'a',
							key: 'a'
						},
						{
							title: '发放人数',
							dataIndex: 'b',
							key: 'b'
						},
						{
							title: '试用期人数',
							dataIndex: 'c',
							key: 'c'
						},
						{
							title: '保障薪人数',
							dataIndex: 'd',
							key: 'd'
						},
						{
							title: '应发总额',
							dataIndex: 'e',
							key: 'e'
						},
						{
							title: '最高薪资',
							dataIndex: 'f',
							key: 'f'
						},
						{
							title: '最低薪资',
							dataIndex: 'g',
							key: 'g'
						},
						{
							title: '平均',
							dataIndex: 'h',
							key: 'h'
						},
						{
							title: '直销奖金',
							dataIndex: 'i',
							key: 'i'
						},
						{
							title: '销售人力成本(不含直销及五险一金)',
							dataIndex: 'j',
							key: 'j',
						},
					]} dataSource={this.props.monthDataSource}/>
				</Spin>
				<div style={{fontSize:'16px',padding:'20px 0 10px',borderTop:'1px solid #EBEBEB'}}>调整记录</div>
				<Spin spinning={this.state.performanceLoading} tip="获取数据中...">
					<Table bordered pagination={false} columns={[
						{
							title: '序号',
							dataIndex: 'a',
							key: 'a'
						},
						{
							title: '姓名',
							dataIndex: 'b',
							key: 'b'
						},
						{
							title: '工号',
							dataIndex: 'c',
							key: 'c'
						},
						{
							title: '绩效奖金扣补',
							dataIndex: 'd',
							key: 'd'
						},
						{
							title: '直销奖金扣补',
							dataIndex: 'e',
							key: 'e'
						},
						{
							title: '其他扣补',
							dataIndex: 'f',
							key: 'f'
						},
						{
							title: '扣补合计',
							dataIndex: 'g',
							key: 'g',
							render:()=><a>详情</a>
						},
						{
							title: '扣补说明',
							dataIndex: 'h',
							key: 'h',
							render:()=><a>详情</a>
						},
						{
							title: '状态',
							dataIndex: 'i',
							key: 'i',
							render:()=><a>详情</a>
						},
						{
							title: '操作',
							dataIndex: 'j',
							key: 'j',
							render:()=><a>详情</a>
						},
					]} dataSource={this.props.dataSource}/>
				</Spin>
				<div style={{margin:'10px 0px 22px'}}>
					<Button onClick={this.popInput}>+新增</Button>
				</div>
				<div style={{textAlign:'center'}}>
					<Button type="primary">提交审批</Button>
				</div>
				<Modal visible={this.state.inputModalVisible} onOk={this.inputModalOk} onCancel={this.inputModalCancel}>
					<Form style={{marginTop: 50}}>
						<Form.Item label="工号" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
							<Input placeholder="请输入"/>
						</Form.Item>
						<Form.Item label="人员姓名" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
							<Input placeholder="请输入"/>
						</Form.Item>
						<Form.Item label="绩效奖金扣补" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
							<Input placeholder="请输入"/>
						</Form.Item>
						<Form.Item label="直销奖金扣补" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
							<Input placeholder="请输入"/>
						</Form.Item>
						<Form.Item label="其他扣补" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
							<Input placeholder="请输入"/>
						</Form.Item>
						<Form.Item label="扣补合计" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
							11111
						</Form.Item>
						<Form.Item label="扣补说明" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
							<Input placeholder="请输入备注" type="textarea" autosize={{ minRows: 3}} />
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
}

export default connect(
	state=>{
		return{
			dataSource:state.taskDataSource,
			monthDataSource:state.monthDataSource,
		}
	},
	dispatch=>{
		return{
			loadMonthDataSource:function(){
				dispatch((dispatch)=>{
					fetch('http://localhost').then(()=>{
						setTimeout(()=>{
							dispatch({type:'setMonthDataSource'})
							this.setState({monthLoading:false})
						},2222)
					})
				})
			},
			loadPerformance:function(){
				dispatch((dispatch)=>{
					fetch('http://localhost').then(()=>{
						setTimeout(()=>{
							dispatch({type:'setPerformance'})
							this.setState({performanceLoading:false})
						},2222)
					})
				})
			},
		}
	},
)(PerformanceDetail)