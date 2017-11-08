import React, { Component } from 'react';
import {loadCaseSuccessDataSet} from '../../service/cases';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

import FeaturesBox from '../../components/featuresbox';
import HeadLines from '../../components/headlines/HeadLines';
import ListPanelWithTab from '../../components/listpanel/ListPanelWithTab';
import ListPanel from '../../components/listpanel/ListPanel';
import ArticleListItem from '../../components/article/ArticleListItem';
import ExpertListPanel from '../../components/expert/ExpertListPanel';
import PartnerListPanel from '../../components/partner/PartnerListPanel';

class Index extends Component {
  state = {
    data: ['', '', ''],
    initialHeight: 176,
    head_lines:[{id: 1, title: '出状元啦', url: '/column'},{id: 2, title: '出状元啦', url: '/column'},{id: 3, title: '出状元啦', url: '/column'}],
    course:[
      {id:1, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',title:'hahah',view:128},
      {id:2, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',title:'hahah',view:128},
      {id:3, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',title:'hahah',view:128}      
    ],
    features_data:[
      {text:'名校库',icon:'icon-xuexiao',url:'/school'},
      {text:'专业库',icon:'icon-zhuanye',url:'/specialty'},
      {text:'职业库',icon:'icon-zhiyeziliao',url:'/profession'},
      {text:'自招大数据',icon:'icon--zhaoshengtongji',url:'/4'},
      {text:'会员专享',icon:'icon-huiyuan',url:'/'},
      {text:'智能评测',icon:'icon-cepingxueyuan',url:'/'},
      {text:'省控线',icon:'icon-tongji',url:'/'},
      {text:'大事记',icon:'icon-biji',url:'/'},
      {text:'加入社群',icon:'icon-qunliao',url:'/'},
    ],
    expert:[
      {id:1, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',name:'hahah',view:128},
      {id:1, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',name:'hahah',view:128},
      {id:1, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',name:'hahah',view:128},      
    ],
    teacher: [
      {
        id: 12,
        member: { profilePicture: 'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png', name: '李老师'}
      },
      {
        id: 11,
        member: { profilePicture: 'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png', name: '李老师'}
      },
      {
        id: 14,
        member: { profilePicture: 'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png', name: '李老师'}
      }
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
            <div style={{marginBottom:'50px'}}>
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
              
              <HeadLines data={this.state.head_lines}/>

              <WhiteSpace size="sm" />
              <ListPanelWithTab list_data={this.state.course} category={['自主招生面试', '自主招生笔试']} title='经英课堂' title_icon='icon-kecheng' />

              <WhiteSpace size="sm" />
              <ListPanel list_data={this.state.course} title='国内名校升学' title_icon='icon-kecheng' renderItem={ArticleListItem}/>

              <WhiteSpace size="sm" />
              <ListPanel list_data={this.state.course} title='国外名校升学' title_icon='icon-kecheng' renderItem={ArticleListItem}/>

              <WhiteSpace size="sm" />
              <ExpertListPanel list_data={this.state.teacher} title='专家团队' title_icon='icon-kecheng' renderItem={ArticleListItem}/>
            
              <WhiteSpace size="sm" />
              <PartnerListPanel list_data={this.state.teacher} title='合作伙伴' title_icon='icon-kecheng' renderItem={ArticleListItem}/>
            </div>
        );
    }
}

export default Index;
