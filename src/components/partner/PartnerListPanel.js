import React from 'react';
import { Carousel, Flex } from 'antd-mobile';
import ListHeader from '../listpanel/ListHeader';
import CourseListItem from '../course/CourseListItem';
import PartnerListPanelItem from './PartnerListPanelItem';

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
        dots={false}
        style={{ backgroundColor: '#fff' }}
      >
        {list_data.map(item => (
          <Flex key={item.id}>
            <Flex.Item>
              <PartnerListPanelItem data={item} />
            </Flex.Item>
            <Flex.Item>
              <PartnerListPanelItem data={item} />
            </Flex.Item>
            <Flex.Item>
              <PartnerListPanelItem data={item} />
            </Flex.Item>
          </Flex>
        ))}
      </Carousel>
    </div>
  );
};

export default ExpertListPanel;
