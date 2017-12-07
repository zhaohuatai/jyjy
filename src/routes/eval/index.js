import React, { Component } from 'react';
import { WhiteSpace, Carousel } from 'antd-mobile';
import FeaturesBox from '../../components/featuresbox';
import BigDataListPanel from '../../components/bigdata/bigdata/BigDataListPanel'
import { loadEvalCategoryList } from '../../service/eval';
import { loadPubSlideDataSet } from '../../service/slide';
import { API_DOMAIN } from '../../utils/config';

class BigDataIndex extends Component {
  state = {
    features_data:[
      {text:'MBTI职业性格',icon:'icon-dashuju',url:'/eval/mbit'},
      {text:'职业锚测评',icon:'icon-jiangxiang',url:'/eval/career'},
      {text:'霍兰德职业倾向',icon:'icon-tiku',url:'/eval/hollander'},
    ],
    bigdata_data: [],
    slide: []
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <FeaturesBox data={this.state.features_data} columnNum={3}/>
        <WhiteSpace/>
      </div>
    );
  }
}

export default BigDataIndex;
