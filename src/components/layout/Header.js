import React, { PropTypes } from 'react'
import { NavBar, Icon } from 'antd-mobile';

class Header extends React.Component {
  render () {
    return(
      <NavBar
      mode="dark"
      rightContent={[
        <Icon key="1" type="ellipsis" />,
      ]}
    >经英教育</NavBar>
    )
  }
}

export default Header;
