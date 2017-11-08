import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';

class Specialty extends Component {
  render() {
    return (
      <div>
        <SearchBar placeholder="专业名称" />
      </div>
    );
  }
}

export default Specialty;
