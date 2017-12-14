import React from 'react';
import {Link} from 'react-router';
import {IMG_DOMAIN} from "../../utils/config";

const ExpertListPanelItem = ({ data }) => {
  return (
    <div style={{ padding: '5px', textAlign: 'center' }}>
      <img
        src={`${IMG_DOMAIN}${data.logo}`}
        alt=""
        style={{ height: '85px', width: '80%', borderRadius: '50%' }}
      />
      <p
        style={{
          margin: '5px',
          fontSize: '13px',
          color: '#949494',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
      >
        {data.name}
      </p>
    </div>
  );
};

export default ExpertListPanelItem;
