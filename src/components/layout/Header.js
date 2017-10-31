import React, { PropTypes } from 'react'
import { NavBar, Icon } from 'antd-mobile';

class Header extends React.Component {
  render () {
    return(
      <NavBar
      mode="dark"
      leftContent="返回"
      rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
    >NavBar</NavBar>
    )
  }
}

export default Header;
