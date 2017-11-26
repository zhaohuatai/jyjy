import React from 'react';
import { Card, Button, Flex, WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';

const CourseOrderItem = ({ data, doPay }) => {
  const { serviceCourseList, serviceCourseOrder } = data;
  const { id, payFee } = serviceCourseOrder;
  return (
    <div>
      <Card full>
        <Card.Header
          title="This is title"
          thumb="https://cloud.githubusercontent.com/assets/1698185/18039916/f025c090-6dd9-11e6-9d86-a4d48a1bf049.png"
          extra={<span style={{ color: 'red' }}>¥{payFee}</span>}
          onClick={() => hashHistory.push(`/my/order/column/${id}`)}
        />
        <Card.Footer
          content={
            <Flex>
              <Flex.Item />
              <Flex.Item />
              <Flex.Item />
              <Flex.Item>
                <Button
                  type="primary"
                  size="small"
                  onClick={() => doPay({ id, payFee })}>支付</Button>
              </Flex.Item>
            </Flex>
          }
        />
      </Card>
      <WhiteSpace />
    </div>

  );
};

export default CourseOrderItem;
