import React from 'react';
import {Link} from 'react-router';
import {Row,Col,Select,DatePicker,Form,Button,Table} from 'antd';
import {connect} from 'react-redux';

class Salary extends React.Component {
	componentDidMount(){
		this.props.loadPerformance.call(this)
	}
	render(){
		return(
			<div>
				<div style={{fontWeight: 'bold', fontSize: '200%'}}>薪酬明细</div>
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
				<Table bordered pagination={false} columns={[
					{
						title: '工号',
						dataIndex: 'a',
						key: 'a'
					},
					{
						title: '姓名',
						dataIndex: 'b',
						key: 'b'
					},
					{
						title: '公司别',
						dataIndex: 'c',
						key: 'c'
					},
					{
						title: '发薪月',
						dataIndex: 'd',
						key: 'd'
					},
					{
						title: '职称',
						dataIndex: 'e',
						key: 'e'
					},
					{
						title: '基本工资',
						dataIndex: 'f',
						key: 'f'
					},
					{
						title: '岗位津贴',
						dataIndex: 'g',
						key: 'g',
					},
					{
						title: '通讯费',
						dataIndex: 'h',
						key: 'h',
					},
					{
						title: '交通费',
						dataIndex: 'i',
						key: 'i',
					},
					{
						title: '详细',
						dataIndex: 'j',
						key: 'j',
						render:()=><Link to='/salaryDetail'>详细</Link>
					},
				]} dataSource={this.props.dataSource}/>
			</div>
		)
	}
}

export default connect(
	state=>{
		return{
			dataSource:state.salaryDataSource
		}
	},
	dispatch=>{
		return{
			loadPerformance:function(){
				dispatch((dispatch)=>{
					if(!this.props.dataSource.length){
						fetch('http://localhost').then(()=>{
							dispatch({type:'setSalary'})
						})
					}
				})
			}
		}
	},
)(Salary)