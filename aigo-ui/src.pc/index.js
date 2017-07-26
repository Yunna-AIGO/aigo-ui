import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';
import configureStore from './store/configureStore';
import {useRouterHistory} from 'react-router';

import App from './layout/Default';
import Home from './screen/Home';
import ReportSearch from './screen/ReportSearch';
import PolicySearch from './screen/PolicySearch';
import PolicyInfo from './screen/PolicyInfo';
import ReportDetail from './screen/ReportDetail'
import ClaimRegistrationInfo from './screen/ReportDetail/operations/ClaimRegistrationInfo';
import ResultPage from './screen/ResultPage';
import ReportEnter from './screen/ReportEnter';
import Pay from './screen/Pay';
import Review from './screen/Pay/Review';
import AccReconciliation from './screen/Acc';
import AccDifference from './screen/Acc/Chayibiao';
import AccSum from './screen/Acc/AccSum';
import BalanceAdjustment from './screen/Acc/Yuetiaojiebiao';
import AccBillCompare from './screen/Acc/AccBillCompare';
import ConfigEncrypt from './screen/tool/ConfigEncrypt';
import Examine from './screen/Examine';
    
const store = configureStore();


import {updateNavPath} from './actions/menu'

const buildActiveKeyAndKeypath = () => {
    hashHistory.listen((info) => {

        let activeKey = '';
        let keyPath = [];

        // caculate activeKey and tmp itemsMap

        let _items = store.getState().menu.items.slice();

        let url = info.pathname + info.search;

        let itemsMap = {};

        if (~url.indexOf('/find|')) {
            let parts = url.split('/find');
            url = parts[0];
            keyPath.unshift({name: '详情', key: "connectNav", url: url})
        }

        while (_items.length) {

            let item = _items.shift();

            itemsMap[item.key] = item;
            
            if (item.url == url) {
                activeKey = item.key?String(item.key):'';
            }

            if (item.children) {
                _items = _items.concat(item.children.slice(0));
            }
        }

        // calculate keyPath
        if (activeKey) {
            let item = itemsMap[activeKey];

            keyPath.unshift(item)

            while (item.parentKey) {
                item = itemsMap[item.parentKey];
                keyPath.unshift(item);
            }
        }
        // fixed path of home
        keyPath.unshift({name: '首页', icon: 'home', url: '/home', key: 'home'})

        store.dispatch(updateNavPath(activeKey, keyPath));

    });
}

buildActiveKeyAndKeypath();


ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}>
                <IndexRedirect to="report-search"/>
                <Route path="home" component={Home}/>
                <Route path="report-search" component={ReportSearch}/>
                <Route path="policy-search" component={PolicySearch}/>
                <Route path="policy-info/:policyInfo" component={PolicyInfo}/>
                <Route path="report-detail/:record" component={ReportDetail}/>
                <Route path="register-detail" component={ClaimRegistrationInfo}/>
                <Route path="result-page/:message" component={ResultPage}/>
                <Route path="report-enter" component={ReportEnter}/>
                <Route path="examine" component={Examine}/>
                <Route path="pay" component={Pay}/>
                <Route path="review/:record" component={Review}/>

                /** 会计系统路由开始 */
                <Route path="acc-dailysum" component={AccSum}/>
                /** 账实对账 */
                <Route path="acc-reconciliation" component={AccReconciliation}/>
                /** 账实差异表 */
                <Route path="acc-difference" component={AccDifference}/>
                /** 业财对账 */
                <Route path="acc-billCompare" component={AccBillCompare}/>
                /** 余额调节表 */
                <Route path="balance-adjustment" component={BalanceAdjustment}/>
                /** 会计系统路由结束 */

                /** 工具路由开始 */
                /** 配置项加密 */
                <Route path="config-encrypted" component={ConfigEncrypt}/>
                /** 工具路由结束 */
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
