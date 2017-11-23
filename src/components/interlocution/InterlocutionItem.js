import React from 'react';
import { List } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

const InterlocutionItem = ({ data }) => {
  const { id, interQuestion, interAnswer, createTime } = data
  return (
    <div>
      <Item
        onClick={() => hashHistory.push(`/interlocution/${id}`)}
        key={id}
        align="top"
        multipleLine
        extra={createTime}
      >
        {interQuestion}
        <Brief>{interAnswer}</Brief>
      </Item>
    </div>

  );
};

export default InterlocutionItem;
