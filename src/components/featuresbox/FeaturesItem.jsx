import React from 'react';
import { Icon } from 'antd-mobile';

const FeaturesItem = ({ icon }) => {
  return (
    <div>
      <Icon type={icon} size="lg" />
    </div>
  );
};

export default FeaturesItem
