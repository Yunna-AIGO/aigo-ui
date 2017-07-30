import React from 'react';
import {Row, Col,Select,DatePicker,Radio,Icon ,Form,Button,Table,Input,Spin} from 'antd';
import {connect} from 'react-redux';

class Performance extends React.Component {
	state={
		searchCollapse:'',
		tableLoading:this.props.dataSource.length?false:true,
	}
	componentDidMount(){
		this.props.loadPerformance.call(this)
	}
	toggleSearch=()=>{
		this.setState({
			searchCollapse:this.state.searchCollapse?'':'collapse'
		})
	}
	render() {
		return (
			<div>
				<div style={{fontWeight: 'bold', fontSize: '200%'}}>业绩查询</div>
				<style>
					.performance-search .ant-form-item{'{margin-bottom:5px}'}
					.performance-search.collapse>.ant-row{'{height:40px;overflow:hidden}'}
					.toggle-search:before{'{content:"收起搜索"}'}
					.performance-search.collapse .toggle-search:before{'{content:"展开搜索"}'}
					.toggle-search:after{'{content:"";display:inline-block;height:6px;width:6px;border-top:1px solid #108ee9;border-right:1px solid #108ee9;transform:rotate(-45deg);vertical-align:0.1em}'}
					.performance-search.collapse .toggle-search:after{'{transform:rotate(135deg)}'}
				</style>
				<Form style={{marginTop: 50}} className={"performance-search "+this.state.searchCollapse}>
					<Row gutter={10}>
						<Col span={8}>
							<Form.Item label="所属公司" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Select placeholder="请选择" size='small'>
									<Select.Option value="china">上海分公司</Select.Option>
									<Select.Option value="use">江苏分公司</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="部门" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Select placeholder="请选择" size='small'>
									<Select.Option value="china">上海分公司</Select.Option>
									<Select.Option value="use">江苏分公司</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="月份" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<DatePicker.MonthPicker placeholder="请选择" style={{width:'100%'}} size='small'/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="个人工号" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Input placeholder="请输入" size='small'/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="商品类别" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Select placeholder="请选择" size='small'>
									<Select.Option value="china">上海分公司</Select.Option>
									<Select.Option value="use">江苏分公司</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="商品细类别" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Select placeholder="请选择" size='small'>
									<Select.Option value="china">上海分公司</Select.Option>
									<Select.Option value="use">江苏分公司</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="保单号" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Input placeholder="请输入" size='small'/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="业务来源" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Select placeholder="请选择" size='small'>
									<Select.Option value="china">上海分公司</Select.Option>
									<Select.Option value="use">江苏分公司</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="渠道名称" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Select placeholder="请选择" size='small'>
									<Select.Option value="china">上海分公司</Select.Option>
									<Select.Option value="use">江苏分公司</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="渠道代码" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Input placeholder="请输入" size='small'/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="客户名称" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Input placeholder="请输入" size='small'/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="保费区间" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Row gutter={10}>
									<Col span={12}>
										<Input placeholder="请输入" size='small'/>
									</Col>
									<Col span={12}>
										<Input placeholder="请输入" size='small'/>
									</Col>
								</Row>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="商户类型" labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
								<Radio.Group style={{padding:'0 15px'}}>
									<Radio value={1}>A</Radio>
									<Radio value={2}>B</Radio>
								</Radio.Group>
							</Form.Item>
						</Col>
					</Row>
					<div style={{textAlign:'right',padding:'15px 0'}}>
						<a className="toggle-search" onClick={this.toggleSearch}>&nbsp;&nbsp;</a>
					</div>
					<div style={{textAlign:'right',marginBottom:'50px'}}>
						<Button type="primary" htmlType="submit" style={{marginRight:'15px'}}>搜索</Button>
						<Button onClick={()=>{location.href='http://nginx.org/download/nginx-1.11.10.zip'}} size='small'>下载excel</Button>
					</div>
				</Form>
				<Spin spinning={this.state.tableLoading} tip="获取数据中...">
					<Table pagination={{total:200}} onChange={(pagination)=>{console.log(pagination)}} bordered rowKey="id" columns={[
						{
							title: '团队代码',
							dataIndex: 'a',
						},
						{
							title: '团队中文名称',
							dataIndex: 'b',
						},
						{
							title: '人员工号',
							dataIndex: 'c',
						},
						{
							title: '人员姓名',
							dataIndex: 'd',
						},
						{
							title: '保批单号',
							dataIndex: 'e',
						},
						{
							title: '客户名称',
							dataIndex: 'f',
						},
						{
							title: '详情',
							dataIndex: 'g',
							render:()=><a>详情</a>
						},
					]} dataSource={this.props.dataSource}/>
				</Spin>
			</div>
		)
	}
}

export default connect(
	state=>{
		return{
			dataSource:state.taskDataSource
		}
	},
	dispatch=>{
		return{
			loadPerformance:function(){
				dispatch((dispatch)=>{
					if(!this.props.dataSource.length){
						fetch('http://localhost').then(()=>{
							setTimeout(()=>{
								dispatch({type:'setPerformance'})
								this.setState({tableLoading:false})
							},2222)
						})
					}
				})
			}
		}
	},
)(Performance)