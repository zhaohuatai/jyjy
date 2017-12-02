import React from 'react';
import { List, Badge, Tabs, Button } from 'antd-mobile';
import { hashHistory } from 'react-router'
import ListHeader from '../listpanel/ListHeader';
import ServiceListItem from './ServiceListItem';

const Item = List.Item;
const Brief = Item.Brief;

const ListPanel = ({ list_data }) => {

  return (
    <div>
      <ListHeader href='/service' title='捷径升学' icon='icon-kecheng' />
      <List>
        {
          list_data.serviceEntranceCateFirstList.map(item => {
            return (
              <Item
                onClick={() => hashHistory.push(`/service/first/${item.id}`)}
                arrow="horizontal"
              >
                {item.name}
              </Item>
            )
          })
        }
        {
          list_data.serviceEntranceCateSecondList.map(item => {
            return (
              <Item
                onClick={() => hashHistory.push(`/service/second/${item.id}`)}
                arrow="horizontal"
              >
                {item.name}
              </Item>
            )
          })
        }
        {
          list_data.serviceEntranceCateThirdList.map(item => {
            return (
              <Item
                onClick={() => hashHistory.push(`/service/third/${item.id}`)}
                arrow="horizontal"
              >
                {item.name}
              </Item>
            )
          })
        }
        {
          list_data.serviceEntranceList.map(item => (
            <ServiceListItem data={item} key={item.id} />
          ))
        }
      </List>
    </div>
  );
};

export default ListPanel;
