import React, { Component } from 'react';
import { WhiteSpace } from 'antd-mobile';
import FeaturesBox from '../../components/featuresbox';
import BigDataListPanel from '../../components/bigdata/bigdata/BigDataListPanel'
import { loadEnrollAutoBigdataDataSet } from '../../service/bigdata';

class BigDataIndex extends Component {
  state = {
    features_data:[
      {text:'自招大数据',icon:'icon-xuexiao',url:'/bigdata/bigdata'},
      {text:'奖项评测',icon:'icon-zhuanye',url:'/bigdata/award'},
      {text:'自招题库',icon:'icon-zhiyeziliao',url:'/bigdata/question'},
      {text:'招生简章',icon:'icon--zhaoshengtongji',url:'/'}
    ],
    bigdata_data: []
  }

  componentDidMount() {
    loadEnrollAutoBigdataDataSet().then(data => {
      this.setState({ bigdata_data: data.data.dataSet.rows })
    })
  }

  render() {
    return (
      <div>
        <FeaturesBox data={this.state.features_data} columnNum={4}/>
        <WhiteSpace/>
        <BigDataListPanel list_data={this.state.bigdata_data}  />
      </div>
    );
  }
}

export default BigDataIndex;
