import React from 'react';
import { Carousel, Flex, WingBlank } from 'antd-mobile';
import { Link, hashHistory } from 'react-router';

const HeadLines = ({ data }) => {
  const result = [];
  for (let i = 0, len = data.length; i < len; i += 3) {
    result.push(data.slice(i, i + 3));
  }

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <WingBlank>
        <Flex>
          <Flex.Item style={{ marginRight: '10px' }}>
            <svg className="icon" aria-hidden="true" style={{ width: '2.8em', height: '2.8em' }}><use xlinkHref={'#icon-iconzhenghe61'} /></svg>
          </Flex.Item>
          {
            result.length > 0 ?
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
                  result.map((item) => {
                    return (
                      <div key={item[0].id}>
                        <Link to='/news'>{item[0].title}</Link><br />
                        <Link to='/news'>{item[1].title}</Link>
                      </div>
                    )
                  })
                }
              </Carousel>
              :
              null
          }
          
        </Flex>
      </WingBlank>
    </div>
  );
};

export default HeadLines;
