import React from 'react';
import { Link } from 'react-router';

const ExpertListPanelItem = ({ data }) => {
  return (
    <Link to={`expert/${data.id}`}>
      <div style={{ padding: '5px', textAlign: 'center' }}>
        <img
          src={data.thumbnail}
          alt=""
          style={{ height: '85px', width: '100%' }}
        />
        <p style={{ margin: '5px' }}>{data.name}</p>
      </div>
    </Link>
  );
};

export default ExpertListPanelItem;
