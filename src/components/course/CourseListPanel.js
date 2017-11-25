import React from 'react';
import { List, Badge, Tabs, Button, WhiteSpace } from 'antd-mobile';
import ListHeader from '../listpanel/ListHeader';
import CourseListItem from './CourseListItem';

const Item = List.Item;
const Brief = Item.Brief;


const CourseListPanel = ({ data, title, href, title_icon }) => (
  <div>
    <ListHeader title={title} href={href} icon={title_icon}/>
    <List>
      {
          data.map(item => <CourseListItem data={item} key={item.id} />)
        }
    </List>
    <WhiteSpace />
  </div>
);

export default CourseListPanel;
