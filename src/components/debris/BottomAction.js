import React from 'react';
import { Flex } from 'antd-mobile';

const BottomAction = ({ buttons }) => {
  const style={
    position: 'fixed',
    zIndex: '100',
    bottom: '50px',
    height: '50px',
    lineHeight: '50px',
    width: '100%',
    textAlign: 'center',
    //color: '#fff',
    //backgroundColor: '#2fc3ba',
  }

  return (
    <Flex style={style}>
      {
        buttons.map(item => {
          return <Flex.Item
            onClick={() => item.action()}
            key={item.label}
            style={{
              color: item.color,
              backgroundColor: item.backgroundColor,
              marginLeft: 0
            }}>
            {item.label}
          </Flex.Item>
        })
      }
    </Flex>
  );
}

export default BottomAction;
