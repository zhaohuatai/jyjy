import { loadWXConfig } from '../service/user';
import { API_DOMAIN } from './config';

export default function WXshare(shareconfig) {
  loadWXConfig({ urlx: API_DOMAIN }).then((data) => {
    if (data.statusCode === 200) {
      const option = data.data.WXConfig;
      option.jsApiList = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'];
      option.debug = false;
      wx.config(option);

      wx.ready(function () {
        wx.onMenuShareTimeline(shareconfig);
        wx.onMenuShareAppMessage(shareconfig);
        wx.onMenuShareQQ(shareconfig);
      });
    }
  })
}
