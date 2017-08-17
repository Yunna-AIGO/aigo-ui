/**
 * Copyright (c) 2017-present, Liu Jinyong
 * All rights reserved.
 *
 * https://github.com/huanxsd/MeiTuan  
 * @flow
 */

//import liraries
/*PureComponent是Component的升级版,自带diff render
详见http://www.cnblogs.com/Unknw/p/6431375.html*/
import React, { PureComponent } from 'react'
//顶栏
import { StatusBar } from 'react-native'
//导航 详见:http://blog.csdn.net/u013718120/article/details/72357698
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
//颜色变量
import color from './widget/color'
//工具方法
import { screen, system, tool } from './common'
//底栏模块
import TabBarItem from './widget/TabBarItem'

//首页场景
import HomeScene from './scene/Home/HomeScene'
//
import OrderScene from './scene/Order/OrderScene'
import NearbyScene from './scene/Nearby/NearbyScene'
import MineScene from './scene/Mine/MineScene'

//子场景
import WebScene from './widget/WebScene'
import GroupPurchaseScene from './scene/GroupPurchase/GroupPurchaseScene'

const lightContentScenes = ['Home', 'Mine']

//获取routeName
function getCurrentRouteName(navigationState) {
    if (!navigationState) {
        return null;
    }
    const route = navigationState.routes[navigationState.index];
    // dive into nested navigators
    if (route.routes) {
        return getCurrentRouteName(route);
    }
    return route.routeName;
}

// create a component
class RootScene extends PureComponent {
    constructor() {
        super()

        //StatusBar.setBarStyle('light-content')
    }

    render() {
        return (
            <Navigator
                onNavigationStateChange={
                    (prevState, currentState) => {
                        const currentScene = getCurrentRouteName(currentState);
                        const previousScene = getCurrentRouteName(prevState);
                        if (previousScene !== currentScene) {
                            if (lightContentScenes.indexOf(currentScene) >= 0) {
                                //是不是可以放到各自的didmount里
                                //StatusBar.setBarStyle('light-content')
                            } else {
                                //StatusBar.setBarStyle('dark-content')
                            }
                        }
                    }
                }
            />
        );
    }
}

//底部导航栏
const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScene, 
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '团购',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_homepage@2x.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_homepage_selected@2x.png')}
                    />
                )
            }),
        },
        Nearby: {
            screen: NearbyScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '附近',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_merchant@2x.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_merchant_selected@2x.png')}
                    />
                )
            }),
        },

        Order: {
            screen: OrderScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '订单',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_order@2x.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_order_selected@2x.png')}
                    />
                )
            }),
        },

        Mine: {
            screen: MineScene,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '我的',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('./img/tabbar/pfb_tabbar_mine@2x.png')}
                        selectedImage={require('./img/tabbar/pfb_tabbar_mine_selected@2x.png')}
                    />
                )
            }),
        },
    },
    {
        tabBarComponent: TabBarBottom, //可能是修改安卓样式
        tabBarPosition: 'bottom', //位置
        swipeEnabled: true, //可滑动
        animationEnabled: true, //动画切页
        lazy: true, //每一个tab页初始化时候都是懒加载重新触发didmount
        tabBarOptions: {
            activeTintColor: color.theme,
            inactiveTintColor: '#999',
            style: { backgroundColor: '#fff' },
        },
    }

);

//前进后退导航
const Navigator = StackNavigator(
    //滑动导航页的三种类型
    {
        Tab: { screen: Tab }, //tab页是每个首页
        Web: { screen: WebScene },
        GroupPurchase: { screen: GroupPurchaseScene },
    },
    {
        navigationOptions: {
            // headerStyle: { backgroundColor: color.theme }
            headerBackTitle: null,
            headerTintColor: '#333333',
            showIcon: true,
        },
    }
);
//make this component available to the app
export default RootScene;
