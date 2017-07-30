import React,{Component} from 'react';
import './index.css';
import {Tabs, Button} from 'antd';
import {Row, Col} from 'antd';
const TabPane = Tabs.TabPane;
import Title from '../../control/Title';
import BasicInfo from './module/BasicInfo';
import ClientInfo from './module/ClientInfo';
import {fetchPolicyDetailByPolicyNo,fetchClientInfoByPolicyNo} from '../../actions/policyDetail';
import InsuredProject from './module/InsuredProject';
import queryString from "query-string";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

const actionMaps = {
    "BasicInfo": BasicInfo,
    "ClientInfo": ClientInfo,
    "InsuredProject": InsuredProject
};

class Policy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ActionForm: BasicInfo
        }
    }

    componentDidMount(){
        //console.log('this.props.params',this.props.params);
        let dataInfo = this.props.params.policyInfo;
        //console.log(dataInfo);

        if (~dataInfo.indexOf("reportDetail")){
            dataInfo = JSON.parse(dataInfo);
            let policyNo = dataInfo.policyNo;
            let reportNo = dataInfo.reportNo;

            this.props.policyActions.fetchClientInfoByPolicyNo(policyNo,reportNo);
        }else{
            this.props.policyActions.fetchPolicyDetailByPolicyNo(dataInfo);
        }
    }

    tabState = (key) => {

        var actionName = "BasicInfo";

        switch (key) {
            case '0':
                actionName = "BasicInfo";
                break;
            case '1':
                actionName = "ClientInfo";
                break;
            case '2':
                actionName = "InsuredProject";
                break;
        }
        let ActionForm = actionMaps[actionName];
        this.setState({
            ActionForm: ActionForm
        });

    };

    _renderTabForm() {
        let policyInfo=this.props.policyDetail;
      
        return React.createElement(this.state.ActionForm, {
            data:policyInfo,
            customerInfo:this.props.data && this.props.data.customerInfo?this.props.data.customerInfo:{},
            duties:this.props.data.duties
        },null);
    }

    _renderTabForm1() {
        const tab = ['基本信息', '客户信息', '承保项目'];
        return tab.map((item, index) => {
            return <TabPane tab={item} key={index}>{this._renderTabForm()}</TabPane>
        })
    }


    _renderTitle = () => {
        return <Title title="保单信息" style={{fontWeight: 'bold', fontSize: '200%', position:'relative',top:'-10px'}}/>
    }


    // _renderBack = () => {
    //     return <Row>
    //         <Col span={11}></Col>
    //         <Col span={4}>
    //             <Button type="primary" value="default" onClick={this.return.bind(this)} className="wrap-handle">返回</Button>
    //         </Col>
    //         <Col span={9}></Col>
    //     </Row>
    // }

    // return() {
    //     // let policyInfo=JSON.parse(this.props.params.policyInfo);
    //     // let record = {};
    //     // record.policyNo = policyInfo.policyNo;
    //     // record.reportNo = policyInfo.reportNo;
    //     // record.actionId = "ACTION_R20";
    //     // window.history.go(-1);
    //     //window.location.href = "#/report-detail/"+ JSON.stringify(record);


    //     let params = this.props.params.policyInfo;
    //     if (~params.indexOf("reportDetail")){
    //         let policyInfo=JSON.parse(params);
    //         let record = {};
    //         record.policyNo = policyInfo.policyNo;
    //         record.reportNo = policyInfo.reportNo;
    //         record.actionId = "ACTION_R20";
    //         window.history.go(-1);
    //     }else{
    //         window.history.go(-1);
    //     }
    // }

    render() {
        return (
            <div className="card-container">
                {this._renderTitle()}
                <Tabs onChange={this.tabState} type="card">
                    {
                        this._renderTabForm1()
                    }
                </Tabs>
            </div>
        );
    }
};
function mapDispatchToProps(dispatch){
    return{
        policyActions:bindActionCreators({fetchPolicyDetailByPolicyNo,fetchClientInfoByPolicyNo},dispatch)
    }
}
function mapStateToProps(state){
    return{
        policyDetail:state.policyDetail,
        data:state.policyDetail.data?state.policyDetail.data:{}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Policy);


