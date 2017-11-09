import React from 'react';
import { List, Badge, Tabs, Button } from 'antd-mobile';
import ListHeader from './ListHeader';
import CourseListItem from '../course/CourseListItem';

const Item = List.Item;
const Brief = Item.Brief;


const ListPanel = ({ list_data, title, title_icon, renderItem, href }) => {
  return (
    <div>
      <ListHeader title={title} icon={title_icon} href={href} />
      <List>
        {
          list_data.map(item => (
            renderItem(item)
          ))
        }
      </List>
    </div>
  );
};

export default ListPanel;
