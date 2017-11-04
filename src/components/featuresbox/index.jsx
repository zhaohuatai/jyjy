import React from 'react';
import { Grid } from 'antd-mobile';

const FeaturesBox = ({ data }) => {
  const gridData = data.map(item => ({
    icon: (<svg className="icon" aria-hidden="true" style={{ width: '1.8em', height: '1.8em' }}><use xlinkHref={`#${item.icon}`} /></svg>),
    text: item.text,
  }));
  return (
    <Grid data={gridData} columnNum={5} hasLine={false} activeStyle={false} />
  );
};
export default FeaturesBox;
