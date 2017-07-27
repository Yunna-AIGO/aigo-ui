import React, { Component }  from 'react';
import { Form, Input, Button, Table, Modal, Popconfirm, Spin, AutoComplete, Row, Col, Radio, Select, message, Menu, Dropdown, Icon, Pagination } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from "redux";
import { fetchAccReconciliation } from '../../actions/reconciliation';
import Currency from "cathay-currency";

class AccReconciliation extends Component{
	constructor(props){
		super(props);
		this.state={
			tableLoading:false,
			text:'请选择险种',
			statusText:'请选择状态',
			insuranceArr:[
			 	{"key":"1","itemText":"全部"},
				{"key":"2","itemText":"账户安全险一分钱"},
				{"key":"3","itemText":"冬季暖心意外险"},
				{"key":"4","itemText":"春节返乡在家安全保"},
				{"key":"5","itemText":"防骗险"},
				{"key":"6","itemText":"饿了么(平台责任险)"},
				{"key":"7","itemText":"河狸家(职业责任险)"},
				{"key":"8","itemText":"饿了么(骑手意外伤害险)"},
				{"key":"9","itemText":"饿了么(非机动车盗抢险)"},
				{"key":"10","itemText":"食品安全险"},
				{"key":"11","itemText":"银行卡安全险"},
				// {"key":"11","itemText":"全部"},
			],
			statusArr:[
				{"key":"-1","itemText":"全部"},
				{"key":"0","itemText":"非常健康"},
				{"key":"1","itemText":"一般"},
				{"key":"2","itemText":"不健康"},
				{"key":"3","itemText":"很不健康"},
				{"key":"4","itemText":"非常不健康"},
			],
			num:'',
			insuranceNum:'',
		};
	}

	componentDidMount(){
		this.props.accActions.fetchAccReconciliation();
	}    

	handleStatusClick(e) {
		//console.log(e.key);
		//let itemText = this.state.statusArr[e.key].itemText;
	  	//message.info(`您已将状态切换至:${itemText}`);
		//this.setState({statusText:this.state.statusArr[e.key].itemText,num:e.key});

		//-1,0,1,2,3,4  ->   0,-1,-2,-3,-4,-5
		if(~e.key){ 
			let arrKey = ~~e.key+1;
			this.setState({statusText:this.state.statusArr[arrKey].itemText,num:e.key});
		}else{
			this.setState({statusText:'全部',num:e.key});
		}
	}

	handleMenuClick(e) {
		let itemText = this.state.insuranceArr[e.key-1].itemText;
	  	message.info(`您已将险种切换至:${itemText}`);
	  	this.setState({text:itemText,insuranceNum:e.key});
	}

	bthClick(){
		/**********映射保险名称与代号之间的关系********/
		// {"name":"BAE","nameDescription":"账户安全险一分钱"},
		// {"name":"FAE","nameDescription":"冬季暖心意外险(春节红包)"},
		// {"name":"FAF","nameDescription":"春节返乡在家安全保(春节红包)"},
		// {"name":"EBT","nameDescription":"防骗险"},
		// {"name":"EBU","nameDescription":"饿了么(平台责任险)"},
		// {"name":"EBV","nameDescription":"河狸家(职业责任险)"},
		// {"name":"FAG","nameDescription":"饿了么(骑手意外伤害险)"},
		// {"name":"BAI","nameDescription":"饿了么(非机动车盗抢险)"},
		// {"name":"EBX","nameDescription":"食品安全险"},
		// {"name":"EBW","nameDescription":"银行卡安全险"},
		

		let insuranceNum = this.state.insuranceNum;
		if(insuranceNum==2){
			insuranceNum='BAE';
		}else if(insuranceNum==3){
			insuranceNum='FAE';
		}else if(insuranceNum==4){
			insuranceNum='FAF';
		}else if(insuranceNum==5){
			insuranceNum='EBT';
		}else if(insuranceNum==6){
			insuranceNum='EBU';
		}else if(insuranceNum==7){
			insuranceNum='EBV';
		}else if(insuranceNum==8){
			insuranceNum='FAG';
		}else if(insuranceNum==9){
			insuranceNum='BAI';
		}else if(insuranceNum==10){
			insuranceNum='EBX';
		}else if(insuranceNum==11){
			insuranceNum='EBW';
		}
		let key = this.state.num;
		let accReconciliationArr = this.props.accReconciliation.duizhang;
		let filtersStatusArr = [];
		if(insuranceNum!=='' && key!==''){
			for(let i = 0; i<accReconciliationArr.length; i++){
				for(let k=0;k<accReconciliationArr[i].prodNoList.length;k++){
					if(accReconciliationArr[i].status == key && accReconciliationArr[i].prodNoList[k] == insuranceNum){
						filtersStatusArr.push(accReconciliationArr[i]);
					}

					if(accReconciliationArr[i].status == key && insuranceNum==1 ){
						filtersStatusArr.push(accReconciliationArr[i]);
					}

					if(key==-1 && accReconciliationArr[i].prodNoList[k] == insuranceNum){
						filtersStatusArr.push(accReconciliationArr[i]);
					}

					if(insuranceNum==1 && key==-1){
						filtersStatusArr.push(accReconciliationArr[i]);
					}
				}
			}
		}else if(insuranceNum!=='' && key==''){
			console.log(accReconciliationArr);
			for(let i = 0; i<accReconciliationArr.length; i++){
				for(let k=0;k<accReconciliationArr[i].prodNoList.length;k++){
					if(accReconciliationArr[i].prodNoList[k] == insuranceNum){
						filtersStatusArr.push(accReconciliationArr[i]);
					}

					if(insuranceNum==1){
						filtersStatusArr.push(accReconciliationArr[i]);
					}
				}
			}
		}else if(insuranceNum=='' && key!==''){
			for(let i = 0; i<accReconciliationArr.length; i++){
				if(accReconciliationArr[i].status == key){
					filtersStatusArr.push(accReconciliationArr[i]);
				}
				//debugger;
				if(key==-1){
					filtersStatusArr.push(accReconciliationArr[i]);
				}
			}
		}else{
			this.props.accReconciliation.data = accReconciliationArr;
			return;
		}
		this.props.accReconciliation.data = filtersStatusArr;
		this.setState({num:key});
	}

	// confirm(e) {
	// 	console.log(e);
	//   	message.success('Click on Yes');
	// }

	// cancel(e) {
	//   	console.log(e);
	//   	message.error('Click on No');
	// }

	render(){
		let columns = [
			{
				title: '账号',
				dataIndex: 'institutionAccountId',
			},
			{
				title: '险种',
				dataIndex: 'prodNoList',
				render:(text,record)=>(
					<div>
					{	
						InsuranceNameArr.map((val,index)=>{
							for(let i=0;i<record.prodNoList.length;i++){
								if(record.prodNoList[i]==val.name){
									return 	<Link key={index} style={{whiteSpace:'pre'}}>{val.nameDescription}</Link>
								}
							}	
						})

					}
					</div>
				),
			},
			{
				title: '金额',
				dataIndex: 'instiAmount',
				render:(text,record)=>{
				     return <Currency>{record.instiAmount/100+''}</Currency>
				},
			},
			{
				title: '状态',
				dataIndex: 'status',
				render:(text,record)=>(
					<div>
					{			
						arrHelth.map((val,index)=>{
							if(record.status==index){
								return 	<Link key={index} style={{color:val.healthColor}} title={record.statusDescription}>{val.healthSituation}</Link>
							}
						})
					}
					</div>
				),
			},
			{
				title: '状态描述',
				dataIndex: 'statusDescription',
				render:(text,record)=>{
					return (
						<div className="acc">
							<Popconfirm title={record.statusDescription}  okText="关闭" cancelText=" ">
								<div title={record.statusDescription} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',maxWidth:200}}> {record.statusDescription} </div>
							</Popconfirm>
						</div>)
						
				}
			},
			{
				title: '操作',
				render: (text,record)=>(
					<div>
						<Link to={'/balance-adjustment?institutionAccountId='+record.institutionAccountId} key={1} >查明细(余额调节表)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </Link>
						<Link to={'/acc-difference?institutionAccountId='+record.institutionAccountId} key={2} >查对账差异(差异表) </Link >
					</div>
				),
			},
		];
		let arrHelth = [
				{"healthColor":"green","healthSituation":"非常健康"},
				{"healthColor":"#00A854","healthSituation":"一般"},
				{"healthColor":"blue","healthSituation":"健康"},
				{"healthColor":"#F5317F","healthSituation":"很不健康"},
				{"healthColor":"red","healthSituation":"非常不健康"}
		];
		let	InsuranceNameArr = [
				{"name":"BAE","nameDescription":"账户安全险一分钱\u0020\u0020\u0020\u0020"},
				{"name":"FAE","nameDescription":"冬季暖心意外险(春节红包)\u0020\u0020\u0020\u0020"},
				{"name":"FAF","nameDescription":"春节返乡在家安全保(春节红包)\u0020\u0020\u0020\u0020"},
				{"name":"EBT","nameDescription":"防骗险\u0020\u0020\u0020\u0020"},
				{"name":"EBU","nameDescription":"饿了么(平台责任险)\u0020\u0020\u0020\u0020"},
				{"name":"EBV","nameDescription":"河狸家(职业责任险) \u0020\u0020\u0020\u0020"},
				{"name":"FAG","nameDescription":"饿了么(骑手意外伤害险)\u0020\u0020\u0020\u0020"},
				{"name":"BAI","nameDescription":"饿了么(非机动车盗抢险)\u0020\u0020\u0020\u0020"},
				{"name":"EBX","nameDescription":"食品安全险\u0020\u0020\u0020\u0020"},
				{"name":"EBW","nameDescription":"银行卡安全险\u0020\u0020\u0020\u0020"},
		];


		let accReconciliation = this.props.accReconciliation.data||[];

		// accReconciliation=[
		// 	{id:11,institutionAccountId:'1231',prodNoList:['BAE','EBV'],instiAmount:'12321',status:'2',statusDescription:'sawwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwd'},
		// 	{id:11,institutionAccountId:'1231',prodNoList:['EBT','FAF'],instiAmount:'12321',status:'3',statusDescription:'s11111111111111111111111111111111111111111ad'},
		// 	{id:11,institutionAccountId:'1231',prodNoList:['EBX','EBT'],instiAmount:'12321',status:'0',statusDescription:'sa2222222222222222222222222222222222222222222d'},
		// 	{id:11,institutionAccountId:'1231',prodNoList:['EBW'],instiAmount:'12321',status:'4',statusDescription:'s6666666666666666666666666666666666666666666666666ad'},
		// ];

		accReconciliation.map((val,key)=>{
			val.key = (key+1);
		});

		const menu = (
			<Menu onClick={this.handleMenuClick.bind(this)}>
				{
					this.state.insuranceArr.map((val,index)=>{
						return <Menu.Item key={val.key}>{val.itemText}</Menu.Item>
					})
				}
		  	</Menu>
		);

		const statusMenu = (
			<Menu onClick={this.handleStatusClick.bind(this)}>
				{
					this.state.statusArr.map((val,index)=>{
						return <Menu.Item key={val.key}>{val.itemText}</Menu.Item>
					})
				}
		  	</Menu>
		);

		return(
			<div>
				<div style={{marginBottom:40}}>
				    <Dropdown.Button  overlay={menu}>
				    	{this.state.text}
				    </Dropdown.Button>
				    <Dropdown.Button  overlay={statusMenu} style={{margin:40}}>
				    	{this.state.statusText}
				    </Dropdown.Button>
				    <Button type="primary" onClick={this.bthClick.bind(this)}>确定筛选</Button>
				</div>


				<Spin spinning={this.state.tableLoading} tip="获取数据中...">
					<Table  bordered columns={columns} dataSource={accReconciliation} />
				</Spin>
			</div>
		)
	}
}


function mapDispatchToProps(dispatch){
    return {
        accActions:bindActionCreators({fetchAccReconciliation},dispatch)
    }
}
function mapStateToProps(state){
    return{
        accReconciliation:state.accReconciliation,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AccReconciliation);