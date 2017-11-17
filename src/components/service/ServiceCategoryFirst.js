import React from 'react';
import { List, Badge, Tabs, Button } from 'antd-mobile';
import ListHeader from '../listpanel/ListHeader';
import ServiceSecondListItem from './ServiceListItem';

const Item = List.Item;
const Brief = Item.Brief;


const ServiceCategoryFirst = ({ list_data, title, title_icon, href }) => {
  return (
    <div>
      <ListHeader title={title} icon={title_icon} href={href} />
      <List>
        {
          list_data.map(item => (
            <ServiceSecondListItem data={item} />
          ))
        }
      </List>
    </div>
  );
};

export default ServiceCategoryFirst;
