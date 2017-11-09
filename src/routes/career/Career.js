import React, { Component } from 'react';
import { SearchBar } from 'antd-mobile';

class Profession extends Component {
  render() {
    return (
      <div>
        <SearchBar placeholder="职业名称" />
      </div>
    );
  }
}

export default Profession;
