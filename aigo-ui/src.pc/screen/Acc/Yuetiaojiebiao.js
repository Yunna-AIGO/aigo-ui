import React, { Component } from 'react';
import { Form, Input, Button, Table, Modal, Popconfirm, Spin, message, Menu, Dropdown, DatePicker } from 'antd';
import { Link } from 'react-router';
import queryString from "query-string";
import fetch from "cathay-fetch";
import './balanc.css';
import moment from 'moment';
import Currency from "cathay-currency";

class BalanceAdjustment extends Component{
	constructor(props){
		super(props);
		this.state={
			tableLoading:true,
			text:'查询模式',
			queryModeArr:[{"key":"1","itemText":"按天查询"},{"key":"2","itemText":"比较查询"},{"key":"3","itemText":"范围查询"}],
			inputAccount:'',
			insuranceNum:'',
			datePickerChange:'none',
			datePickerCompareChange:'none',
			rangeChange:'none',
			datePickerDate:'',
			datePickerCompareDate:'',
			rangeChangeDate:'',
			date:'',
		}		
	}


	componentDidMount(){
		let hash = location.hash.split('?')[1];
        let parsedQuery = queryString.parse(hash) || {};
        this.setState({inputAccount:parsedQuery.institutionAccountId});
      	this.queryMode({key:1});
      	let  date = new Date();
		date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()-1);
		//this.setState({date:date});
		let time;

		fetch('/api/v1/acc/balanceadjust/'+parsedQuery.institutionAccountId+'?mode=1&startDate='+date+'&endDate='+time,{
			method: 'get'
		}).then(res=>{
			console.log(res);
			//res ={"code":"200","bizCode":null,"message":null,"data":[{"id":15,"reconciliationDate":1490284800000,"prodNo":"BAE","institutionAccountId":"119","accBeforeAmount":300,"accAddAmount":100,"accReduceAmount":400,"accAfterAmount":200,"instiBeforeAmout":-300,"instiAddAmount":-100,"instiReduceAmount":-400,"instiAfterAmout":-200,"description":"火警"},{"id":17,"reconciliationDate":1490284800000,"prodNo":"EBT","institutionAccountId":"119","accBeforeAmount":300,"accAddAmount":100,"accReduceAmount":400,"accAfterAmount":200,"instiBeforeAmout":-300,"instiAddAmount":-100,"instiReduceAmount":-400,"instiAfterAmout":-200,"description":"火警火警"}]}
			res.data.forEach(function(v,i){v.key=i})
			this.setState({
				totalData:res.data,
				dataSource:res.data,
				//tableLoading:false,
			})
		})

		let res = {};
		res.data = [];
	    res.data.map((val,key)=>{
	    	val.key = (key+1);
	    	return val;
	    })
		this.setState({
			totalData:res.data,
			dataSource:res.data,
			tableLoading:false,
		})
	}

	queryMode(e){
		console.log(this.state.queryModeArr[e.key-1]);
		let itemText = this.state.queryModeArr[e.key-1].itemText;
	  	//message.info(`您已将险种切换至:${itemText}`);
	  	this.setState({text:itemText,insuranceNum:e.key});

	  	if(e.key==1){
	  		this.setState({datePickerChange:'inline-block',datePickerCompareChange:'none',rangeChange:'none'});
	  	}else if(e.key==2){
	  		this.setState({datePickerChange:'inline-block',datePickerCompareChange:'inline-block',rangeChange:'none'});
	  	}else{
	  		this.setState({datePickerChange:'none',datePickerCompareChange:'none',rangeChange:'inline-block'});
	  	}	
	}

	bthSearchClick(){
        let data = this.props.form.getFieldsValue();
		let insuranceNum = this.state.insuranceNum; //选择的模式
		let inputAccount = this.state.inputAccount; //账号
		let time;
		let time_time;
		if(insuranceNum==''){
			message.info(`请选择查询模式`);
			return;
		}

		if(insuranceNum==1){
			time = this.state.datePickerDate;
			if(time){
				//第一个自己的fetch
				fetch('/api/v1/acc/balanceadjust/'+data.inputAccount+'?mode='+insuranceNum+'&startDate='+time,{
					method: 'get'
				}).then(res=>{
					console.log(res);
					res.data.forEach(function(v,i){v.key=i})
					this.setState({
						totalData:res.data,
						dataSource:res.data,
						//tableLoading:false,
					})
				})
			}else{
				message.info(`请选择时间`);
			}
			return;

		}else if(insuranceNum==2){
			time_time = this.state.datePickerDate; //第二种模式,第一个框的时间
			time = this.state.datePickerCompareDate;//第二种模式,第二个框的时间

			//防止出现第一个框没数据的情况(此变动为二期)
			if(time_time==''){
				let  date = new Date();
				date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate()-1);
				time_time = date;
			}
			// if(time_time==''){
			// 	message.info(`请选择查询时间`);
			// 	return;
			// }

		}else if(insuranceNum==3){
			time = this.state.rangeChangeDate;

			//为了防止清空数组情况
			if(time[1]==''){
				message.info(`请选择查询时间`);
				return;
			}
			time_time = time[0];
			time = time[1];
		}
		

		if(time){
			console.log(time);
			console.log(time_time);
			//进入fetch请求(拿数据)？？？？？？？会出现点击之后(关闭按钮),值为空
			fetch('/api/v1/acc/balanceadjust/'+data.inputAccount+'?mode='+insuranceNum+'&startDate='+time_time+'&endDate='+time,{
				method: 'get'
			}).then(res=>{
				console.log(res);
				//res ={"code":"200","bizCode":null,"message":null,"data":[{"id":15,"reconciliationDate":1490284800000,"prodNo":"BAE","institutionAccountId":"119","accBeforeAmount":300,"accAddAmount":100,"accReduceAmount":400,"accAfterAmount":200,"instiBeforeAmout":-300,"instiAddAmount":-100,"instiReduceAmount":-400,"instiAfterAmout":-200,"description":"火警"},{"id":17,"reconciliationDate":1490284800000,"prodNo":"EBT","institutionAccountId":"119","accBeforeAmount":300,"accAddAmount":100,"accReduceAmount":400,"accAfterAmount":200,"instiBeforeAmout":-300,"instiAddAmount":-100,"instiReduceAmount":-400,"instiAfterAmout":-200,"description":"火警火警"}]}
				res.data.forEach(function(v,i){v.key=i})
				this.setState({
					totalData:res.data,
					dataSource:res.data,
					//tableLoading:false,
				})
			})
		}else{
			message.info(`请选择时间`);
		}
	}

	datePickerChange(date, dateString){
		console.log(date, dateString);
		this.setState({datePickerDate:dateString});
	}

	datePickerCompareChange(date, dateString){
		console.log(date, dateString);
		this.setState({datePickerCompareDate:dateString});
	}

	rangeChange(date, dateString){
		console.log(date, dateString);
		this.setState({rangeChangeDate:dateString});
	}


	render(){
		let	tableFieldsConfig = [
			{
				title: '企业记账余额',
				dataIndex: 'accBeforeAmount',
				render:(text,id)=>{
					if(id.accBeforeAmount==null){
						return <span style={{color:'red'}}>--</span>
					}else{
						return <span><Currency>{id.accBeforeAmount/100+''}</Currency></span>
					}
				}
			},
			{
				title: '加:银收,企未收',
				dataIndex: 'accAddAmount',
				render:(text,id)=>{
					if(id.accAddAmount==null){
						return <span style={{color:'red'}}>--</span>
					}else{
						return <span><Currency>{id.accAddAmount/100+''}</Currency></span>
					}
				}
			},
			{
				title: '减:银付,企未付',
				dataIndex: 'accReduceAmount',
				render:(text,id)=>{
					if(id.accReduceAmount==null){
						return <span style={{color:'red'}}>--</span>
					}else{
						return <span><Currency>{id.accReduceAmount/100+''}</Currency></span>
					}
				}
			},
			{
				title: '调节后余额',
				dataIndex: 'accAfterAmount',
				render:(text,id)=>{
					if(id.accAfterAmount!==null){
						if(id.accAfterAmount!==id.instiAfterAmout){
							return <span style={{color:'red',textDecoration:'underline'}}>{id.accAfterAmount}</span>
						}else{
							return <span><Currency>{id.accAfterAmount/100+''}</Currency></span>
						}
					}else{
						return <span style={{color:'red'}}>--</span>
					}
				}
			},
			{
				title: '时间',
				dataIndex: 'reconciliationDate',
				render:(text,id)=>{
					let date = new Date(text);
					let ymd = date.getFullYear()+'-'+(date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-'+(date.getDate()<10?'0'+date.getDate():date.getDate());
					return ymd;
				}
			},
			{
				title: '银行账单余额',
				dataIndex: 'instiBeforeAmout',
				render:(text,id)=>{
					if(id.instiBeforeAmout==null){
						return  <span style={{color:'red'}}>--</span>
					}else{
						return <span><Currency>{id.instiBeforeAmout/100+''}</Currency></span>
					}
				}
			},
			{
				title: '加:企收,银未收',
				dataIndex: 'instiAddAmount',
				render:(text,id)=>{
					if(id.instiAddAmount==null){
						return  <span style={{color:'red'}}>--</span>
					}else{
						return <span><Currency>{id.instiAddAmount/100+''}</Currency></span>
					}
				}
			},
			{
				title: '减:企付,银未付',
				dataIndex: 'instiReduceAmount',
				render:(text,id)=>{
					if(id.instiReduceAmount==null){
						return  <span style={{color:'red'}}>--</span>
					}else{
						return <span><Currency>{id.instiReduceAmount/100+''}</Currency></span>
					}
				}
			},
			{
				title: '调节后余额',
				dataIndex: 'instiAfterAmout',
				render:(text,id)=>{
					if(id.accAfterAmount!==null){
						if(id.accAfterAmount!==id.instiAfterAmout){
							return <span style={{color:'red',textDecoration:'underline'}}><Currency>{id.instiAfterAmout/100+''}</Currency></span>
						}else{
							return <span><Currency>{id.instiAfterAmout/100+''}</Currency></span>
						}
					}else{
						return <span style={{color:'red'}}>--</span>
					}
				}
			}
		];

		const { RangePicker } = DatePicker;
		const dateFormat = 'YYYY/MM/DD';
		let  date = new Date();
		date = date.getFullYear()+'/'+(date.getMonth()+1)+'/'+(date.getDate()-1);
		const menu = (
			<Menu onClick={this.queryMode.bind(this)}>
				{
					this.state.queryModeArr.map((val,index)=>{
						return <Menu.Item key={val.key}>{val.itemText}</Menu.Item>
					})
				}
		  	</Menu>
		);

		return(
			<div>
				<div>
					<Dropdown.Button  overlay={menu}>
				    	{this.state.text}
				    </Dropdown.Button>
				    <DatePicker onChange={this.datePickerChange.bind(this)} style={{marginLeft:40,display:this.state.datePickerChange}} defaultValue={moment(date, dateFormat)} />
				    <DatePicker onChange={this.datePickerCompareChange.bind(this)} style={{marginLeft:40,display:this.state.datePickerCompareChange}} />
				    <RangePicker onChange={this.rangeChange.bind(this)} style={{marginLeft:40,display:this.state.rangeChange}} />
				</div>
				<div className="example-input" style={{marginTop:20}}>
					<span>请输入账号:</span>
					{
						this.props.form.getFieldDecorator('inputAccount', {
			                initialValue: this.state.inputAccount,
			            })(<Input placeholder="请输入账户" style={{marginLeft:10}}/>)
					}
					<Button type="primary" onClick={this.bthSearchClick.bind(this)} style={{marginLeft:20}}>查询</Button>	
				</div>
				<div className="accBalanceAdjustmentTable" style={{marginTop:20}}>
					<div>
						<div style={{width:'50%',display:'inline-block',textAlign:'center',color:'#000',height:40,fontWeight:'600'}}>企业账单</div>
						<div style={{width:'50%',display:'inline-block',textAlign:'center',color:'#000',height:40,fontWeight:'600'}}>支付宝/银行账单</div>
					</div>
					<Spin spinning={this.state.tableLoading} tip="获取数据中...">
						<Table
							pagination={false}
							bordered
							columns={tableFieldsConfig}
							dataSource={this.state.dataSource}
						/>
					</Spin>
				</div>
			</div>
		)
	}
}
export default Form.create()(BalanceAdjustment);