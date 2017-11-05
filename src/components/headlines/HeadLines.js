import React from 'react';
import { Carousel, Flex, WingBlank } from 'antd-mobile';
import { Link } from 'react-router';

const HeadLines = ({ data }) => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <WingBlank>
        <Flex>
          <Flex.Item>
            <svg className="icon" aria-hidden="true" style={{ width: '1.8em', height: '1.8em' }}><use xlinkHref={'#icon-iconzhenghe61'} /></svg>
          </Flex.Item>
          <Carousel
            className="my-carousel"
            vertical
            dots={false}
            dragging={false}
            swiping={false}
            autoplay
            infinite
            style={{ flex: 8 }}
          >
            {
              data.map((item) => {
                return <Link key={item.id} to={item.url}>{item.title}</Link>;
              })
            }
          </Carousel>
        </Flex>
      </WingBlank>
    </div>
  );
};

export default HeadLines;
