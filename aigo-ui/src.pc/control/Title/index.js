/**
 * Created by i01007600608 on 2017/1/23.
 */
import React from 'react';
import {Form, Row, Col, Input, Button, Icon, DatePicker} from 'antd';
import './index.less'
export default class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col span={24} className="ant-layout-title">
                    <font style={this.props.style}>{this.props.title}</font>
                </Col>
            </Row>
        );
    }
}
