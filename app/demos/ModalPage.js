//覆盖层页面js实现：

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Modal,
    ScrollView,
    TouchableHighlight,
    Platform
} from 'react-native';
export default  class ModalPage extends Component {
    constructor(props) {
        super(props)
    }

    /**
     * animationType设置动画类型:PropTypes.oneOf(['none', 'slide', 'fade'])
     *transparent:是否透明
     * visible：是否可见
     * onRequestClose：关闭操作
     * @returns {XML}
     */
    render() {
        return (<Modal
            animationType={"slide"}
            transparent={true}
            visible={this.props.visible}
            onRequestClose={() => {
                this.props.onClose();
            }}
        >
            <ScrollView style={styles.modalContainer}>
                {this.renderThemeItems()}
            </ScrollView>
        </Modal>)
    }

    /**
     * 随意添加五个Text，根据实际情况修改
     * @returns {Array}
     */
    renderThemeItems() {
        var views = [];
        for (let i = 0, length = 5; i < length; i++) {
            views.push(<View key={i}>
                {this.getContentItem('每一行的内容,点击弹出框会消失')}
            </View>)
        }
        return views;
    }

    getContentItem(content) {
        return (
            <TouchableHighlight
                style={{flex: 1}}
                underlayColor='blue'
                onPress={()=>this.onClickItem()}
            >
                <View>
                    <Text style={{fontSize:20,color:'white',margin:5,paddingLeft:20}}>{content}</Text>
                </View>
            </TouchableHighlight>
        );
    }


    onClickItem() {
        this.props.onClose();
    }
}
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        margin: 10,
        marginTop: Platform.OS === 'ios' ? 20 : 10,
        backgroundColor: 'gray',
        borderRadius: 3,
        shadowColor: 'gray',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.5,
        shadowRadius: 2,
        padding: 3
    }
});