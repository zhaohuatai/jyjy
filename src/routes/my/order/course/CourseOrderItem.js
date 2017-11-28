import React from 'react';
import { Card, Button, Flex, WhiteSpace, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { IMG_DOMAIN } from "../../../../utils/config";
import CourseListItem from "../../../../components/course/CourseListItem";

const Item = List.Item;
const Brief = Item.Brief;

const CourseOrderItem = ({ data, doPay }) => {
  const { serviceCourseList, serviceCourseOrder } = data;
  const { id, payFee } = serviceCourseOrder;
  return (
    <div>
      <Card full>
        {
          serviceCourseList.map(item => {
            const {
              name, id, learningCount, favoriteCount, coverUrl
            } = item;

            return (
              <Item
                onClick={() => hashHistory.push(`/my/order/course/${serviceCourseOrder.id}`)}
                align="top"
                thumb={<img style={{ width: '60px', height: '60px' }} src={`${IMG_DOMAIN}${coverUrl}`} />}
                multipleLine
                key={id}
              >
                {name}
                <Brief>学习({learningCount}) 收藏({favoriteCount})</Brief>
              </Item>
            )
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

export default CourseOrderItem;
