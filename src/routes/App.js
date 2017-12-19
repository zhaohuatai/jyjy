import React, { Component } from 'react';
import BottomTab from '../components/layout/BottomTab';
import 'antd-mobile/dist/antd-mobile.css';
import Header from '../components/layout/Header';
import { loadWXConfig } from '../service/user';
import { API_DOMAIN } from '../utils/config';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div style={{ marginBottom: '54px' }}>
          {this.props.children}
        </div>
        <BottomTab />
      </div>
    );
  }
}

export default App;
