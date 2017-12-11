import React from 'react';
import { List } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

const InterlocutionItem = ({ data }) => {
  const { id, consultorName, content, createTime } = data
  return (
    <div>
      <Item
        onClick={() => hashHistory.push(`/interlocution/consultation/${id}`)}
        key={id}
        align="top"
        multipleLine
        extra={createTime}
      >
        {consultorName}
        <Brief>{content}</Brief>
      </Item>
    </div>

  );
};

export default InterlocutionItem;
