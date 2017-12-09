import React from 'react';
import { Link } from 'react-router';
import {API_DOMAIN} from "../../utils/config";

const ExpertListPanelItem = ({ data }) => {
  return (
    <Link to={`expert/${data.id}`}>
      <div style={{ padding: '5px', textAlign: 'center' }}>
        <img
          src={`${API_DOMAIN}${data.profilePicture}`}
          alt=""
          style={{ height: '85px', width: '80%', borderRadius: '50%' }}
        />
        <p style={{ margin: '5px' }}>{data.name}</p>
      </div>
    </Link>
  );
};

export default ExpertListPanelItem;
