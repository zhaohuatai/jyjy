import React from 'react';
import { List, Button } from 'antd-mobile';
import { hashHistory } from 'react-router'
import { IMG_DOMAIN, WECHAT_LOGIN } from '../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

const UserPageHeader = ({ data, doSignIn }) => {
  const { name, profilePicture, points } = data;

  return (
    <List>
        <Item
          style={{ backgroundColor: '#2fc2ba' }}
          thumb={<svg className="icon" aria-hidden="true" style={{ width: '3em', height: '3em' }}><use xlinkHref='#icon-xuesheng' /></svg>}
          multipleLine
          extra={<Button size='small'  onClick={() => doSignIn()}>签到</Button>}
        >
          <span style={{ color: '#fff' }}>
            {name}
          </span>
          <Brief>积分 {points}</Brief>
        </Item>
    </List>
  );
};

export default UserPageHeader;
