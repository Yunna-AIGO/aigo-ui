import React from 'react';
import {Row, Col,Select,DatePicker,Radio,Icon ,Form,Button,Table,Input,Spin,Modal,Tabs} from 'antd';
import {connect} from 'react-redux';
import {
	fetchReportByReportNo
} from '../../actions/reportDetail';
import {bindActionCreators} from "redux";
import BasicInfo from '../ReportDetail/BasicInfo'
import tabs from '../ReportDetail/tabs';
import fetch from "cathay-fetch";

class Review extends React.Component {
	state={
		loading:true,
	}
	tabMap=tabs.reduce((tabMap,item) => {
		tabMap[item.code] = item;
		return tabMap
	},{})
	componentDidMount() {
		let record = JSON.parse(this.props.params.record);
		this.props.actions.fetchReportByReportNo(record.reportNo, record.policyNo ? record.policyNo : null, record.actionId,()=>{
			this.setState({
				loading:false,
			})
		});
	}
	render(){
		return (
			<Spin spinning={this.state.loading} tip="获取数据中...">
				<div style={{fontWeight: 'bold', fontSize: '200%'}}>赔案审批</div>
				<BasicInfo record={this.props.params.record}/>
				<Tabs type="card" defaultActiveKey={tabs[0].code}>
					{
						this.props.reportDetail.tabs.map((key) => {
							let tabConfig = this.tabMap[key];
							let Tab = tabConfig['Component'];

							if (Tab) {
								return <Tabs.TabPane tab={tabConfig.label} key={key}>
									{React.createElement(Tab, {}, null)}
								</Tabs.TabPane>
							}
						})
					}
				</Tabs>
				<Row style={{marginBottom:'15px',marginTop:'15px',paddingTop:'15px',borderTop:'1px solid #eee'}}>
					<Col span={2}>理算说明：</Col>
					<Col span={22}>
						{
							this.props.form.getFieldDecorator('remark')(
								<Input
									placeholder="请输入备注"
									type="textarea"
									autosize={{ minRows: 5}}
								/>
							)
						}
					</Col>
				</Row>
				<div>
					<Button type="primary" style={{marginRight:'15px'}} onClick={()=>{
						fetch('/',{method: 'get'})
						.then(res=>{
							Modal.info({content:'通过了'+this.props.form.getFieldValue('remark')})
						})
					}}>审批通过</Button>
					<Button onClick={()=>{
						fetch('/',{method: 'get'})
						.then(res=>{
							Modal.info({content:'驳回了'+this.props.form.getFieldValue('remark')})
						})
					}}>审核驳回</Button>
				</div>
			</Spin>
		)
	}
}

export default connect(
	state=>{
		return {
			reportDetail: state.reportDetail
		}
	},
	dispatch=>{
		return{
			actions: bindActionCreators({
				fetchReportByReportNo
			}, dispatch)
		}
	},
)(Form.create()(Review))