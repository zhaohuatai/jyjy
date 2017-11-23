import React from 'react';
import { List } from 'antd-mobile';
import ListHeader from '../../listpanel/ListHeader';
import BigDataListItem from './BigDataListItem';

const Item = List.Item;
const Brief = Item.Brief;


const BigDataListPanel = ({ list_data }) => (
  <div>
    <ListHeader title='自招大数据' href='/bigdata/bigdata' icon='icon-kecheng' />
    <List>
      {
          list_data.map(item => <BigDataListItem data={item} key={item.id} />)
        }
    </List>
  </div>
);

export default BigDataListPanel;
