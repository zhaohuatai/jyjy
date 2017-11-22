import React, { Component } from 'react';
import {loadPubPartnerDataSet} from '../../service/partner';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

import { loadMemberTeacherDataSet } from '../../service/expert';
import { loadPubNewsDataSet } from '../../service/news';
import { loadPubSlideDataSet } from '../../service/slide';
import { loadTopServiceCourse } from '../../service/course';

import FeaturesBox from '../../components/featuresbox';
import HeadLines from '../../components/headlines/HeadLines';
import ListPanel from '../../components/listpanel/ListPanel';
import ArticleListItem from '../../components/article/ArticleListItem';
import ExpertListPanel from '../../components/expert/ExpertListPanel';
import PartnerListPanel from '../../components/partner/PartnerListPanel';
import CourseListPanel from '../../components/course/CourseListPanel';

import {API_DOMAIN} from "../../utils/config";

class Index extends Component {
  state = {
    initialHeight: 176,
    top_news:[{id: 1, title: '出状元啦', url: '/column'},{id: 2, title: '出状元啦', url: '/column'},{id: 3, title: '出状元啦', url: '/column'}],
    course:[],
    features_data:[
      {text:'名校库',icon:'icon-xuexiao',url:'/school'},
      {text:'专业库',icon:'icon-zhuanye',url:'/profession'},
      {text:'职业库',icon:'icon-zhiyeziliao',url:'/career'},
      {text:'自招大数据',icon:'icon--zhaoshengtongji',url:'/4'},
      {text:'会员专享',icon:'icon-huiyuan',url:'/memberexclusive'},
      {text:'智能评测',icon:'icon-cepingxueyuan',url:'/'},
      {text:'省控线',icon:'icon-tongji',url:'/provinceline'},
      {text:'大事记',icon:'icon-biji',url:'/event'},
      {text:'加入社群',icon:'icon-qunliao',url:'/join'},
      {text:'自主招生问答',icon:'icon-wenda-copy',url:'/'},
    ],
    expert:[],
    partner:[],
    slide:[]

  }

  componentDidMount(){
    loadPubNewsDataSet({isTop: 1, rows: 5}).then(data => {
      this.setState({top_news: data.data.dataSet.rows});
    })

    loadMemberTeacherDataSet({rows: 100}).then(data => {
      this.setState({ expert: data.data.dataSet.rows });
    })

    loadPubPartnerDataSet({rows: 100}).then(data => {
      this.setState({ partner: data.data.dataSet.rows });
    })

    loadPubSlideDataSet({rows: 100}).then(data => {
      this.setState({ slide: data.data.dataSet.rows });
    })

    loadTopServiceCourse({rows: 100}).then(data => {
      this.setState({ course: data.data.dataSet.rows });
    })
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
                {this.state.slide.map(ii => (
                  <a href="http://www.baidu.com" key={ii} style={hProp}>
                    <img
                      src={`${API_DOMAIN}${ii.imgUrl}`}
                      alt={ii.title}
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
              
              <HeadLines data={this.state.top_news}/>

              <WhiteSpace size="sm" />
              <CourseListPanel list_data={this.state.course}  title='经英课堂' title_icon='icon-kecheng' />

              <WhiteSpace size="sm" />
              <ListPanel list_data={this.state.course} title='服务' title_icon='icon-kecheng' renderItem={ArticleListItem}/>

              <WhiteSpace size="sm" />
              <ExpertListPanel list_data={this.state.expert} title='专家团队' title_icon='icon-kecheng' renderItem={ArticleListItem}/>
            
              <WhiteSpace size="sm" />
              <PartnerListPanel list_data={this.state.partner} title='合作伙伴' title_icon='icon-kecheng' renderItem={ArticleListItem}/>
            </div>
        );
    }
}

export default Index;
