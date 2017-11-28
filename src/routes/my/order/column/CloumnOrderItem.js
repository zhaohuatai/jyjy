import React from 'react';
import { Card, Button, Flex, WhiteSpace, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { IMG_DOMAIN } from '../../../../utils/config';
import ColumnListItem from "../../../../components/column/ColumnListItem";

const Item = List.Item;
const Brief = List.Item.Brief;

const ColumnOrderItem = ({ data, doPay }) => {
  const { columnChannel, columnChannelOrder } = data;
  const { payFee  } = columnChannelOrder;
  return (
    <div>
      <Card full>
        {
          columnChannel.map(item => {
            const { coverUrl, title, learningCount, id } = item;

            return (
              <Item
                onClick={() => hashHistory.push(`my/order/column/${columnChannelOrder.id}`)}
                align="top"
                thumb={<img alt={title} style={{ width: '60px', height: '60px' }} src={coverUrl} />}
                multipleLine
                key={id}
              >
                {title}<Brief>期数({learningCount})  学习人({learningCount})</Brief>
              </Item>
            );
          })
        }
        <Card.Footer
          content={
            <Flex>
              <Flex.Item ><span style={{ color: 'red' }}>总价 ¥{payFee}</span></Flex.Item>
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
      <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
    </div>

  );
};

export default ColumnOrderItem;
