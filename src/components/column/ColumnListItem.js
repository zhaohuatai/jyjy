import React from 'react';
import {Button, List, Badge} from 'antd-mobile';
import {hashHistory} from 'react-router';
import {IMG_DOMAIN} from "../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;

const ColumnListItem = ({data}) => {
  const { thumbnailUrl, title, hint, learningCount, id, currentItemNum, totleItemCount } = data.columnChannel;
  return (
    <Item
      onClick={() => hashHistory.push(`/column/${id}`)}
      align="top"
      thumb={<img style={{width: '60px', height: '60px'}} src={`${IMG_DOMAIN}${thumbnailUrl}`}/>}
      multipleLine
      extra={ data.columnSubscribedHasNew ? <Badge text='有更新' /> : null}
    >
      <span style={{ fontSize: '15px' }}>{title}</span>
      <Brief style={{fontSize: '12px', marginTop: '0' }}>
        {hint}
        <br />
        <span style={{ float: 'left'}}>已更新{currentItemNum}期／总{totleItemCount}期</span>
        <span style={{ float: 'right'}}>{learningCount}人已开通</span>
      </Brief>
    </Item>
  );
};

export default ColumnListItem;
