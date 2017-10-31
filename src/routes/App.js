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
        {this.props.children}
        <BottomTab />
      </div>
    );
  }
}

export default App;
