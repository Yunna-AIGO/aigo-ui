import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {Router,Route,IndexRedirect,hashHistory,Link} from 'react-router';
import storeState from './saleStore'

import SaleApp from './app'

import Home from './page/Home'
import Performance from './page/Performance'
import PerformanceDetail from './page/PerformanceDetail'
import Salary from './page/Salary'
import SalaryDetail from './page/SalaryDetail'

const store=window.store = createStore((state=storeState,action)=>{
	switch(action.type){
		case 'setPerformance':
			return Object.assign({},state,{
				taskDataSource:[
					{
						"a": "上海分公司",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "审核通过",
						"g": <div><a>薪酬明细</a></div>,
					},
					{
						"a": "江苏分公司",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "未启动",
						"g": <div><a>启动任务</a></div>,
					},
					{
						"a": "上海分公司",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "待提交",
						"g": <div><a>薪酬明细</a> <Link to="/detail">提交薪酬</Link> <a>重启任务</a></div>,
					},
					{
						"a": "江苏分公司",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "待审核",
						"g": <div><a>薪酬明细</a> <a>审核薪酬</a> <a>重启任务</a></div>,
					},
					{
						"a": "上海分公司",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "计算中",
						"g": '',
					},
					{
						"a": "江苏分公司",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "计算失败",
						"g": <div><a>启动任务</a></div>,
					},
				].map(function(v,i){
					v.id=i
					return v
				})
			})
		case 'setMonthDataSource':
			return Object.assign({},state,{
				monthDataSource:[
					{
						"a": "本月",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "审核通过",
						"g": "审核通过",
						"h": "审核通过",
						"i": "审核通过",
						"j": '审核通过',
						"key": "1"
					},
					{
						"a": "上月",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "未启动",
						"g": "审核通过",
						"h": "审核通过",
						"i": "审核通过",
						"j": '审核通过',
						"key": "2"
					},
				]
			})
		case 'setSalary':
			return Object.assign({},state,{
				salaryDataSource:[
					{
						"a": "本月",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "审核通过",
						"g": "审核通过",
						"h": "审核通过",
						"i": "审核通过",
						"j": '审核通过',
						"key": "1"
					},
					{
						"a": "上月",
						"b": "2016年12月",
						"c": "Superadmin",
						"d": "2016-12-28",
						"e": "小王",
						"f": "未启动",
						"g": "审核通过",
						"h": "审核通过",
						"i": "审核通过",
						"j": '审核通过',
						"key": "2"
					},
				]
			})
	}
	return state
},applyMiddleware(thunkMiddleware));

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			<Route path="/" component={SaleApp}>
				<IndexRedirect to="home"/>
				<Route path="home" component={Home}/>
				<Route path="performance" component={Performance}/>
				<Route path="detail" component={PerformanceDetail}/>
				<Route path="salary" component={Salary}/>
				<Route path="salaryDetail" component={SalaryDetail}/>
			</Route>
		</Router>
	</Provider>,
	document.getElementById('root')
);
