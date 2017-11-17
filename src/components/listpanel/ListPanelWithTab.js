import React from 'react';
import { List, Badge, Tabs, Button } from 'antd-mobile';
import ListHeader from './ListHeader';
import CourseListItem from '../course/CourseListItem';

const Item = List.Item;
const Brief = Item.Brief;


const ListPanelWithTab = ({ list_data, category = [], title, title_icon }) => {
  const tabs = [];

  category.map((category_item) => {
    tabs.push({ title: <Badge>{category_item}</Badge> });
  });

  return (
    <div>
      <ListHeader title={title} icon={title_icon} />
      <List>
        <Tabs tabs={tabs} initialPage={0}>
          <div style={{ height: '230px' }}>
            {
              list_data.map(item => (
                <CourseListItem
                  key={item.id}
                  data={item}
                />
              ))
            }
          </div>
          <div style={{ height: '230px' }}>
            {
              list_data.map(item => (
                <CourseListItem
                  key={item.id}
                  data={item}
                />
              ))
            }
          </div>
        </Tabs>
      </List>
    </div>
  );
};

export default ListPanelWithTab;
