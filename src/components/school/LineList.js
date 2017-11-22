import React from 'react';
import { Flex } from 'antd-mobile';

const LineList = ({ data }) => (
  <div>
    <div style={{ textAlign: 'center', backgroundColor: '#fff', height: '40px' }}>
      <Flex style={{ textAlign: 'center', lineHeight: '40px' }}>
        <Flex.Item>年份</Flex.Item>
        <Flex.Item>批次</Flex.Item>
        <Flex.Item>分数</Flex.Item>
      </Flex>
    </div>

    {
      data.map(item=>{
        return (
          <div style={{ textAlign: 'center', backgroundColor: '#fff', height: '40px' }} key={item.id}>
            <Flex style={{ textAlign: 'center', lineHeight: '40px' }}>
              <Flex.Item>{item.years}</Flex.Item>
              <Flex.Item>{item.batchName}</Flex.Item>
              <Flex.Item>{item.scoreLine}</Flex.Item>
            </Flex>
          </div>
        )
      })
    }

  </div>
);

export default LineList;
