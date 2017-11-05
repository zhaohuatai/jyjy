import React from 'react';
import { Button, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const ArticleListItem = ({ thumbnail, title, view, id }) => {
  return (
    <Item key={id} extra={<Button size="small">了解更多</Button>} align="top" thumb = {<img style={{ width:'60px', height:'60px' }} src={thumbnail}/>} multipleLine>
      {title}<Brief>{view}次浏览</Brief>
    </Item>
  );
};

export default ArticleListItem;
