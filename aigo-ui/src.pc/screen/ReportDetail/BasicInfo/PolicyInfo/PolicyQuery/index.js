/* eslint no-dupe-keys: 0, no-mixed-operators: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Input } from 'antd';
import {Link } from 'react-router';
import { Row, Col } from 'antd';
import './index.css'

 export default class PolicyQuery extends React.Component {
    constructor(props) {
        super(props);
    }

     onchange (e) {

     }

    render() {
        return (
            <div className="wrap-policy">
                <Row>
                    <Col span={2} className="policy-num">保单号：</Col>

                    <Col span={10} className="policy-input"><Input onChange={this.onchange.bind(this)} placeholder="default size" /></Col>
                    <Col span={1}></Col>
                    <Col span={4} className="policy-query">
                        <Link to={'/policy-search/'}>保单查询</Link>
                    </Col>
                    <Col span={9}></Col>
                </Row>
            </div>
        );
    }
}

