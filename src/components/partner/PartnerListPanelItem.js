import React from 'react';
import { Link } from 'react-router';

const ExpertListPanelItem = ({ data }) => {
  return (
    <div style={{ padding: '5px', textAlign: 'center' }}>
      <img
        src={data.logo}
        alt=""
        style={{ height: '85px', width: '100%' }}
      />
      <p style={{ margin: '5px', fontSize: '12px' }}>{data.name}</p>
    </div>
  );
};

export default ExpertListPanelItem;
