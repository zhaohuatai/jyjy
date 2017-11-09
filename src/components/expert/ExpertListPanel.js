import React from 'react';
import { Carousel, Flex } from 'antd-mobile';
import ListHeader from '../listpanel/ListHeader';
import CourseListItem from '../course/CourseListItem';
import ExpertListPanelItem from './ExpertListPanelItem';

const ExpertListPanel = ({ list_data, title, title_icon }) => {
  const result = [];
  for (let i = 0, len = list_data.length; i < len; i += 3) {
    result.push(list_data.slice(i, i + 3));
  }
  return (
    <div>
      <ListHeader title={title} icon={title_icon} href='/expert'/>
      <Carousel
        className="my-carousel"
        autoplay={true}
        infinite
        selectedIndex={1}
        swipeSpeed={35}
        dots={false}
        style={{ backgroundColor: '#fff' }}
      >
        {
          result.map(item => (
            <Flex key={item[0].id}>
              {
                item[0] ? <Flex.Item><ExpertListPanelItem data={item[0]} /></Flex.Item> : <Flex.Item></Flex.Item>
              }

              {
                item[1] ? <Flex.Item><ExpertListPanelItem data={item[1]} /></Flex.Item> : <Flex.Item></Flex.Item>
              }
              
              {
                item[2] ? <Flex.Item><ExpertListPanelItem data={item[2]} /></Flex.Item> : <Flex.Item></Flex.Item>
              }
            </Flex>
          ))
        }
      </Carousel>
    </div>
  );
};

export default ExpertListPanel;
