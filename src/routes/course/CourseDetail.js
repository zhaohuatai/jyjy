import React, { Component } from 'react';
import { Badge, Tabs, List, WhiteSpace, Button } from 'antd-mobile';
import VideoPlay from '../../components/aliplayer/VideoPlay';
import { loadServiceCourseDto, addPalyRecord, loadVideoPalyAuth } from '../../service/course';

const Item = List.Item;
const Brief = Item.Brief;

class CourseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      serviceCourse: {},
      serviceCourseItems: [],
      cur_courseitem: {
        videoId: '',
        playauth: '',
        courseItemId:'',
        record:true,
      }
    };

    this.player = null;
  }


  componentDidMount() {
    const id = this.props.params.id;

    loadServiceCourseDto({ courseId: id }).then((data) => {
      this.setState({
        serviceCourse: data.data.serviceCourseDto.serviceCourse,
        serviceCourseItems: data.data.serviceCourseDto.serviceCourseItemCountResDtoList,
      });
    });
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
        if (this.player){
          this.player.dispose();
        }

        this.player = new Aliplayer({
          id: 'Ali_Player', // 容器id
          vid: data.data.aliVedioPalyAuthDto.videoId,
          width: "100%",       // 播放器宽度
          playauth: data.data.aliVedioPalyAuthDto.playAuth,
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
        {/*
        <VideoPlay
          id="aliPlayer_course"
          vid={this.state.cur_courseitem.videoId}
          playauth={this.state.cur_courseitem.playauth}
        />
        */}

        <div  className="prism-player" id='Ali_Player' />

        <List>
          <Item
            multipleLine
            extra={<Button size='small' type='primary' style={{ width: '80px', marginLeft: '30px' }}>购买</Button>}
          >
            {name}
            <Brief>
              主讲人：{presenterName} <br />
              学习({learningCount})  收藏({favoriteCount})<br />
            </Brief>
          </Item>
        </List>
        <Tabs tabs={tabs} initialPage={0}>
          <div>
            <List>
              {
                this.state.serviceCourseItems.length ?
                this.state.serviceCourseItems.map((item) => {

                  if (item.serviceCourseOrderItemsCount) {
                    return (
                      <Item
                        key={item.serviceCourseItem.id}
                        extra={<CountExtra remianCount={1} totalCount={10} />}
                        arrow="horizontal"
                        onClick={()=>this.handlePlay(item.serviceCourseItem.id)}
                      >
                        {item.serviceCourseItem.name}
                      </Item>
                    );
                  } else {
                    return <Item key={item.serviceCourseItem.id} extra={<span>未购买 ¥{item.serviceCourseItem.price}/<span style={{color: 'red'}}>¥{item.serviceCourseItem.priceVIP}</span></span>} arrow="horizontal">{item.serviceCourseItem.name}</Item>;
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
            <Item multipleLine platform="android" extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png">
              李华 <Brief>老师讲得非常帮，谢谢老师，老师讲得非常帮，谢谢老师<br />老师讲得非常帮，谢谢老师</Brief>
            </Item>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default CourseDetail;
