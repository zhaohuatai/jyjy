import React, { Component } from 'react';
import UserPageHeader from '../../components/user/UserPageHeader';
import UserPageList from '../../components/user/UserPageList';
import { Toast } from 'antd-mobile';
import { loadMember, Sign } from '../../service/user';

class User extends Component {
  state = {
    memberinfo: {}
  }

  componentDidMount() {
    loadMember().then(data => {
      this.setState({memberinfo: data.data.member})
    })
  }

  handleSignIn = () => {
    Sign().then(data=>{
      Toast.success('签到成功',1);
    })
  }

  render() {
    return (
      <div>
        <UserPageHeader data={this.state.memberinfo} doSignIn={this.handleSignIn} />
        <UserPageList />
      </div>
    );
  }
}

export default User;
