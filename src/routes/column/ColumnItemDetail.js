import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { loadItemResDtoByItemId, createColumnChannelOrder, loadColumnChannelCommentDataSet } from '../../service/column';
import {IMG_DOMAIN, API_DOMAIN} from "../../utils/config";
import { List, Tabs, Button, Badge, WhiteSpace, Toast } from 'antd-mobile';
import Consulation from "../../components/column/Consulation";
import { loadWXConfig, shareColumnChannel } from '../../service/user';

const Item = List.Item;
const Brief = Item.Brief;

class ColumnDetail extends Component {
  state = {
    columnChannelItem:{},
    columnChannel: {
      title: ''
    },
    consultation:[],
    columnChannelOrderItems: null
  }

  componentDidMount() {
    const id = this.props.params.id;

    loadItemResDtoByItemId({itemId:id}).then(data => {
      this.setState({
        columnChannelItem: data.data.itemRes.columnChannelItem,
        columnChannel: data.data.itemRes.columnChannel,
        columnChannelOrderItems: data.data.itemRes.columnChannelOrderItems,
      })
    })

    loadWXConfig({ urlx: API_DOMAIN }).then((data) => {
      if (data.statusCode === 200) {
        const option = data.data.WXConfig;
        option.jsApiList = ['previewImage', 'chooseImage', 'downloadImage', 'uploadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'];
        option.debug = false;
        wx.config(option);

        wx.ready(function () {
          wx.onMenuShareTimeline({
            title: '经英教育-首页', // 分享标题
            link: `${API_DOMAIN}columnitem/${id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: `${API_DOMAIN}static/WechatIMG290.png`, // 分享图标
            success: function () {
              // 用户确认分享后执行的回调函数
              shareColumnChannel({itemId: id}).then(data => {
                Toast.success(data.message);
              })
            }
          });

          wx.onMenuShareAppMessage({
            title: '经英教育-首页', // 分享标题
            desc: '经英教育-专栏', // 分享描述
            link: `${API_DOMAIN}columnitem/${id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: `${API_DOMAIN}/static/WechatIMG290.png`, // 分享图标
            success: function () {
              shareColumnChannel({itemId: id}).then(data => {
                Toast.success(data.message);
              })
            }
          });

          wx.onMenuShareQQ({
            title: '经英教育-首页', // 分享标题
            desc: '经英教育-专栏', // 分享描述
            link: `${API_DOMAIN}columnitem/${id}`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: `${API_DOMAIN}static/WechatIMG290.png`, // 分享图标
            success: function () {
              shareColumnChannel({itemId: id}).then(data => {
                Toast.success(data.message);
              })
            },
          });
        });
      }
    })
  }

  handlePlayOrder = () => {
    hashHistory.push(`/column/playorder/${this.props.params.id}`)
  }

  handleChangeTab = (tab, index) => {
    if (index === 1) {
      loadColumnChannelCommentDataSet({channelItemId: this.props.params.id}).then(data => {
        this.setState({
          consultation: data.data.dataSet.rows
        })
      });
    }
  }

  render() {
    const { content, freePay, commentCount, hint, coverUrl, title, price, priceVIP } = this.state.columnChannelItem;
    const { presenterName } = this.state.columnChannel;
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
        <img src={`${IMG_DOMAIN}${coverUrl}`} style={{height: '176px', width: '100%'}}/>
        <List>
          <Item
            multipleLine
            wrap
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
          {
            this.state.columnChannelOrderItems ? <div dangerouslySetInnerHTML={{ __html: content }} style={{ backgroundColor: '#fff', padding: '15px' }} />
              :
              <div style={{backgroundColor: '#fff', textAlign: 'center', color: '#949494', padding: '10px'}}>
                <Button size='large' type='primary' onClick={this.handlePlayOrder}>立即购买</Button></div>
          }

          <div>
            <Consulation data={this.state.consultation} id={this.props.params.id}/>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default ColumnDetail;
