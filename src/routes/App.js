import React, { Component } from 'react';
import BottomTab from '../components/layout/BottomTab';
import 'antd-mobile/dist/antd-mobile.css';
import Header from '../components/layout/Header';
import { loadWXConfig } from '../service/user';
import { API_DOMAIN } from '../utils/config';

class App extends Component {
  componentDidMount() {
    loadWXConfig({ urlx: API_DOMAIN }).then((data) => {
      if (data.statusCode === 200) {
        const option = data.data.WXConfig;
        option.jsApiList = ['previewImage', 'chooseImage', 'downloadImage', 'uploadImage', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'];
        option.debug = false;
        wx.config(option);

        wx.ready(function(){
          wx.onMenuShareTimeline({

            title: '首页', // 分享标题

            link: 'http://jywxsitex.sinogood.com/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致

            imgUrl: '', // 分享图标

            success: function () {
              alert('share success');
              // 用户确认分享后执行的回调函数
            },

            cancel: function () {
              alert('share cancle');
              // 用户取消分享后执行的回调函数
            }
          });

        });
      }
    });
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{ marginBottom: '54px' }}>
          {this.props.children}
        </div>
        <BottomTab />
      </div>
    );
  }
}

export default App;
