import React from 'react';
import { Link } from 'react-router';

const ExpertListPanelItem = ({ data }) => {
  return (
    <Link to={`expert/${data.id}`}>
      <div style={{ padding: '5px', textAlign: 'center' }}>
        <img
          src={data.member.profilePicture}
          alt=""
          style={{ height: '85px', width: '100%' }}
        />
        <p style={{ margin: '5px' }}>{data.member.name}</p>
      </div>
    </Link>
  );
};

export default ExpertListPanelItem;
