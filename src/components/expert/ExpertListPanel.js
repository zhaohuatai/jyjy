import React from 'react';
import { Carousel } from 'antd-mobile';
import ListHeader from '../listpanel/ListHeader';
import CourseListItem from '../course/CourseListItem';

const ExpertListPanel = ({ list_data, title, title_icon }) => {
  return (
    <div>
      <ListHeader title={title} icon={title_icon} />
      <Carousel
        className="my-carousel"
        autoplay={true}
        infinite
        selectedIndex={1}
        swipeSpeed={35}
      >
        {list_data.map(item => (
          <a href="http://www.baidu.com" key={item.id}>
            <img
              src={item.thumbnail}
              alt=""
              style={{ height: '150px', width: '150px' }}
            />
          </a>
        ))}
      </Carousel>
    </div>
  );
};

export default ExpertListPanel;
