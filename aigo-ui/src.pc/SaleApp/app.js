import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Footer from '../control/Footer'
import {Icon,Menu} from 'antd';
import '../layout/Default/index.less';
import '../control/Sidebar/index.less';

class SaleApp extends React.Component {
	render() {
		return (
			<div className="sale-system ant-layout-aside">
				<style>.sale-system .ant-layout-sider{'{position:fixed;top:0;left:0}'}</style>
				<aside className="ant-layout-sider">
					<div className="ant-layout-logo">
						<i className="cathay-logo"/>
						<h1><Link to='/home'>销管系统</Link></h1>
					</div>
					<Menu mode="inline" theme="dark" defaultOpenKeys={['1']} selectedKeys={[this.props.routes[1].path]}>
						<Menu.SubMenu key='1' title={<span><Icon type="aliwangwang-o" />菜单</span>}>
							<Menu.Item key='home'>
								<Link to='/home'> <Icon type="smile-o" /> 薪酬作业</Link>
							</Menu.Item>
							<Menu.Item key='performance'>
								<Link to='/performance'> <Icon type='smile-o'/> 业绩查询</Link>
							</Menu.Item>
							<Menu.Item key='salary'>
								<Link to='/salary'> <Icon type='smile-o'/> 薪酬明细</Link>
							</Menu.Item>
						</Menu.SubMenu>
					</Menu>
				</aside>
				<div className="ant-layout-main">
					<div className="ant-layout-container">
						<div className="ant-layout-content">
							{this.props.children}
						</div>
					</div>
					<Footer/>
				</div>
			</div>
		);
	}
}

export default SaleApp=connect(
	state=>{
		return{

		}
	},
	dispatch=>{
		return{

		}
	},
)(SaleApp);