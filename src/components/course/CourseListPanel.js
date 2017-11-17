import React from 'react';
import { List, Badge, Tabs, Button, WhiteSpace } from 'antd-mobile';
import ListHeader from '../listpanel/ListHeader';
import CourseListItem from './CourseListItem';

const Item = List.Item;
const Brief = Item.Brief;


const CourseListPanel = ({ data, href, title }) => {

  return (
    <div>
      <ListHeader title={title} href={href} />
      <List>
        {
          data.map(item => {
            return <CourseListItem data={item} key={item.id}/>
          })
        }
      </List>
      <WhiteSpace/>
    </div>
  );
};

export default CourseListPanel;
