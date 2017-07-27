import React, { Component } from 'react'
import { Row, Col, Icon, Menu, Dropdown, Tooltip } from 'antd'
import './index.less'
import fetch from "cathay-fetch";

export default class Header extends Component {
  constructor (props) {
    super(props);
    this.state={
      name:''
    }
  }

  componentDidMount(){
      let allcookies = document.cookie;
    //allcookies = "caToken=18446744071411467872; _ga=GA1.2.1263283024.1493135627; _gat=1";

    allcookies = allcookies.replace(/;/g,'","').replace(/=/g,'":"');
    let cookie_pos; 
    if(allcookies){
      cookie_pos = JSON.parse('{"'+allcookies+'"}').caToken;
    }
    

    fetch('/api/sso/caToken/'+cookie_pos,{
      method: 'put',
      body:JSON.stringify({caToken:cookie_pos})
    }).then(res=>{
      console.log(res);
      if(res){
        this.setState({name:res.name});
      }
    })
  }


  render () {
    const menuHead = (
      <Menu style={{right:-30,top:2}}>
        <Menu.Item style={{pointerEvents:'none'}}>
          <Icon type="user"/>
          <span style={{marginLeft:14}}>
            {this.state.name}
          </span>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank"  href="http://employee.cathay-ins.com.cn/sso/logout">
            <Icon type="logout" />
            <span style={{marginLeft:14}}>
              退&nbsp;&nbsp;&nbsp;&nbsp;出
            </span>
          </a>
        </Menu.Item>
      </Menu>
    );

    return (
      <div className='ant-layout-header'>
            <Menu className="header-menu"
            mode="horizontal">
              <Menu.Item key="mail">
                <Dropdown overlay={menuHead}>
                  <a>
                    <Icon type="user" />
                  </a>
                </Dropdown>
              </Menu.Item>
            </Menu>
      </div>
    )
  }
}