import React from 'react';
import {connect} from 'react-redux';
import {Row,Col,Select,DatePicker,Form,Button,Table} from 'antd';

class Home extends React.Component{
	componentDidMount(){
		this.props.loadPerformance.call(this)
	}
	render(){
		return(
			<div>
				<div style={{fontWeight: 'bold', fontSize: '200%'}}>薪酬作业</div>
				<Form style={{marginTop: 50}}>
					<Row gutter={40}>
						<Col span={8}>
							<Form.Item label="所属公司" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
								<Select placeholder="请选择">
									<Select.Option value="china">上海分公司</Select.Option>
									<Select.Option value="use">江苏分公司</Select.Option>
								</Select>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Form.Item label="月份" labelCol={{ span: 5 }} wrapperCol={{ span: 19 }}>
								<DatePicker.MonthPicker style={{width:'100%'}}/>
							</Form.Item>
						</Col>
						<Col span={8}>
							<Button type="primary" htmlType="submit">查询</Button>
						</Col>
					</Row>
				</Form>
				<Table bordered columns={[
					{
						title: '所属公司',
						dataIndex: 'a',
						key: 'a'
					},
					{
						title: '作业批次',
						dataIndex: 'b',
						key: 'b'
					},
					{
						title: '创建者',
						dataIndex: 'c',
						key: 'c'
					},
					{
						title: '最后操作日期',
						dataIndex: 'd',
						key: 'd'
					},
					{
						title: '当前处理人',
						dataIndex: 'e',
						key: 'e'
					},
					{
						title: '状态',
						dataIndex: 'f',
						key: 'f'
					},
					{
						title: '操作',
						dataIndex: 'g',
						key: 'g',
					},
				]} dataSource={this.props.dataSource}/>
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
							dispatch({type:'setPerformance'})
						})
					}
				})
			}
		}
	},
)(Home)