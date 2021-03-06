import React from 'react';
import { Link } from 'react-router';
import { WingBlank, Flex } from 'antd-mobile';

const ListHeader = ({ title, icon, href }) => (
  <div style={{
 backgroundColor: '#fff', height: '40px', lineHeight: '40px', borderBottom: '1px solid #ddd',
}}
  >
    <WingBlank>
      <Flex justify="space-between" >
        <Flex.Item>
          <svg className="icon" aria-hidden="true"><use xlinkHref={`#${icon}`} /></svg>{title}
        </Flex.Item>
        {
            href ?
              <Flex.Item style={{ textAlign: 'right' }}>
                <Link to={href}>更多></Link>
              </Flex.Item>
              : null
          }
      </Flex>
    </WingBlank>
  </div>
);

export default ListHeader;
