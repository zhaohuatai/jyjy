import React from 'react';
import { List, Badge, Tabs, Button, WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router'
import ListHeader from '../listpanel/ListHeader';
import ServiceListItem from './ServiceListItem';

const Item = List.Item;
const Brief = Item.Brief;

const ListPanel = ({ list_data }) => {

  return (
    <div>
      {
        list_data.map(item => {
          return (
            <div key={item.serviceEntranceCateFirst.id}>
              <ListHeader href={`/service/first/${item.serviceEntranceCateFirst.id}`} title={item.serviceEntranceCateFirst.name} icon='icon-kecheng' />
              <List>
                {
                  item.serviceEntranceCateSecondDtoList.map(item => {
                    return (
                      <div key={item.serviceEntranceCateSecond.id}>
                        <Item
                          onClick={() => hashHistory.push(`/service/second/${item.serviceEntranceCateSecond.id}`)}
                          arrow="horizontal"
                        >
                          {item.serviceEntranceCateSecond.name}
                        </Item>
                      </div>
                    );
                  })
                }
                {
                  item.serviceEntranceList.map(item => (
                    <ServiceListItem data={item} key={item.id} />
                  ))
                }
              </List>
              <WhiteSpace />
            </div>
          )
        })
      }
    </div>
  );
};

export default ListPanel;
