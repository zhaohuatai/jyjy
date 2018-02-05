import React, { Component } from 'react';
import { WhiteSpace } from 'antd-mobile';
import FeaturesBox from '../../components/featuresbox';
import BigDataListPanel from '../../components/bigdata/bigdata/BigDataListPanel'
import { loadEnrollAutoBigdataDataSet } from '../../service/bigdata';
import { loadPubSlideDataSet } from '../../service/slide';
import Slide from '../../components/debris/Slide';
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

class BigDataIndex extends Component {
  state = {
    features_data:[
      {text:'自招大数据',icon:'icon-dashuju',url:'/bigdata/bigdata'},
      {text:'奖项评测',icon:'icon-jiangxiang',url:'/bigdata/award'},
      {text:'自招题库',icon:'icon-tiku',url:'/bigdata/question'},
      {text:'招生简章',icon:'icon-tiaokuan',url:'/bigdata/brochure'}
    ],
    bigdata_data: [],
    slide: []
  }

  componentDidMount() {
    loadEnrollAutoBigdataDataSet().then(data => {
      this.setState({ bigdata_data: data.data.dataSet.rows })
    })

    loadPubSlideDataSet({rows: 100, locationCode: 'ZZ'}).then(data => {
      this.setState({ slide: data.data.dataSet.rows });
    })

    WXshare({
      title: '经英教育-自招大数据',
      link: `${API_DOMAIN}?redirect_url=bigdata`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  render() {
    return (
      <div>
        <Slide data={this.state.slide}/>
        <FeaturesBox data={this.state.features_data} columnNum={4}/>
        <WhiteSpace/>
        <BigDataListPanel list_data={this.state.bigdata_data}  />
      </div>
    );
  }
}

export default BigDataIndex;
