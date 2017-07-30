/**
 * Created by i01007600608 on 2017/2/9.
 */
import React from 'react';

import {Tabs, Button, Row, Col, Icon} from 'antd';
import './index.css';

export default class CloseFrame extends React.Component {

    render() {
        return (
            <div className="close-frame">
                <div className="close-icons" onClick={this.props.closeAction()}><Icon type="close"/></div>
            </div>
        );
    }
}

