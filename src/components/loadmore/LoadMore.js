import React from 'react';
import { Button } from 'antd-mobile';

const LoadMore = ({ disable, onClick}) => {
  return (
    disable ? <Button disabled>没有更多</Button>
      : <Button onClick={() => onClick()}>加载更多</Button>
  );
};

export default LoadMore;
