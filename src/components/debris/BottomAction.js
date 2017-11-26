import React from 'react';
import { Flex } from 'antd-mobile';

const BottomAction = ({ buttons }) => {
  const style={
    position: 'absolute',
    zIndex: '100',
    bottom: '50px',
    backgroundColor: '#2fc3ba',
    height: '50px',
    lineHeight: '50px',
    width: '100%',
    textAlign:'center',
    color: '#fff'
  }

  return (
    <Flex style={style}>
      {
        buttons.map(item => {
          return <Flex.Item onClick={() => item.action()} key={item.label}>
            {item.label}
          </Flex.Item>
        })
      }
    </Flex>
  );
}

export default BottomAction;
