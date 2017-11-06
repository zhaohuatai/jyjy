import React, { Component } from 'react';
import UserPageHeader from '../../components/user/UserPageHeader';
import UserPageList from '../../components/user/UserPageList';

class User extends Component {
  render() {
    return (
      <div>
        <UserPageHeader />
        <UserPageList />
      </div>
    );
  }
}

export default User;
