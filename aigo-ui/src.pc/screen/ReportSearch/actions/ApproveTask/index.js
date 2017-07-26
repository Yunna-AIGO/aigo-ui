/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import {Modal,Form,Row,Col,Input,Button,Table,DatePicker,Select} from 'antd';
import {searchReportsByConditions} from '../../../../actions/report';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux"
import {Link} from 'react-router';

class ApproveTask extends React.Component {
    state={
        loading:false,
		dataSource: [],
		loadedPage:[],
		pageSize: 5,
    }
	componentDidMount(){
		this.loadTableData(this.props.searchCondition,this.props.page)
	}
    loadTableData=(values,page)=>{
		if(this.state.loadedPage[page-1]){
			return
		}
        this.setState({
            loading:true,
        })
        this.props.actions.searchReportsByConditions(values,(value)=>{
            if(value.code==400){
                Modal.error({
                    content: value.message,
                });
            }
            this.setState({
                loading:false,
            })
			this.state.loadedPage[page-1]=true
        },page)
    }
    handleSearch = (e) => {

        e.preventDefault();

        let values=this.props.form.getFieldsValue()
        if (values['reportPeriod'] && Object.prototype.toString.call(values['reportPeriod']) === "[object Array]") {
            values['reportPeriodStart'] = values['reportPeriod'][0].format('YYYY-MM-DD HH:mm:ss');
            values['reportPeriodEnd'] = values['reportPeriod'][1].format('YYYY-MM-DD HH:mm:ss');
            delete values.reportPeriod;
        }
        location.replace(
            location.hash.replace(/\?page=.*?(&|$)/,'?').replace(/&page=.*?(&|$)/,'&').replace(/\?condition=.*?(&|$)/,'?').replace(/&condition=.*?(&|$)/,'&').replace('?','?condition='+encodeURIComponent(JSON.stringify(values))+'&').replace(/&+$/,'')
        )
        location.reload()
    }
    handleReset = () => {
        this.props.form.resetFields();
        location.replace(
			location.hash.replace(/\?page=.*?(&|$)/,'?').replace(/&page=.*?(&|$)/,'&').replace(/\?condition=.*?(&|$)/,'?').replace(/&condition=.*?(&|$)/,'&').replace(/&+$/,'')
        )
        location.reload()
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
										this.props.form.getFieldDecorator('policyNo')(
											<Input placeholder='请输入'/>
										)
									}
								</Form.Item>
                            </Col>
                            <Col span={8}>
								<Form.Item label="报案人" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('claimNo')(
											<Input placeholder='请输入'/>
										)
									}
								</Form.Item>
                            </Col>
                            <Col span={8}>
								<Form.Item label="报案时间" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('reporter')(
											<DatePicker.RangePicker size="large"/>
										)
									}
								</Form.Item>
                            </Col>
                            <Col span={8}>
								<Form.Item label="审批人" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('operator')(
											<Input placeholder='请输入'/>
										)
									}
								</Form.Item>
                            </Col>
                            <Col span={8}>
								<Form.Item label="审批类型" labelCol={{span:6}} wrapperCol={{span:18}}>
									{
										this.props.form.getFieldDecorator('reportStatus')(
											<Select placeholder='请选择'>
												<Select.Option value="a">a</Select.Option>
												<Select.Option value="b">b</Select.Option>
											</Select>
										)
									}
								</Form.Item>
                            </Col>
                        </Row>
                        <Row className="formSearch">
                            <Col span={24} style={{textAlign: 'right', marginBottom: '30px'}}>
                                <Button type="primary" htmlType="submit">搜索</Button>
                                <Button style={{marginLeft: 8}} onClick={this.handleReset}>清除</Button>
                            </Col>
                        </Row>
                    </Form>
					<Table
						loading={this.state.loading}
						bordered
						dataSource={this.props.reportInfo.data}
						columns={[
							{
								title: '报案号',
								dataIndex: 'reportNo',
								key: 1,
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
								key: 2,
								render: (text, record) => (
									<div>
										<span>
											{record.policyNo ? record.policyNo : null}
										</span>
									</div>
								)
							},
							{
								title: '赔案号',
								key: 3,
								render: (text, record) => (
									<div>
										<span>
											{record.claimNo ? record.claimNo : null}
										</span>
									</div>
								)
							},
							{
								title: '审批类型',
								key: 4,
								render: (text, record) => (
									<div>
										<span>
											{record.policyHolder ? record.policyHolder : null}
										</span>
									</div>
								)
							},
							{
								title: '理算批次号',
								key: 5,
								render: (text, record) => (
									<div>
										<span>
											{ record.insured ? record.insured : null}
										</span>
									</div>
								)
							},
							{
								title: '处理人',
								key: 7,
								render: (text, record) => (
									<div>
										<span>
											{record.operator ? record.operator : null}
										</span>
									</div>
								)
							},
							{
								title: '最后操作日期',
								key: 8,
								render: (text, record) => (
									<div>
										<span>
											{record.operateTime ? record.operateTime : null}
										</span>
									</div>
								)
							},
							{
								title: '最后操作者',
								key: 9,
								render: (text, record) => (
									<div>
										<span>
											{record.lastOperator ? record.lastOperator : null}
										</span>
									</div>
								)
							},
							{
								title: '状态',
								key: 10,
								width: 77,
								render: (text, record) => (
									<div>
										<span style={{color:'#3acd3a'}}>
											{record.bizStatus ? record.bizStatus : null}
										</span>
									</div>
								)
							},
							{
								title: '操作',
								key: 11,
								width: 99,
								render: (text, record) =><Link to={record.bizStatus=='准予立案'?"/examine?reportNo="+record.reportNo:"/review/"+JSON.stringify(record)}>审批</Link>
							},
						]}
						pagination={{
							pageSize: this.state.pageSize,
							defaultCurrent:this.props.page,
						}}
						onChange={pagination=>{
							this.loadTableData(this.props.searchCondition,pagination.current)
							location.replace(
								location.hash.replace(/\?page=.*?(&|$)/,'?').replace(/&page=.*?(&|$)/,'&').replace('?','?page='+pagination.current+'&').replace(/&+$/,'')
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
		reportInfo: state.report,
    }
}, dispatch => {
    return {
        actions: bindActionCreators({searchReportsByConditions}, dispatch)
    }
})(Form.create()(ApproveTask));

