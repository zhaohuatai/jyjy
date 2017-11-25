import React, { Component } from 'react';
import BottomTab from '../components/layout/BottomTab';
import 'antd-mobile/dist/antd-mobile.css';
import Header from '../components/layout/Header';
//mock
//import '../utils/mock'

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
