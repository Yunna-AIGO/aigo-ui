import React, {Component} from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    TouchableOpacity,
    Text
} from 'react-native';
import ModalPage from './ModalPage'
export default class StudyGithub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            /*设置弹出框是否可见*/
            viewCanVisible: false,
        }
    }

    render() {
        return (<View>
            <TouchableOpacity onPress={()=>this.showPage()}>
                <Text style={styles.tabText}>点击可以弹出页面</Text>
            </TouchableOpacity>
            {/*根布局中添加弹出框层*/}
            {this.renderVisibleView()}
        </View>);
    }

    /**
     *   visible={this.state.viewCanVisible}设置是否可见
     *   onClose设置关闭操作
     * @returns {XML}
     */
    renderVisibleView() {
        return (
            <ModalPage
                visible={this.state.viewCanVisible}
                {...this.props}
                onClose={()=> {
                    this.setState({viewCanVisible: false})
                }}/>
        )
    }

    /**
     * 弹出框可见
     */
    showPage() {
        this.setState({viewCanVisible: true});
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    tabText: {
        fontSize: 20,
        color: 'blue',
        margin: 20,
        paddingLeft: 15
    },
});

AppRegistry.registerComponent('MyApp', () =>StudyGithub);