import React from 'react';
import { Card, Button, Flex, WhiteSpace, List } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { IMG_DOMAIN } from "../../../../utils/config";
import CourseListItem from "../../../../components/course/CourseListItem";

const Item = List.Item;
const Brief = Item.Brief;

const CourseOrderItem = ({ data, doPay }) => {
  const { serviceCourseList, serviceCourseOrder } = data;
  return (
    <div>
      <Card full>
        {
          serviceCourseList.map(item => {
            const {
              name, id, learningCount, favoriteCount, thumbnailUrl
            } = item;

            return (
              <Item
                onClick={() => hashHistory.push(`/my/order/course/${serviceCourseOrder.id}`)}
                align="top"
                thumb={<img style={{ width: '60px', height: '60px' }} src={`${IMG_DOMAIN}${thumbnailUrl}`} />}
                multipleLine
                key={id}
              >
                {name}
                <Brief>学习({learningCount})</Brief>
              </Item>
            )
          })
        }
        {
          serviceCourseOrder.orderStatus == 1 ?
            <Card.Footer
              content={
                <Flex>
                  <Flex.Item ><span style={{ color: 'red' }}>总价 ¥{serviceCourseOrder.payFee * 0.01}</span></Flex.Item>
                  <Flex.Item />
                  <Flex.Item />
                  <Flex.Item>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => doPay({ id: serviceCourseOrder.id, payFee: serviceCourseOrder.payFee })}>支付</Button>
                  </Flex.Item>
                </Flex>
              }
            />
            :
            null
        }

      </Card>
      <WhiteSpace style={{ backgroundColor: '#f5f5f9' }} />
    </div>

  );
};

export default CourseOrderItem;
