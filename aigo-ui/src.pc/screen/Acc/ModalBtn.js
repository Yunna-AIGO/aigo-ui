import React, { Component }  from 'react';
import { Modal, Button, Tabs, Input, Form, message } from 'antd';

class ModalBtn extends Component {
    state = { visible: false,tabkey:1 }

    showModal = () => {
      this.setState({
          visible: true,
      });
    }

    handleOk = (e) => {
      console.log(222222);
      let data = this.props.form.getFieldsValue();
      if(data.inputAccount==undefined || data.inputPwd==undefined){
        message.info(`请输入账户或者密码`);
      }else{
        let loginMessage={inputAccount:data.inputAccount,inputPwd:data.inputPwd};
        this.setState({
          visible: false,
        });
        //fetch请求
        fetch('api/v1/login', {
            method: 'post',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:loginMessage
        }).then(res => {
            return res.json();
        }).then(data => {
          
        })
      }
    }

    handleCancel = (e) => {
      console.log(111111);
      this.setState({
          visible: false,
      });
    }

    callback(key) {
      this.setState({tabkey:key});
    }

    render() {
        const TabPane = Tabs.TabPane;
        let tabkey = this.state.tabkey;
        const { getFieldDecorator } = this.props.form;
        return (
          <div>
            <Button type="primary" onClick={this.showModal}>单点登录</Button>
            <Modal title="单点登录" visible={this.state.visible}
              onCancel={this.handleCancel}
              footer={
                function(){
                  if(tabkey==1){
                    return;
                  }else{
                    return [
                            <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                            <Button key="submit" type="primary" size="large" onClick={this.handleOk} >
                              确定
                            </Button>
                          ]
                  }
                }.bind(this)()}
            >
                <Tabs onChange={this.callback.bind(this)} type="card">
                  <TabPane tab="扫码登录" key="1">
                    <div style={{width:300,height:300,background:'red',marginTop:0,marginRight:'auto',marginBottom:0,marginLeft:'auto'}}>
                    </div>
                  </TabPane>
                  <TabPane tab="输入登录" key="2">
                    <div className="example-input">
                      <div style={{width:'80%',marginTop:10,marginRight:'auto',marginBottom:20,marginLeft:'auto'}}>
                        <span>账号:</span>
                        {
                          this.props.form.getFieldDecorator('inputAccount', {
                              initialValue: this.state.inputAccount,
                          })(<Input size="large" placeholder="请输入账号" style={{width:'80%'}}/>)
                        }
                      </div>
                      <div style={{width:'80%',marginTop:0,marginRight:'auto',marginBottom:0,marginLeft:'auto'}}>
                        <span>密码:</span>
                        {
                          this.props.form.getFieldDecorator('inputPwd', {
                              initialValue: this.state.inputPwd,
                          })(<Input size="large" placeholder="请输入密码" style={{width:'80%'}}/>)
                        }
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
            </Modal>
          </div>
        )}
}
export default Form.create()(ModalBtn);