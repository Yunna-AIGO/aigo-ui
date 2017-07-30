/** 配置项的解密 */
import React, {Component}  from 'react';
import fetch from "cathay-fetch";
import {
    Form,
    Input,
    Spin,
    Button,
    Modal,
    Menu,
    Icon,
    Row, Col,
} from 'antd';
class ToolConfigEncrypt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawText: '',
            encryptedText: '',
        }
    }

    onEncrypt() {
        fetch(`/api/v1/security/encrypt?msg=${this.state.rawText}`, {
            method: 'get'
        }).then(res => {
            if (res.code != '200') {
                alert('出错！' + res.message);
                return;
            }
            this.setState({
                encryptedText: res.data,
            });
        })
    }

    onChange = (e) => {
        this.setState({
            rawText: e.target.value,
        });
    }

    render() {
        const {rawText, encryptedText} = this.state
        return (
            <div>
                <Row style={{margin: '10px 0'}}>
                    <Col span={8} offset={6}>
                        <span>请确定好当前的工作环境</span>
                        <br/>
                    </Col>
                </Row>
                <Row style={{margin: '10px 0'}}>
                    <Col span={8} offset={6}>
                        <Input placeholder="填写明文" value={rawText} onChange={this.onChange}/>
                    </Col>
                </Row>
                <Row style={{margin: '10px 0'}}>
                    <Col span={8} offset={9}>
                        <Button type="primary" icon="lock" onClick={this.onEncrypt.bind(this)}>加密</Button>
                    </Col>
                </Row>
                <Row style={{margin: '10px 0'}}>
                    <Col span={8} offset={6}>
                        <Input type="textarea" rows={4} value={encryptedText}/>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Form.create()(ToolConfigEncrypt)