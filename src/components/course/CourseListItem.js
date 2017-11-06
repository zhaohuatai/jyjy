import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

const CourseListItem = ({ thumbnail, title, studying, id }) => {
  return (
    <Item
      onClick={() => hashHistory.push(`/course/${id}`)}
      key={id}
      extra={<Button type="primary" size="small">学习</Button>}
      align="top"
      thumb = {<img style={{ width:'60px', height:'60px' }} src={thumbnail}/>} 
      multipleLine
    >
      {title}
      <Brief>{studying}次学习</Brief>
    </Item>
  );
};

export default CourseListItem;
