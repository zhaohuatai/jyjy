import React from 'react';
import { Card, Button } from 'antd-mobile';
import { WECHAT_LOGIN } from "../../utils/config";

const UserPageHeader = () => {
  return (
    <div>
      <Card full style={{ backgroundColor: '#2fc2ba' }}>
        <Card.Header
          title="李华"
          thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
          extra={<Button size='small' onClick={() => window.location.href = WECHAT_LOGIN}>登录</Button>}
        />
      </Card>
    </div>
  );
};

export default UserPageHeader;
