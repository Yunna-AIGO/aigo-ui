import React from 'react';
import {Form,Input,Button,Table,Modal,Popconfirm,Radio,Select} from 'antd';

export default Form.create()(
	class extends React.Component{
		constructor(props){
			super(props)
			this.state={
				tableData:props.initialTableData,
				tableFieldsConfig:props.tableFields,
				popFormConfig:props.popForm,
			}
			this.showModal=this.showModal.bind(this)
			this.modalOnOk=this.modalOnOk.bind(this)
			this.modalOnCancel=this.modalOnCancel.bind(this)
			this.deleteTableRow=this.deleteTableRow.bind(this)
		}
		showModal(index){
			this.state.popFormConfig.forEach(v=>v.hide=0)
			if(~index){
				this.props.form.setFieldsValue(this.state.popFormConfig.reduce((values,formField)=>{
					if(formField.type!='text'){
						values[formField.value]=this.state.tableData[index][formField.value]
					}
					if(formField.options){
						let option=formField.options.find(v=>v.value==this.state.tableData[index][formField.value])
						if(option&&option.form){
							option.form.forEach((v,i)=>{
								this.state.popFormConfig[i].hide=!v
								if(!v){
									values[this.state.popFormConfig[i].value]=undefined
								}
							})
						}
					}
					return values
				},{}))
			}
			else{
				this.props.form.resetFields()
			}
			this.setState({
				modalVisible:true,
				popIndex:index,
			})
		}
		modalOnOk(){
			this.props.form.validateFields((err,values)=>{
				if(!err||Object.keys(err).every(errFieldName=>this.state.popFormConfig.find(v=>v.value==errFieldName).hide)){
					values.key=this.state.tableData.length
					if(~this.state.popIndex){
						this.state.popFormConfig.forEach(v=>{
							if(v.type!='text'){
								this.state.tableData[this.state.popIndex][v.value]=values[v.value]
							}
						})
					}
					this.setState({
						modalVisible:false,
						tableData:~this.state.popIndex?this.state.tableData:this.state.tableData.concat([values]),
					},()=>{
						this.props.onTableDataUpdate&&this.props.onTableDataUpdate(this.state.tableData)
					})
				}
			})
		}
		modalOnCancel(){
			this.setState({
				modalVisible:false,
			})
		}
		deleteTableRow(position){
			this.setState({
				tableData:this.state.tableData.filter((v,i)=>{
					return i!=position
				}),
			},()=>{
				this.props.onTableDataUpdate&&this.props.onTableDataUpdate(this.state.tableData)
			})
		}
		render(){
			return(
				<div>
					<div>{this.props.title}</div>
					<Table
						bordered
						columns={[...this.state.tableFieldsConfig,{
							title: '操作',
							render: (text, record, index) => (
								<div>
									<a onClick={()=>{this.showModal(index)}}>修改 </a>
									<Popconfirm
										title="确定删除?"
										onConfirm={() => this.deleteTableRow(index)}
									>
										<a href="#">删除</a>
									</Popconfirm>
								</div>
							)
						}]}
						dataSource={this.state.tableData}
						pagination={this.props.pagination}
					/>
					<div>
						<Button onClick={()=>{this.showModal(-1)}}>+新增</Button>
					</div>
					<Modal
						visible={this.state.modalVisible}
						onOk={this.modalOnOk}
						onCancel={this.modalOnCancel}
					>
						<Form>
							{this.state.popFormConfig.map((v,i)=>{
								return(
									<Form.Item
										style={{display:v.hide?'none':''}}
										key={i}
										label={this.state.tableFieldsConfig.find(tableField=>tableField.dataIndex===v.value).title}
										labelCol={{span:5}}
										wrapperCol={{span:14}}
									>
										{
											this.props.form.getFieldDecorator(v.value,{
												rules:[{required:v.required,message:v.type=='select'||v.type=='radio'?'请选择':'请输入'}]
											})((()=>{
												switch(v.type){
													case 'select':
														return(
															<Select placeholder="请选择">
																{v.options.map((v,i)=><Select.Option value={v.value} key={i}>{v.text}</Select.Option>)}
															</Select>
														)
													case 'radio':
														return(
															<Radio.Group onChange={e=>{
																let hideList=v.options.find(v=>v.value===e.target.value).form
																if(hideList){
																	hideList.forEach((v,i)=>{
																		this.state.popFormConfig[i].hide=!v
																	})
																}
																else{
																	this.state.popFormConfig.forEach(v=>v.hide=0)
																}
																this.setState({
																	popFormConfig:this.state.popFormConfig
																})
															}}>
																{v.options.map((v,i)=><Radio value={v.value} key={i}>{v.text}</Radio>)}
															</Radio.Group>
														)
													case 'text':
														return(
															<span>{this.state.tableData[this.state.popIndex]&&this.state.tableData[this.state.popIndex][v.value]}</span>
														)
													default:
														return<Input placeholder="请输入"/>
												}
											})())
										}
									</Form.Item>
								)
							})}
						</Form>
					</Modal>
				</div>
			)
		}
	}
)