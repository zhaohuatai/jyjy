import React, { Component } from 'react';
import { loadColumnChannelDto } from '../../service/column';
import {IMG_DOMAIN} from "../../utils/config";
import { List, Tabs, Button, Badge, WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class ColumnDetail extends Component {
  state = {
    column:{},
    column_list:[]
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadColumnChannelDto({channelId: id}).then(data => {
      this.setState({ column: data.data.columnChannel.columnChannel, column_list: data.data.columnChannel.columnChannelItemResDtoList })
    })
  }

  render() {
    console.log(this.state);

    const { presenterName, favoriteCount, learningCount, indroduction, title } = this.state.column;
    const tabs = [
      { title: <Badge>目录</Badge> },
      { title: <Badge>详情</Badge> }
    ]
    return (
      <div>
        <img src={`${IMG_DOMAIN}${this.state.column.coverUrl}`} />

        <List>
          <Item
            multipleLine
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
                          thumb = {<img style={{ width:'60px', height:'60px' }} src={item.columnChannelItem.coverUrl}/>}
                          key={item.columnChannelItem.id}
                          extra={<CountExtra remianCount={1} totalCount={10} />}
                          arrow="horizontal"
                          onClick={()=>this.handlePlay(item.columnChannelItem.id)}
                        >
                          {item.columnChannelItem.title} <Brief>{item.columnChannelItem.hint}</Brief>
                        </Item>
                      );
                    } else {
                      return <Item
                        thumb = {<img style={{ width:'60px', height:'60px' }} src={item.columnChannelItem.coverUrl}/>}
                        key={item.columnChannelItem.id}
                        arrow="horizontal"
                        extra={<span>未购买 ¥{item.columnChannelItem.price}/<span style={{color: 'red'}}>¥{item.columnChannelItem.priceVIP}</span></span>}
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
