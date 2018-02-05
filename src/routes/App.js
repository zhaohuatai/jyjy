import React, { Component } from 'react';
import BottomTab from '../components/layout/BottomTab';
import 'antd-mobile/dist/antd-mobile.css';
import Header from '../components/layout/Header';
import { hashHistory } from 'react-router'

class App extends Component {
  componentDidMount() {
  }

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
