import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import {IMG_DOMAIN} from "../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;

const ServiceSecondListItem = ({ data }) => {
  const { id, title, thumbnailUrl, maxAppointCount } = data;

  return (
    <Item
      onClick={() => hashHistory.push(`/service/${id}`)}
      key={id}
      thumb = {<img style={{ width:'60px', height:'60px' }} src={`${IMG_DOMAIN}${thumbnailUrl}`}/>}
      multipleLine
      arrow="horizontal"
    >
      {title}
      <Brief>{`最大预约（${maxAppointCount}）`}</Brief>
    </Item>
  );
};

export default ServiceSecondListItem;
