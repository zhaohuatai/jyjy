import React from 'react';
import { List, Badge, Tabs, Button } from 'antd-mobile';
import ListHeader from '../listpanel/ListHeader';
import ServiceListItem from './ServiceListItem';

const Item = List.Item;
const Brief = Item.Brief;

const ListPanel = ({ list_data }) => {
  return (
    <div>
      <ListHeader href='/service' title='服务' icon='icon-kecheng' />
      <List>
        {
          list_data.map(item => (
            <ServiceListItem data={item} key={item.id} />
          ))
        }
      </List>
    </div>
  );
};

export default ListPanel;
