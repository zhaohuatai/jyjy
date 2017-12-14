import React from 'react';
import { Carousel, Flex, WingBlank } from 'antd-mobile';
import { Link, hashHistory } from 'react-router';

const HeadLines = ({ data }) => {
  const result = [];
  for (let i = 0, len = data.length; i < len; i += 2) {
    result.push(data.slice(i, i + 2));
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
                    // 微软雅黑
                    return (
                      <div key={item[0].id} style={{ fontSize: '14px', whiteSpace: 'nowrap', fontFamily: "Microsoft Yahei" }}>
                        { item[0] ? <Link style={{lineHeight: '22px'}} to='/news'>{item[0].title}</Link> : null }<br />
                        { item[1] ? <Link style={{lineHeight: '22px'}} to='/news'>{item[1].title}</Link> : null }
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
