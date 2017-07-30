import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix , Row, Col} from 'antd';

import NavPath from '../../control/NavPath'
import Header from '../../control/Header'
import Sidebar from '../../control/Sidebar'
import Footer from '../../control/Footer'

import './index.less';

class App extends React.Component {
  render() {
    const {user} = this.props;

    return (
      <div className="ant-layout-aside">
        <Sidebar />
        <div className="ant-layout-main">
          <Header user={user} />
          <NavPath />
          <div className="ant-layout-container">
            <div className="ant-layout-content">
              {this.props.children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired
};

App.contextTypes = {
  router: React.PropTypes.object
}

const mapStateToProps = (state) => {
  const {user} = state;
  return {
      user: user ? user : null,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
