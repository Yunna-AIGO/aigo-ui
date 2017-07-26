import React from 'react'
import { Row, Col, Collapse, Alert } from 'antd';
const Panel = Collapse.Panel;

import PanelBox from '../../control/PanelBox';
import srcImg from '../../control/img/home.jpg'

import {Line,Pie,Doughnut} from 'react-chartjs';

import './index.less'

export default class Home extends React.Component {
    constructor() {
        super()
    }

    callback() {

    }

    render() {

        return (
            <div>
                <img src={
                    srcImg
                } alt="" style={{width:'100%'}} />
            </div>
        )
    }
}
