import React, { Component } from 'react';
import { Badge, Tabs, List, WhiteSpace, Button, Toast } from 'antd-mobile';
import { hashHistory } from 'react-router';
import VideoPlay from '../../components/aliplayer/VideoPlay';
import { loadServiceCourseDto,
  addPalyRecord,
  loadVideoPalyAuth,
  loadServiceCourseConsultationDataSet,
  createServiceCourseOrder,
  createServiceCourseFavorite
} from '../../service/course';
import Consulation from '../../components/course/Consulation';
import  BuyCourseItem from '../../components/course/BuyCourseItem';

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
        videoId: '1',
        playauth: '1',
        courseItemId:'1',
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
    });

    this.player = new Aliplayer({
      id: 'Ali_Player', // 容器id
      vid: '',
      width: "100%",       // 播放器宽度
      playauth: '',
      autoplay: false,
      rePlay: false,
    });

    this.player.on('play',()=>{
      if(this.state.cur_courseitem.courseItemId){
        this.player.play();
      } else {
        this.player.pause();
        Toast.info('请选择章节');
      }
    })
  }

  handlePlay = (courseItemId) => {
    loadVideoPalyAuth({courseItemId}).then(data => {
      this.setState({
        cur_courseitem: {
          ...this.state.cur_courseitem,
          videoId: data.data.aliVedioPalyAuthDto.videoId,
          playauth: data.data.aliVedioPalyAuthDto.playAuth,
          courseItemId: courseItemId
        }
      },()=>{
        //console.log(this.state.cur_courseitem);
        if (this.player){
          this.player.dispose();
        }

        this.player = new Aliplayer({
          id: 'Ali_Player', // 容器id
          vid: data.data.aliVedioPalyAuthDto.videoId,
          width: "100%",       // 播放器宽度
          playauth: data.data.aliVedioPalyAuthDto.playAuth,
          autoplay: false,
          rePlay: false
        });

        this.player.on('play',()=>{
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
    if (index == 2) {
      loadServiceCourseConsultationDataSet({courseId: this.state.serviceCourse.id}).then(data => {
        this.setState({
          consultation: data.data.dataSet.rows
        })
      });
    }
  }

  handleAddFavorite = () => {
    createServiceCourseFavorite({courseId: this.props.params.id}).then(data => {
      Toast.success('收藏成功')
    })
  }

  handleBuy = (value) => {
    console.log(value);
    createServiceCourseOrder({courseItemIds: value}).then(data => {
      Toast.success('下单成功');
      this.setState({pub_show: false});
      hashHistory.push('/my/order')
    })
  }

  render() {
    const {
      introduction, name, freePay, presenterName, price, priceVIP, remark, tryVideoUrl, learningCount, favoriteCount, consultationCount,
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
        {/*<VideoPlay
          id={this.state.cur_courseitem.videoId}
          vid={this.state.cur_courseitem.videoId}
          playauth={this.state.cur_courseitem.playauth}
        />*/}

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
                        extra={<CountExtra remianCount={1} totalCount={10} />}
                        arrow="horizontal"
                        onClick={()=>this.handlePlay(item.serviceCourseItem.id)}
                      >
                        {item.serviceCourseItem.name}
                        <Brief>
                          ¥{item.serviceCourseItem.price} / VIP价 <span style={{color: 'red'}}>¥{item.serviceCourseItem.priceVIP}</span>
                        </Brief>
                      </Item>
                    );
                  } else {
                    return <Item
                      key={item.serviceCourseItem.id}
                      extra='未购买' arrow="horizontal">
                      {item.serviceCourseItem.name}
                      <Brief>
                        ¥{item.serviceCourseItem.price} / VIP价 <span style={{color: 'red'}}>¥{item.serviceCourseItem.priceVIP}</span>
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
            <Consulation data={this.state.consultation}/>
          </div>
        </Tabs>

        <BuyCourseItem
          data={this.state.serviceCourseItems}
          display={this.state.buy_display}
          onCancle={()=>this.setState({buy_display:false})}
          onPay={(value) => this.handleBuy(value)}
        />
      </div>
    );
  }
}

export default CourseDetail;
