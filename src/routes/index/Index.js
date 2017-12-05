import React, { Component } from 'react';
import {loadPubPartnerDataSet} from '../../service/partner';
import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile';

import { loadMemberTeacherDataSet } from '../../service/expert';
import { loadPubNewsDataSet } from '../../service/news';
import { loadPubSlideDataSet } from '../../service/slide';
import { loadServiceCourseGlobal } from '../../service/course';
import { loadIndexCateDtoList } from '../../service/service';

import FeaturesBox from '../../components/featuresbox';
import HeadLines from '../../components/headlines/HeadLines';
import ArticleListItem from '../../components/article/ArticleListItem';
import ExpertListPanel from '../../components/expert/ExpertListPanel';
import PartnerListPanel from '../../components/partner/PartnerListPanel';
import ServiceListPanel from '../../components/service/ServiceListPanel';

import {API_DOMAIN} from "../../utils/config";
import CourseListPanelWithTab from "../../components/course/CourseListPanelWithTab";

class Index extends Component {
  state = {
    top_news:[],
    course_global:[],
    features_data:[
      {text:'名校库',icon:'icon-xuexiao',url:'/school'},
      {text:'专业库',icon:'icon-zhuanye',url:'/profession'},
      {text:'职业库',icon:'icon-zhiyeziliao',url:'/career'},
      {text:'自招大数据',icon:'icon--zhaoshengtongji',url:'/bigdata'},
      {text:'VIP专享',icon:'icon-huiyuan',url:'/memberexclusive'},
      {text:'智能评测',icon:'icon-cepingxueyuan',url:'/'},
      {text:'省控线',icon:'icon-tongji',url:'/provinceline'},
      {text:'大事记',icon:'icon-biji',url:'/event'},
      {text:'加入社群',icon:'icon-qunliao',url:'/join'},
      {text:'百科问答',icon:'icon-wenda-copy',url:'/interlocution'},
    ],
    expert:[],
    partner:[],
    slide:[],
    service_top: []
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

    loadPubSlideDataSet({rows: 100, locationCode: 'ZZ'}).then(data => {
      this.setState({ slide: data.data.dataSet.rows });
    })

    loadServiceCourseGlobal({rows: 100}).then(data => {
      this.setState({course_global: data.data.resList})
    })

    loadIndexCateDtoList().then(data => {
      this.setState({ service_top: data.data.entranceCatefirstDtoList });
    })
  }
    render() {
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
                  <div key={ii} style={{height: '176px'}}>
                    <img
                      src={`${API_DOMAIN}${ii.imgUrl}`}
                      alt={ii.title}
                      style={{width: '100%', height:'176px'}}
                    />
                  </div>
                ))}
              </Carousel>

              <FeaturesBox data={this.state.features_data} columnNum={5}/>
              
              <HeadLines data={this.state.top_news}/>

              <WhiteSpace size="sm" />
              <CourseListPanelWithTab
                data={this.state.course_global}
                title='经英课堂'
                title_icon='icon-kecheng'
                href='/course'
              />

              <WhiteSpace size="sm" />
              <ServiceListPanel list_data={this.state.service_top}/>

              <ExpertListPanel list_data={this.state.expert} />
            
              <WhiteSpace size="sm" />
              <PartnerListPanel list_data={this.state.partner} title='合作伙伴' title_icon='icon-kecheng' renderItem={ArticleListItem}/>
            </div>
        );
    }
}

export default Index;
