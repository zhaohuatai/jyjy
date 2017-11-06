import React from 'react';
import { Card } from 'antd-mobile';

const UserPageHeader = () => {
  return (
    <div>
      <Card full style={{ backgroundColor: '#2fc2ba' }}>
        <Card.Header
          title="李华"
          thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
          extra={<span>VIP</span>}
        />
      </Card>
    </div>
  );
};

export default UserPageHeader;
