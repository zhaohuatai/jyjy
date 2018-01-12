import React from 'react';
import { List, Badge, Tabs } from 'antd-mobile';
import ListHeader from '../listpanel/ListHeader';
import CourseListItem from '../course/CourseListItem';

const Item = List.Item;
const Brief = Item.Brief;

let tabs = [
  { title: <Badge>自招/综评面试</Badge> },
  { title: <Badge>自招/综评笔试</Badge> },
];

const CourseListPanelWithTab = ({ data, title, title_icon }) => {

  const newdata = data.slice(0, 2);

  tabs = [];
  newdata.map((category_item) => {
    tabs.push({ title: <Badge>{category_item.courseCategory.categoryName}</Badge> });
  });

  return (
    <div>
      <ListHeader title={title} icon={title_icon} />
      <List>
        <Tabs tabs={tabs} initialPage={0}>

          {
            newdata.map(item => {
              return (
                <div style={{ height: '230px' }} key={item.courseCategory.id}>
                  {
                    item.serviceCourseList.map(item => (
                      <CourseListItem
                        key={item.id}
                        data={item}
                      />
                    ))
                  }
                </div>
              )
            })
          }
        </Tabs>
      </List>
    </div>
  );
};

export default CourseListPanelWithTab;
