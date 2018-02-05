import React, { Component } from 'react';
import { loadColumnChannelDto, isSubscribed, subscribe, subscribeCancel } from '../../service/column';
import { API_DOMAIN, IMG_DOMAIN } from '../../utils/config';
import { List, Tabs, Button, Badge, WhiteSpace, Toast } from 'antd-mobile';
import { hashHistory } from 'react-router';
import WXshare from '../../utils/WXshare';

const Item = List.Item;
const Brief = Item.Brief;

class ColumnDetail extends Component {
  state = {
    column:{},
    column_list:[],
    subscribed: false
  }

  componentDidMount() {
    const id = this.props.params.id;

    loadColumnChannelDto({channelId: id}).then(data => {
      this.setState({ column: data.data.columnChannel.columnChannel, column_list: data.data.columnChannel.columnChannelItemResDtoList });
      WXshare({
        title: data.data.columnChannel.columnChannel.title,
        link: `${API_DOMAIN}?redirect_url=column/${id}`,
        desc: '经英教育',
        imgUrl: `${API_DOMAIN}${data.data.columnChannel.columnChannel.thumbnailUrl}`,
      });
    })

    isSubscribed({channelId: id}).then(data => {
      this.setState({ subscribed: data.message == 'true' ? true : false });
    })


  }

  handleSubscribe = () => {
    const id = this.props.params.id;

    this.state.subscribed ?
      subscribeCancel({channelId: id}).then(data => {
        Toast.success(data.message, 1);
        this.setState({ subscribed: false })
      })
      :
      subscribe({channelId: id}).then(data => {
        Toast.success(data.message, 1);
        this.setState({ subscribed: true })
      })
  }

  render() {
    console.log(this.state);

    const { presenterName, favoriteCount, learningCount, indroduction, title } = this.state.column;
    const tabs = [
      { title: <Badge>目录</Badge> },
      { title: <Badge>详情</Badge> }
    ]

    const CountExtra = ({remianCount, totalCount}) => <span>剩余次数
      <span style={{color:'#2fc2ba'}}>
        {remianCount}/{totalCount}
      </span>
    </span>

    return (
      <div>
        <img src={`${IMG_DOMAIN}${this.state.column.coverUrl}`} />

        <List>
          <Item
            multipleLine
            extra={<Button size='small' type={ this.state.subscribed ? 'default' : 'primary'} onClick={this.handleSubscribe}>{this.state.subscribed ? '取消订阅' : '订阅'}</Button>}
          >
            {title}
            <Brief>
              主讲人：{presenterName} <br />
              学习({learningCount})  收藏({favoriteCount})<br />
            </Brief>
          </Item>
        </List>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onTabClick={this.handleChangeTab}
        >
          <div>
            <List>
              {
                this.state.column_list.length ?
                  this.state.column_list.map((item) => {

                    if (item.columnChannelOrderItems) {
                      return (
                        <Item
                          wrap
                          thumb = {<img style={{ width:'60px', height:'60px' }} src={`${IMG_DOMAIN}${item.columnChannelItem.thumbnailUrl}`}/>}
                          key={item.columnChannelItem.id}
                          extra={<span style={{ color: '#2fc2ba'}}>已购买</span>}
                          arrow="horizontal"
                          onClick={()=>hashHistory.push({
                            pathname: `/columnitem/${item.columnChannelItem.id}`,
                            query: {
                              columnName: title,
                            }
                          })}
                        >
                          {item.columnChannelItem.title} <Brief>{item.columnChannelItem.hint}</Brief>
                        </Item>
                      );
                    } else {
                      return <Item
                        thumb = {<img style={{ width:'60px', height:'60px' }} src={`${IMG_DOMAIN}${item.columnChannelItem.thumbnailUrl}`}/>}
                        key={item.columnChannelItem.id}
                        arrow="horizontal"
                        wrap
                        extra={<span style={{ color: '#red'}}> ¥{item.columnChannelItem.price/100}/<span style={{color: 'red'}}>¥{item.columnChannelItem.priceVIP/100}</span></span>}
                        onClick={()=>hashHistory.push({
                          pathname: `/columnitem/${item.columnChannelItem.id}`,
                          query:{columnName: title}
                        })}
                        >
                        {item.columnChannelItem.title} <Brief>{item.columnChannelItem.hint}</Brief>
                      </Item>;
                    }
                  })
                  :
                  null
              }
            </List>
          </div>
          <div>
            <WhiteSpace />
            <div dangerouslySetInnerHTML={{ __html: indroduction }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </div>
        </Tabs>
      </div>
    );
  }
}

export default ColumnDetail;
