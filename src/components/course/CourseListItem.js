import React from 'react';
import { Button, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { IMG_DOMAIN } from "../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;

const CourseListItem = ({ data }) => {
  const {
    name, id, learningCount, thumbnailUrl,
  } = data;
  return (
    <Item
      onClick={() => hashHistory.push(`/course/${id}`)}
      align="top"
      thumb={<img style={{ width: '60px', height: '60px' }} src={`${IMG_DOMAIN}${thumbnailUrl}`} />}
      multipleLine
    >
      {name}
      <Brief>学习({learningCount})</Brief>
    </Item>
  );
};

export default CourseListItem;
