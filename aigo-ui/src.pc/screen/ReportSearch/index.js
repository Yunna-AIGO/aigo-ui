/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import Title from '../../control/Title';
import "./index.css";
import  ApproveTask from "./actions/ApproveTask";
import  ReportSearch from "./actions/ReportSearch";
import { Tabs } from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from "redux";
export default class extends React.Component {

	tabChange=(index)=>{
		location.replace(
			location.hash.split('?')[0]+'?tab='+index
		)
	}

    render() {
        return (

            <div>
                <Title title="赔案查询" style={{fontWeight: 'bold', fontSize: '200%'}}/>
                <Tabs
					onChange={this.tabChange}
					activeKey={this.props.location.query.tab||'0'}
					type="card"
					style={{marginTop:'35px'}}
					className="tabs-content-style"
				>
					{
						[
							{name:'全部',content:<ReportSearch searchCondition={this.props.location.query.condition?JSON.parse(decodeURIComponent(this.props.location.query.condition)):{}} page={+this.props.location.query.page||1}/>},
						].map((item,index) => (
							<Tabs.TabPane tab={item.name} key={index} className="tabs-tabPane" >
								{item.content}
							</Tabs.TabPane>
						))
					
					}
                </Tabs>
            </div>
        );
    }
}

// 为了理赔中台一期上线(做出影藏2个Tab的操作，勿删)
// {name:'我的任务',content:<ReportSearch searchCondition={this.props.location.query.condition?JSON.parse(decodeURIComponent(this.props.location.query.condition)):{}} page={+this.props.location.query.page||1}/>},
// {name:'审批任务',content:<ApproveTask searchCondition={this.props.location.query.condition?JSON.parse(decodeURIComponent(this.props.location.query.condition)):{}} page={+this.props.location.query.page||1}/>}