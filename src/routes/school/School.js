import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';

class School extends Component {
  render() {
    return (
      <div>
        <SearchBar placeholder="学校名称" />
      </div>
    );
  }
}

export default School;
