import React from 'react';
import { List, Badge, Tabs, Button, WhiteSpace } from 'antd-mobile';
import ListHeader from '../listpanel/ListHeader';
import CourseListItem from './CourseListItem';

const Item = List.Item;
const Brief = Item.Brief;


const CourseListPanel = ({ list_data }) => (
  <div>
    <ListHeader title='经英课堂' href='/course' icon='icon-kecheng' />
    <List>
      {
          list_data.map(item => <CourseListItem data={item} key={item.id} />)
        }
    </List>
    <WhiteSpace />
  </div>
);

export default CourseListPanel;
