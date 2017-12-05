import React from 'react';
import { List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { SCH_BADGE } from '../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

const SchoolListItem = ({ data }) => {
  const {
    badge, name, stage, id, firstRate, rank,
  } = data;
  return (
    <Item
      onClick={() => hashHistory.push(`/school/${id}`)}
      key={id}
      align="top"
      thumb={<img style={{ width:'60px', height:'60px' }} src={`${SCH_BADGE}${badge}`} />}
      multipleLine
    >
      {name}
      <Brief>{stage} {firstRate ? '双一流' : null} {rank}</Brief>

    </Item>
  );
};

export default SchoolListItem;
