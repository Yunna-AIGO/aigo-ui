import React, { Component }  from 'react';
import { Form, Input, Tooltip , Button, Table, Modal, Popconfirm, Spin, message, Menu, Dropdown, Pagination, Switch, Icon } from 'antd';
import { Link } from 'react-router';
import queryString from "query-string";
import fetch from "cathay-fetch";
import Currency from "cathay-currency";

class AccDifference extends Component{
	constructor(props){
		super(props);
		this.state={
			tableLoading:true,
			currentPage:1,
			total:1,
			pageSize:10,
			pageLoaded:[],
			insuranceArr:[{"key":"1","itemText":"国泰产险"},{"key":"2","itemText":"中国人寿"},{"key":"3","itemText":"中国平安"}],
			text:'请选择险种',
			inputAccount:'',
			payAccount:'',
			statusArr:[],
			sysModifiedArr:[],
			timestamp:'',
			visible: false,
			mergeArr:[],
		}
	}

	componentDidMount(){
		let hash = location.hash.split('?')[1];
        let parsedQuery = queryString.parse(hash) || {};
        this.setState({inputAccount:parsedQuery.institutionAccountId});

		fetch('/api/v1/acc/billdiffer/queryByAccountId?pageNo=0&pageSize=10&accountid='+parsedQuery.institutionAccountId,{
			//'/api/v1/acc/billdiffer/queryByAccountId?accountid=110&pageNo=0&pageSize=10'
			method: 'get'
		}).then(res=>{
			// res.data.forEach((v,i)=>{v.key=i+this.state.pageSize*(this.state.currentPage-1)})
			//console.log(res.data);
			res.data.map((val,key)=>{
				val.key = (key+1);
				return val;
			})
			this.setState({
				dataSource:res.data,
				tableLoading:false,
			})
			// this.state.pageLoaded[1]=true
		})
		this.state.pageLoaded[1]=true;






		/*********这是假数据*********/
		
		// let res = {};
		// res.data=[
		// 	{"id":"123","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"1"},
		// 	{"id":"124","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"0"},
		// 	{"id":"125","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"1"},
		// 	{"id":"1","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"1"},
		// 	{"id":"13","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"0"},
		// 	{"id":"112323","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"1"},
		// 	{"id":"1213","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"0"},
		// 	{"id":"12993","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"0"},
		// 	{"id":"10","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"0"},
		// 	{"id":"123","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"0"},
		// 	{"id":"124","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"0"},
		// 	{"id":"125","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"0"},
		// 	{"id":"1","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"1"},
		// 	{"id":"13","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"1"},
		// 	{"id":"112323","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"1"},
		// 	{"id":"1213","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"0"},
		// 	{"id":"12993","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"1"},
		// 	{"id":"10","insBizNo":"123","payFlowId":"132","direction":"123","prodNo":"13","differType":"1"}
		// ];
		// this.setState({
		// 	dataSource:res.data,
		// 	tableLoading:false,
		// })
		






		fetch('/api/v1/acc/billdiffer/'+parsedQuery.institutionAccountId+'/count',{
			//'/api/v1/acc/billdiffer/110/count'
			method: 'get'
		}).then(res=>{
			//res.data=51;  ???????
			this.setState({
				//total:res.balanceadjustarr.length ????????????????????????
				total:res.data
			})
		})
	}

	tablePaginationChange(pagination){
		//let hash = location.hash.split('?')[1];
        //let parsedQuery = queryString.parse(hash) || {};

        let data = this.props.form.getFieldsValue();
		if(this.state.pageLoaded[pagination.current]){
			return this.setState({
				currentPage:pagination.current
			})
		}
		this.setState({
			tableLoading:true,
			currentPage:pagination.current
		})


		fetch('/api/v1/acc/billdiffer/queryByAccountId?accountid='+data.inputAccount+'&pageSize=10&pageNo='+(pagination.current-1),{
			//'/api/v1/acc/billdiffer/queryByAccountId?accountid=110'+'&pageSize=10&pageNo='+(pagination.current-1)
			method: 'get'
		}).then(res=>{
			//console.log(res.balanceadjustarr);
			res.data.forEach((v,i)=>{v.key=i+this.state.pageSize*(this.state.currentPage-1)})
			for(let i=this.state.pageSize*(pagination.current-1);i<this.state.pageSize*(pagination.current-1)+this.state.pageSize;i++){
				if(res.data[i-this.state.pageSize*(pagination.current-1)]){
					this.state.dataSource[i]=res.data[i-this.state.pageSize*(pagination.current-1)]
				}
			}
			this.setState({
				dataSource:this.state.dataSource,
				tableLoading:false,
			})
			//this.state.pageLoaded[pagination.current]=true
		})
	}

	handleMenuClick(e) {
		let itemText = this.state.insuranceArr[e.key-1].itemText;
	  	message.info(`您已将险种切换至:${itemText}`);
	  	this.setState({text:itemText,insuranceNum:e.key});
	}

	bthClick(){
		let data = this.props.form.getFieldsValue();
		let insuranceNum = this.state.insuranceNum;
		if(insuranceNum==1){
			insuranceNum='gtcx';
		}else if(insuranceNum==2){
			insuranceNum='zgrs';
		}else if(insuranceNum==3){
			insuranceNum='zgpa';
		}
		let copy = Object.assign({insuranceNum:insuranceNum,"pageNo":"0","pageSize":"10"},data)
		console.log(copy);

		console.log(data.payAccount);


		let getOnePageDataUrl= data.payAccount=="" 
		?
		'/api/v1/acc/billdiffer/queryByAccountId?pageNo=0&pageSize=10&accountid='+data.inputAccount
		:
		'/api/v1/acc/billdiffer/queryByAccountId?pageNo=0&pageSize=10&accountid='+data.inputAccount+'&payFlowId='+data.payAccount 


		//默认加载第一页(需不需要加流水号)
		fetch(getOnePageDataUrl,{
			//'/api/v1/acc/billdiffer/queryByAccountId?pageNo=0&pageSize=10&accountid='+data.inputAccount+'&payFlowId='+data.payAccount
			//'/api/v1/acc/billdiffer/queryByAccountId?accountid=110&pageNo=0&pageSize=10'
			method: 'get'
		}).then(res=>{
			// res.data.forEach((v,i)=>{v.key=i+this.state.pageSize*(this.state.currentPage-1)})
			res.data.map((val,key)=>{
				val.key = (key+1);
				return val;
			})
			this.setState({
				dataSource:res.data,
				tableLoading:false,
				currentPage:1
			})
		})
		//this.state.pageLoaded[1]=true;
		
		let countNumUrl = data.payAccount=="" 
		?
		'/api/v1/acc/billdiffer/'+data.inputAccount+'/count'
		:
		'/api/v1/acc/billdiffer/'+data.inputAccount+'/count?payFlowId='+data.payAccount

		//求总数(由账号去查)  
		fetch(countNumUrl,{
			//'/api/v1/acc/billdiffer/110/count'
			method: 'get'
		}).then(res=>{
			console.log(res.data);
			this.setState({
				total:res.data
			})
		})
		
	}

	btnBatchModification(){
		//批量修改
		let statusArr = this.state.statusArr;
		let sysModifiedArr = this.state.sysModifiedArr;
		if(statusArr.length==0 && sysModifiedArr.length==0){
			message.info(`请选中修改项!!!`);
			return;
		}

		this.setState({
	    	visible: true,
	    });


	    sysModifiedArr.reduce((result,item)=>{
		  	let matchItem=result.find(v=>v.id==item.id)
		  	if(matchItem){
				matchItem.differType=item.differType
			}else{
				result.push(item)
			}
			return result;
		},statusArr)
		let mergeStatusArr=[];
		mergeStatusArr = mergeStatusArr.concat(statusArr);
		console.log(mergeStatusArr);
		this.setState({mergeArr:mergeStatusArr})
	}


	handleOk(e){
	    this.setState({
	      visible: false,
	    });

	    let statusArr = this.state.statusArr;
		let sysModifiedArr = this.state.sysModifiedArr;
	    //下面是最简化的写法，负责需要1:先找到相同的元素 2:在由相同的元素跟数组1比较找到不同的，同理由相同的和数组2比较  3:合并
		sysModifiedArr.reduce((result,item)=>{
		  	let matchItem=result.find(v=>v.id==item.id)
		  	if(matchItem){
				matchItem.differType=item.differType
			}else{
				result.push(item)
			}
			return result;
		},statusArr)
		//console.log(statusArr);
		
		
		let mergeStatusArr=[];
		mergeStatusArr = mergeStatusArr.concat(statusArr);
		console.log(mergeStatusArr);

		//return;
		fetch('/api/v1/acc/billdiffer/update/',{
			method: 'put',
			body:JSON.stringify({
				billDifferUpdateInfos:mergeStatusArr
			})
		}).then(res=>{
			if(res.code==200){
				message.info(`当前更新成功:${res.data}条!!!更新失败${mergeStatusArr.length-res.data}条`);
				setTimeout(function(){
					window.location.reload();
				},3000)
			}
		})
	}

	handleCancel(e){
	    this.setState({
	      visible: false,
	    });
	}

	statusCheck(id,bool){
		let obj = {};
		obj.id = id.id;
		obj.status = bool ? 1 : 0;
		//obj.status = bool;   为了bool
		let statusArr = this.state.statusArr;
		//if(obj.status===false){	为了bool
		if(obj.status===0){
			console.log('这个是取消');
			for(let i = 0; i<statusArr.length;i++){	
				if(statusArr[i]){
					if(obj.id==statusArr[i].id){
						//删除这个元素	
						statusArr.splice(i,1);
					}
				}
			}			
		}else{
			statusArr.push(obj);	
		}
		this.setState({
			statusArr: statusArr
		});
	}

	sysModifiedCheck(id,bool){
		//debugger;
		//console.log(bool)
		let obj = {};
		obj.id = id.id;
		//obj.differType = bool;	为了bool
		obj.differType = bool ? 1: 0;
		let sysModifiedArr = this.state.sysModifiedArr;
		if(obj.differType===0){
		//if(obj.differType===false){ 为了bool
			for(let i = 0; i<sysModifiedArr.length;i++){
				if(sysModifiedArr[i]){
					if(obj.id==sysModifiedArr[i].id){
						//删除这个元素	
						sysModifiedArr.splice(i,1);
					}
				}
			}			
		}else{
			sysModifiedArr.push(obj);	
		}
		this.setState({
			sysModifiedArr: sysModifiedArr
		});

		//console.log(sysModifiedArr);
	}

	render(){
		const { getFieldProps, getFieldDecorator } = this.props.form;
		const { loading, selectedRowKeys } = this.state;
		// const rowSelection = {	selectedRowKeys, onChange: this.onSelectChange };
		const menu = (
			<Menu onClick={this.handleMenuClick.bind(this)}>
				{
					this.state.insuranceArr.map((val,index)=>{
						return <Menu.Item key={val.key}>{val.itemText}</Menu.Item>
					})
				}
		  	</Menu>
		);

		let dataSource = this.state.dataSource||[];
		let currentPage = this.state.currentPage;
		//console.log(currentPage);
		dataSource.map((val,index)=>{
			//由currentPage来判断？？？
			val.showId =index+1; 	
			return val;
		})
		const text = <span>开关打开表示更新</span>;
		const tableFieldsConfig = [
				{
					title: 'id',
					dataIndex: 'id',//showId
				},
				{title: '国泰业务单号',dataIndex: 'insBizNo',},
				{title: '支付流水号',dataIndex: 'payFlowId',},
				{title: '借贷方向',dataIndex: 'direction',},
				{title: '险种',dataIndex: 'prodNo',},
				{title: '财务金额',dataIndex: 'accDifferAmount',render:(text,id)=>{
				     return <Currency>{id.accDifferAmount/100+''}</Currency>
				},},
				{title: '机构金额',dataIndex: 'instiDifferAmount',render:(text,id)=>{
				     return <Currency>{id.instiDifferAmount/100+''}</Currency>
				},},
				{title: '差异原因',dataIndex: 'differReason',},
				{	
					title:'状态',
					dataIndex: 'status',
					render:(text,id)=>{
						let statusArr = this.state.statusArr;		
						let checked = false;
						for(let i=0;i<statusArr.length;i++){
							if(statusArr[i]){
								//console.log('true'+i);
								//console.log(id);
								if(statusArr[i].id == id.id  && statusArr[i].status==1){
									//console.log(statusArr[i].id);
									checked = true;
								}
							}
						}
						return <div>&nbsp;&nbsp;<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} onChange={ this.statusCheck.bind(this,id)} checked={checked}/></div>;	
					}
				},
				{
					title:'从本地出账',
					dataIndex: 'differType',
					render:(text,id)=>{
						let sysModifiedArr = this.state.sysModifiedArr;
						let dataSource = this.state.dataSource;
						let checked = false;

						//debugger;

						if(id.differType==1){
							return <div>&nbsp;&nbsp;<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />}   checked={true}/></div>;
						}else{
							for(let i=0;i<sysModifiedArr.length;i++){
								
								if(sysModifiedArr[i]){
									
									if(sysModifiedArr[i].id == id.id){
										
										checked = true;
										//return <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} onChange={ this.sysModifiedCheck.bind(this,localId)} checked />;
									}
								}
							}
							return <div>&nbsp;&nbsp;<Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="cross" />} onChange={ this.sysModifiedCheck.bind(this,id) }  checked={checked}/></div>;
						}
					}
				},
			]

		return(
			<div>
				<div className="example-input" style={{marginBottom:20}}>	
					<span>请输入账号:</span>
					{
						this.props.form.getFieldDecorator('inputAccount', {
			                initialValue: this.state.inputAccount,
			            })(<Input placeholder="请输入账户" style={{marginLeft:10}}/>)
					}	
					{
						this.props.form.getFieldDecorator('payAccount', {
			                initialValue: this.state.payAccount,
			            })(<Input placeholder="支付流水号" style={{marginLeft:20}}/>)
					}
					<Dropdown.Button  overlay={menu} style={{marginLeft:20,display:'none'}}>
				    	{this.state.text}
				    </Dropdown.Button>
				    <Button type="primary" onClick={this.bthClick.bind(this)} style={{marginLeft:20}}>查询</Button>
				    <div style={{display:'inline-block',color:'red',fontSize:'16px',marginLeft:20}}>该账户差异账的总数为: {this.state.total}</div>
				</div>

				<Button type="primary" onClick={this.btnBatchModification.bind(this)} style={{marginBottom:20}}>批量修改</Button>
		        <Modal title="更新确认" visible={this.state.visible}
		        	onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
		        >
			        <p>请确认是否修改{this.state.mergeArr.length}条数据</p>
			        <p>
			        {
			        	this.state.mergeArr.map((val,index)=>{
			        		return <span key={index}>id为:{val.id}&nbsp;&nbsp;&nbsp;&nbsp;</span>
			        	})
			        }
			        </p>
		        </Modal>

				<Spin spinning={this.state.tableLoading} tip="获取数据中...">
					<Table
						pagination={{total:this.state.total,pageSize:this.state.pageSize,current:this.state.currentPage}}
						onChange={this.tablePaginationChange.bind(this)}
						bordered
						columns={tableFieldsConfig}
						dataSource={this.state.dataSource}
					/>
				</Spin>
			</div>
		)
	}
}
export default Form.create()(AccDifference)
