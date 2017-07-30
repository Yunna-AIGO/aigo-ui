import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, IndexRedirect, hashHistory} from 'react-router';

import configureStore from './store/configureStore';

import App from './layout/Default';
import Home from './screen/Home';
import ReportList from './screen/ReportList';
import ReportDetail from './screen/ReportDetail';

import { useRouterHistory } from 'react-router'
import outdatedbrowser from "../common/outdatedbrowser/outdatedbrowser";

const store = configureStore();


import {  updateNavPath } from './actions/menu'

const buildActiveKeyAndKeypath = ()=> {


    hashHistory.listen((info)=> {

        let state = store.getState();
        let items = state.menu.items;
        let activeKey = '';
        let keyPath = [];

        // caculate activeKey and tmp itemsMap

        let _items = items.slice();

        let url = info.pathname + info.search;
        let itemsMap = {};

        if (~url.indexOf('/find|')) {
            let parts = url.split('/find');
            url = parts[0];
            keyPath.unshift({name: '详情', key:"connectNav", url: url})
        }

        while (_items.length) {
            let item = _items.shift();
            itemsMap[item.key] = item;

            if (item.url == url) {
                activeKey = item.key;
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
            <Route path="/">
                <IndexRedirect to="home"/>
                <Route component={App}>
                    <Route path="home" component={Home}/>
                    <Route path="report-list/:menuCode" component={ReportList}/>
                    <Route path="report-list/:menuCode/find|detail/:reportCode" component={ReportDetail}/>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
