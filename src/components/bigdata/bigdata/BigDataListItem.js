import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { IMG_DOMAIN } from "../../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;

const BigDataListItem = ({ data }) => {
  const {
    title, id, browseCount, favoriteCount, thumbnailUrl
  } = data;
  return (
    <Item
      onClick={() => hashHistory.push(`/bigdata/bigdata/${id}`)}
      key={id}
      align="top"
      thumb={<img style={{ width: '60px', height: '60px' }} src={`${IMG_DOMAIN}${thumbnailUrl}`} />}
      multipleLine
    >
      {title}
      <Brief>浏览({browseCount})</Brief>
    </Item>
  );
};

export default BigDataListItem;
