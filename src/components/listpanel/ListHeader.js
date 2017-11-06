import React from 'react';
import { WingBlank } from 'antd-mobile';
const ListHeader = ({ title, icon }) => {
  return (
    <div style={{ backgroundColor:'#fff', height:'40px', lineHeight:'40px', borderBottom: '1px solid #ddd'}}>
      <WingBlank>
        <svg className="icon" aria-hidden="true"><use xlinkHref={`#${icon}`} /></svg>
        {title}
      </WingBlank>
    </div>
  );
};

export default ListHeader;
