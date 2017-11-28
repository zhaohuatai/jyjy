import React, { Component } from 'react';
import { loadItemResDtoByItemId, createColumnChannelOrder } from '../../service/column';
import {IMG_DOMAIN} from "../../utils/config";
import { List, Tabs, Button, Badge, WhiteSpace } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class ColumnDetail extends Component {
  state = {
    columnChannel:{},
    column_list:[],
    column_name: ''
  }

  componentDidMount() {
    const id = this.props.params.id;

    loadItemResDtoByItemId({itemId:id}).then(data => {
      this.setState({ columnChannel: data.data.itemRes.columnChannelItem })
    })
  }

  handlePlayOrder = () => {
    createColumnChannelOrder({}).then(data => {

    })
  }

  render() {
    console.log(this.state);

    const { presenterName, content, freePay, commentCount, hint, coverUrl, title, price, priceVIP } = this.state.columnChannel;
    const tabs = [
      { title: <Badge>详情</Badge> },
      { title: <Badge>评论({commentCount})</Badge> }
    ];

    const Price = ({free, price, priceVIP}) => {

      return(
        <div style={{color: 'red'}}>
          {free ? <span>¥{price}/会员¥{priceVIP}</span> : <span>免费</span>}
        </div>
        )
    };

    return (
      <div>
        <img src={`${IMG_DOMAIN}${coverUrl}`} />

        <List>
          <Item
            multipleLine
            extra={<Button size='small' type='primary' onClick={this.handlePlayOrder}>立即购买</Button>}
          >
            {this.state.column_name} - {title}
            <Brief>
              主讲人：{presenterName} <br />
              <Price free={freePay} price={price} priceVIP={priceVIP} />
            </Brief>
          </Item>
        </List>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onTabClick={this.handleChangeTab}
        >
          <div dangerouslySetInnerHTML={{ __html: content }} style={{ backgroundColor: '#fff', padding: '15px' }} />

          <div>
            <WhiteSpace />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default ColumnDetail;
