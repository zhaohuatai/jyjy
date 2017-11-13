import React, { Component } from 'react';
import { Badge, Tabs, List, WhiteSpace } from 'antd-mobile';
import VideoPlay from '../../components/aliplayer/VideoPlay';
import { loadServiceCourse } from '../../service/course';

const Item = List.Item;
const Brief = Item.Brief;

class CourseDetail extends Component {
  constructor(props){
    super(props)
    this.state={
      course:{}
    }
  }

  componentDidMount() {
    const id = this.props.params.id;

    loadServiceCourse({id}).then(data => {
      this.setState({ course: data.data.serviceCourse });
    })
  }

  render() {
    const tabs = [
      { title: <Badge>目录</Badge> },
      { title: <Badge>详情</Badge> },
      { title: <Badge>评论</Badge> }
    ];

    return (
      <div>
        <VideoPlay id='aliPlayer_course' videoId='909916fdf41044478e57e07682060f58' />
        <Tabs tabs={tabs} initialPage={0}>
          <div>
            <List>
              <Item extra="播放" arrow="horizontal" onClick={() => {}}>选择题解题技巧01</Item>
              <Item extra="播放" arrow="horizontal" onClick={() => {}}>选择题解题技巧01</Item>
              <Item extra="播放" arrow="horizontal" onClick={() => {}}>选择题解题技巧01</Item>
              <Item extra="播放" arrow="horizontal" onClick={() => {}}>选择题解题技巧01</Item>
              <Item extra="播放" arrow="horizontal" onClick={() => {}}>选择题解题技巧01</Item>
            </List>
          </div>
          <div>
            <Item multipleLine>
            选择题解题技巧  <Brief>学习（1237）</Brief>
            </Item>
            <WhiteSpace />
            <div dangerouslySetInnerHTML={{__html: '<h1>详情</h1>'}} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </div>
          <div>
            <Item multipleLine platform="android" extra="10:30" align="top" thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png" multipleLine>
              李华 <Brief>老师讲得非常帮，谢谢老师，老师讲得非常帮，谢谢老师<br />老师讲得非常帮，谢谢老师</Brief>
            </Item>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default CourseDetail;
