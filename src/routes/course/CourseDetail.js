import React, { Component } from 'react';
import { Badge, Tabs, List, WhiteSpace, Button, Toast } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { loadServiceCourseDto,
  addPalyRecord,
  loadVideoPalyAuth,
  loadServiceCourseConsultationDataSet,
  createServiceCourseOrder,
  createServiceCourseFavorite
} from '../../service/course';
import Consulation from '../../components/course/Consulation';
import  BuyCourseItem from '../../components/course/BuyCourseItem';
import {IMG_DOMAIN} from "../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceCourse: {},
      serviceCourseItems: [],
      consultation:[],
      cur_courseitem: {
        videoId: null,
        playauth: '',
        courseItemId:'',
        record:true,
      },
      buy_display: false
    };

    this.player = null;
  }


  componentDidMount() {
    const id = this.props.params.id;

    loadServiceCourseDto({ courseId: id }).then((data) => {
      this.setState({
        serviceCourse: data.data.serviceCourseDto.serviceCourse,
        serviceCourseItems: data.data.serviceCourseDto.serviceCourseItemResDtoList,
      });

      this.player = new Aliplayer({
        id: 'Ali_Player', // 容器id
        vid: '',
        width: "100%",       // 播放器宽度
        playauth: '',
        cover: `${IMG_DOMAIN}${data.data.serviceCourseDto.serviceCourse.coverUrl}`,
        autoplay: false,
        rePlay: false,
        skinLayout:[{"name":"H5Loading","align":"cc"},
          {"name":"errorDisplay","align":"tlabs","x":0,"y":0},
          {"name":"infoDisplay","align":"cc"},
          {"name":"controlBar","align":"blabs","x":0,"y":0,"children":[{"name":"progress","align":"tlabs","x":0,"y":0},
          {"name":"timeDisplay","align":"tl","x":10,"y":24}]}]
      });

      this.player.on('play',()=>{

        if(this.state.cur_courseitem.courseItemId){
          // 请求减少播放记录次数
          this.player.play();
        } else {
          this.player.pause();
          Toast.info('请选择章节',2);
        }
      })
    });


  }

  handlePlay = (courseItemId) => {
    loadVideoPalyAuth({courseItemId}).then(data => {
      this.setState({
        cur_courseitem: {
          ...this.state.cur_courseitem,
          videoId: data.data.aliVideoPlayAuthDto.videoId,
          playauth: data.data.aliVideoPlayAuthDto.playAuth,
          courseItemId: courseItemId
        }
      },()=>{
        //console.log(this.state.cur_courseitem);
        if (this.player){
          this.player.dispose();
        }

        this.player = new Aliplayer({
          id: 'Ali_Player', // 容器id
          vid: data.data.aliVideoPlayAuthDto.videoId,
          width: "100%",       // 播放器宽度
          playauth: data.data.aliVideoPlayAuthDto.playAuth,
          autoplay: false,
          rePlay: false,
        });

        this.player.on('play',()=>{
          console.log('addrecord');
          if(this.state.cur_courseitem.record){
            addPalyRecord({ courseItemId: this.state.cur_courseitem.courseItemId }).then(data => {
              this.setState({
                cur_courseitem: {
                  ...this.state.cur_courseitem,
                  record: false
                }
              })
            })
          }
        })
      });
    })
  }

  handleChangeTab = (tab, index) => {
    if (index === 2) {
      loadServiceCourseConsultationDataSet({courseId: this.state.serviceCourse.id}).then(data => {
        this.setState({
          consultation: data.data.dataSet.rows
        })
      });
    }
  }

  handleAddFavorite = () => {
    createServiceCourseFavorite({courseId: this.props.params.id}).then(data => {
      Toast.success('收藏成功',1)
    })
  }

  handleBuy = (value) => {
    console.log(value);
    createServiceCourseOrder({courseItemIds: value}).then(data => {
      Toast.success('下单成功',2);
      this.setState({pub_show: false});
      hashHistory.push('/my/order')
    })
  }

  render() {
    const {
      introduction, name, freePay, presenterName, price, priceVIP, remark, tryVideoUrl, learningCount, favoriteCount, consultationCount,coverUrl
    } = this.state.serviceCourse;
    const tabs = [
      { title: <Badge>目录</Badge> },
      { title: <Badge>详情</Badge> },
      { title: <Badge>评论({consultationCount})</Badge> },
    ];

    const CountExtra = ({remianCount, totalCount}) => <span>剩余次数
      <span style={{color:'#2fc2ba'}}>
        {remianCount}/{totalCount}
      </span>
    </span>

    return (
      <div>
        <div  className="prism-player" id='Ali_Player' />

        <List>
          <Item
            multipleLine
            extra={<Button onClick={() => hashHistory.push(`/course/playorder/${this.props.params.id}`)} size='small' type='primary' style={{ width: '100px', marginLeft: '20px' }}>按节购买</Button>}
          >
            {name}
            <Brief>
              主讲人：{presenterName} <br />
              学习({learningCount})  <span style={{color: '#2fc2ba'}} onClick={this.handleAddFavorite}>添加收藏</span><br />
            </Brief>
          </Item>
        </List>
        <Tabs
          tabs={tabs}
          initialPage={0}
          onTabClick={this.handleChangeTab}
        >
          <div>
            <List>
              {
                this.state.serviceCourseItems.length ?
                this.state.serviceCourseItems.map((item) => {

                  if (item.serviceCourseItem.freePay === 0) {
                    return (
                      <Item
                        key={item.serviceCourseItem.id}
                        extra='免费播放'
                        arrow="horizontal"
                        onClick={()=>this.handlePlay(item.serviceCourseItem.id)}
                      >
                        {item.serviceCourseItem.name}
                        <Brief>
                          免费
                        </Brief>
                      </Item>
                    );
                  }

                  if (item.serviceCourseOrderItemsCount) {
                    return (
                      <Item
                        key={item.serviceCourseItem.id}
                        extra={<CountExtra remianCount={item.serviceCourseOrderItemsCount.remainCount} totalCount={item.serviceCourseOrderItemsCount.totleCount} />}
                        arrow="horizontal"
                        onClick={()=>this.handlePlay(item.serviceCourseItem.id)}
                      >
                        {item.serviceCourseItem.name}
                        <Brief>
                          ¥{item.serviceCourseItem.price/100} / VIP价 <span style={{color: 'red'}}>¥{item.serviceCourseItem.priceVIP/100}</span>
                        </Brief>
                      </Item>
                    );
                  } else {
                    return <Item
                      key={item.serviceCourseItem.id}
                      extra='未购买' arrow="horizontal"
                      onClick={()=>Toast.info('请先购买', 2)}
                    >
                      {item.serviceCourseItem.name}
                      <Brief>
                        ¥{item.serviceCourseItem.price/100} / VIP价 <span style={{color: 'red'}}>¥{item.serviceCourseItem.priceVIP/100}</span>
                      </Brief>
                      </Item>;
                  }
                })
                  :
                  null
              }
            </List>
          </div>
          <div>

            <WhiteSpace />
            <div dangerouslySetInnerHTML={{ __html: introduction }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </div>
          <div>
            <Consulation data={this.state.consultation} id={this.state.serviceCourse.id}/>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default CourseDetail;
