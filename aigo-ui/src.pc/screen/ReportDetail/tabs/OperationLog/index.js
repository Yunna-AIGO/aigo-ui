import React, { Component } from 'react';
import {Tabs, Button, Row, Col, Steps, Popover } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

const Step = Steps.Step;


class OperationLog extends Component {
    constructor(props){
        super(props);
    }

    render() {
        const logsTabInfo = this.props.logsTabInfo;
        const customDot = (logsTabInfo, { title, description }) => (
            <Popover content={<span>标题: {title} 描述: {description}</span>}>
                {logsTabInfo}
            </Popover>
        );
        return (
            <div style={{marginTop:20}}>
                <Steps progressDot={customDot} current={logsTabInfo.length-2}>
                    {
                        logsTabInfo.map((val,index)=>{
                            return <Step title={val.title} description={val.description} key={index}/>
                        })
                    }
                </Steps>
            </div>
        );
    }
};

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators({}, dispatch)
    }
}
function mapStateToProps(state){   //采用合并对象？？？？？？？？？？？？？？？？？？？？？？  
    return{
        logsTabInfo:state.examine.data.logsTabInfo ? 
            state.examine.data.logsTabInfo 
            :
            [
                {"title":"1","description":"国泰产险"},
                {"title":"2","description":"国泰产险信息中心"}
            ]
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(OperationLog);