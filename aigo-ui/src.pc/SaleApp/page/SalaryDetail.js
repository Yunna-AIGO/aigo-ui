import React from 'react';
import {Link} from 'react-router';
import {Row,Col,Breadcrumb} from 'antd';

export default class SalaryDetail extends React.Component {
	render(){
		return(
			<div>
				<Breadcrumb style={{marginBottom:'30px'}}>
					<Breadcrumb.Item><Link to="/salary">薪酬明细</Link></Breadcrumb.Item>
					<Breadcrumb.Item>xxx薪酬明细</Breadcrumb.Item>
				</Breadcrumb>
				<div style={{fontWeight: 'bold', fontSize: '200%'}}>薪酬明细</div>
				<Row style={{marginTop:'50px',borderTop:'1px solid #EBEBEB',paddingTop:'15px'}}>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>姓名：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>工号：</Col>
						<Col span={18}>asdf</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>发薪月：</Col>
						<Col span={18}>qwer</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>职称：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>岗位津贴：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>交通费：</Col>
						<Col span={18}>asdf</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>实发个人绩效：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>实发团队/营业部绩效：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>累计酮酸绩效奖金：</Col>
						<Col span={18}>888</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>直销佣金：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>最低工资：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>应发工资：</Col>
						<Col span={18}>222</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>扣补合计：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>修订时间：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>绩效奖金扣补：</Col>
						<Col span={18}>asdf</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>直销奖金扣补：</Col>
						<Col span={18}>lll</Col>
					</Col>
					<Col span={12} style={{marginBottom:'15px'}}>
						<Col span={6} style={{fontWeight:'bold'}}>扣补说明：</Col>
						<Col span={18}>大叔的哈苏</Col>
					</Col>
				</Row>
			</div>
		)
	}
}