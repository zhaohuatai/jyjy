import React from 'react';
import { Button, List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

const CourseListItem = ({ thumbnail, title, studying }) => {
  return (
    <Item extra={<Button type="primary" size="small">学习</Button>} align="top" thumb = {<img style={{ width:'60px', height:'60px' }} src={thumbnail}/>} multipleLine>
      {title}<Brief>{studying}次学习</Brief>
    </Item>
  );
};

export default CourseListItem;
