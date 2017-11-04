import React, { Component } from 'react';
import {loadCaseSuccessDataSet} from '../../service/cases';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

import FeaturesBox from '../../components/featuresbox';

class Index extends Component {
  state = {
    data: ['', '', ''],
    initialHeight: 176,
    features_data:[
      {text:'名校库',icon:'icon-xuexiao',url:'/1'},
      {text:'专业库',icon:'icon-zhuanye',url:'/2'},
      {text:'职业库',icon:'icon-zhiyeziliao',url:'/3'},
      {text:'自招大数据',icon:'icon--zhaoshengtongji',url:'/4'},
      {text:'会员专享',icon:'icon-huiyuan',url:'/'},
      {text:'智能评测',icon:'icon-cepingxueyuan',url:'/'},
      {text:'省控线',icon:'icon-tongji',url:'/'},
      {text:'大事记',icon:'icon-biji',url:'/'},
      {text:'加入社群',icon:'icon-qunliao',url:'/'},
    ]
  }

  componentDidMount(){
    loadCaseSuccessDataSet({},data=>{
      console.log(data)
    })
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
    render() {
      const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
        return (
            <div>
              <Carousel
                className="my-carousel"
                autoplay={true}
                infinite
                selectedIndex={1}
                swipeSpeed={35}
              >
                {this.state.data.map(ii => (
                  <a href="http://www.baidu.com" key={ii} style={hProp}>
                    <img
                      src={`https://zos.alipayobjects.com/rmsportal/${ii}.png`}
                      alt=""
                      onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({
                          initialHeight: null,
                        });
                      }}
                    />
                  </a>
                ))}
              </Carousel>

              <FeaturesBox data={this.state.features_data}/>
            </div>
        );
    }
}

export default Index;
