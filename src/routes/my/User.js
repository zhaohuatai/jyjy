import React, { Component } from 'react';
import UserPageHeader from '../../components/user/UserPageHeader';
import UserPageList from '../../components/user/UserPageList';
import { loadMember } from '../../service/user';

class User extends Component {
  state = {
    memberinfo: {}
  }

  componentDidMount() {
    loadMember().then(data => {
      this.setState({memberinfo: data.data.member})
    })
  }

  render() {
    return (
      <div>
        <UserPageHeader data={this.state.memberinfo} />
        <UserPageList />
      </div>
    );
  }
}

export default User;
