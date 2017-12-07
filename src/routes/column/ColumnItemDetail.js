import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { loadItemResDtoByItemId, createColumnChannelOrder } from '../../service/column';
import {IMG_DOMAIN} from "../../utils/config";
import { List, Tabs, Button, Badge, WhiteSpace, Toast } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class ColumnDetail extends Component {
  state = {
    columnChannelItem:{},
    columnChannel: {
      title: ''
    }
  }

  componentDidMount() {
    const id = this.props.params.id;

    loadItemResDtoByItemId({itemId:id}).then(data => {
      this.setState({ columnChannelItem: data.data.itemRes.columnChannelItem,  columnChannel: data.data.itemRes.columnChannel})
    })
  }

  handlePlayOrder = () => {
    createColumnChannelOrder({channelItemIds: this.props.params.id}).then(data => {
      Toast.success('下单成功');
      hashHistory.push('/my/order')
    })
  }

  render() {
    const { presenterName, content, freePay, commentCount, hint, coverUrl, title, price, priceVIP } = this.state.columnChannelItem;
    const tabs = [
      { title: <Badge>详情</Badge> },
      { title: <Badge>评论({commentCount})</Badge> }
    ];

    const Price = ({free, price, priceVIP}) => {

      return(
        <div style={{color: 'red'}}>
          {free ? <span>¥{price} / VIP ¥{priceVIP}</span> : <span>免费</span>}
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
            {this.state.columnChannel.title} - {title}
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
