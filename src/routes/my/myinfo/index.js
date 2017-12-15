import React, {Component} from 'react';
import { List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { loadMember } from '../../../service/user';
import { IMG_DOMAIN } from '../../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class MyInfo extends Component {
  state = {
    member: {},
  }

  componentDidMount() {
    loadMember({rows: 1000}).then(data => {
      this.setState({member: data.data.member});
    });

  }

  render() {
    const { name, point, clazz, schoolName, phone, profilePicture } = this.state.member;
    return (
      <div>
        <List>
          <Item
            thumb={<svg className="icon" aria-hidden="true" style={{ width: '3em', height: '3em' }}><use xlinkHref='#icon-xuesheng' /></svg>}
            extra='编辑'
            arrow='horizontal'
            onClick={()=>hashHistory.push('/my/editmyinfo')}
          >
            {name}<Brief>积分 {point}</Brief>
          </Item>
          <Item
            extra={clazz}
          >
            年级
          </Item>
          <Item
            extra={schoolName}
          >
            学校
          </Item>
          <Item
            extra={phone}
          >
            电话
          </Item>
        </List>
      </div>
    );
  }
}

export default MyInfo;
