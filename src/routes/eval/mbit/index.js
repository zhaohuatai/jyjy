import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { List, WhiteSpace, Flex, WingBlank, Radio, Toast, Modal } from 'antd-mobile';
import {
  loadEvalSubjectRecordItemDtoList,
  createEvalSubjectRecord,
  createEvalSubjectRecordItem
} from '../../../service/eval';
import BottomAction from "../../../components/debris/BottomAction";
import WXshare from '../../../utils/WXshare';
import { API_DOMAIN } from '../../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

const style = {
  position: 'fixed',
  zIndex: '100',
  bottom: '50px',
  height: '50px',
  lineHeight: '50px',
  width: '100%',
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#2fc3ba',
}

class MBTI extends Component {
  state = {
    started: false,
    start_btn: false,
    questions: [
      {
        "evalDefineOptionList":[],
        "evalSubject":{
          "categoryId":1,
          "createTime":"",
          "id":1,
          "isEnabled":"",
          "recordTime":1513059509380,
          "remark":"",
          "showIndex":1,
          "status":"",
          "title":'<p style="text-indent: 2em; line-height: 1.5em;">\n' +
          '    <span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong><span style="font-family: 楷体, 楷体_GB2312, SimKai; color: rgb(0, 176, 80);"></span></strong></span>\n' +
          '</p>\n' +
          '<p style="line-height: 1.5em;">\n' +
          '    <strong><span style="font-size:16px;line-height:115%;font-family: 华文新魏">MBTI</span></strong><strong><span style="font-size:16px;line-height:115%;font-family:华文新魏">测试前须知</span></strong>\n' +
          '</p>\n' +
          '<p style="text-indent: 28px; line-height: 1.5em;">\n' +
          '    <span style="font-family: 楷体, 楷体_GB2312, SimKai;">1、参加测试的人员请务必诚实、独立地回答问题，只有如此，才能得到有效的结果。</span>\n' +
          '</p>\n' +
          '<p style="text-indent: 28px; line-height: 1.5em;">\n' +
          '    <span style="font-family: 楷体, 楷体_GB2312, SimKai;">2、《性格分析报告》展示的是你的性格倾向，而不是你的知识、技能、经验。</span>\n' +
          '</p>\n' +
          '<p style="text-indent: 28px; line-height: 1.5em;">\n' +
          '    <span style="font-family: 楷体, 楷体_GB2312, SimKai;">3、MBTI提供的性格类型描述仅供测试者确定自己的性格类型之用，性格类型没有好坏，只有不同。每一种性格特征都有其价值和优点，也有缺点和需要注意的地方。清楚地了解自己的性格优劣势，有利于更好地发挥自己的特长，而尽可能的在为人处事中避免自己性格中的劣势，更好地和他人相处，更好地作重要的决策。</span>\n' +
          '</p>\n' +
          '<p style="text-indent: 28px; line-height: 1.5em;">\n' +
          '    <span style="font-family: 楷体, 楷体_GB2312, SimKai;">4、本测试分为四部分，共93题；需时约18分钟。所有题目没有对错之分，请根据自己的实际情况选择。</span>\n' +
          '</p>\n',
          "updateTime":""
        },
        "evalSubjectRecordItem":""
      },

    ],
    cur_index: 0,
    cur_select: null,
    categoryName: '',
    total: 3,
    recordId: null,
  }

  componentDidMount() {
    const categoryName = this.props.location.query.categoryName;
    this.setState({categoryName});

    WXshare({
      title: '经英教育-智能测评-MBIT',
      link: `${API_DOMAIN}?redirect_url=eval/mbit`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  handleStart = () => {

    const categoryId = this.props.location.query.categoryId;
    const recordId = this.props.location.query.recordId;
    const finishCount = this.props.location.query.finishCount;

    if(recordId) {
      loadEvalSubjectRecordItemDtoList({categoryId, recordId}).then(data => {
        this.setState({ questions: data.data.recordItemDtoList, recordId, cur_index: finishCount, started: true})
      });
    } else {
      createEvalSubjectRecord({categoryId}).then(data => {
        this.setState({recordId: data.data.record});
        loadEvalSubjectRecordItemDtoList({categoryId, recordId: data.data.record}).then(data => {
          this.setState({ questions: data.data.recordItemDtoList, started: true })
        });
      })
    }
  }

  handleSelect = (optionCode) => {
    console.log('code',optionCode);
    this.setState({cur_select: optionCode});
  }

  handleNext = () => {
    console.log('now',this.state)

    if(!this.state.cur_select){
      Toast.info('请选择答案', 1);
      return ;
    }

    Toast.loading('正在加载',0);

    // 提交答案
    createEvalSubjectRecordItem({
      recordId: this.state.recordId,
      categoryId: this.props.location.query.categoryId,
      subjectId: this.state.questions[this.state.cur_index].evalSubject.id,
      optionCode: this.state.cur_select,
      //memberId: 1
    }).then(data=>{
      this.setState({cur_select: null});
      console.log(data);
      if(data.data.isFininshed){
        Modal.alert('完毕', '返回测评首页产看结果', [
          { text: 'OK', onPress: () => hashHistory.push('/eval') },
        ])
      }
      // 切换下一题
      if(this.state.cur_index < this.state.questions.length-1){
        this.setState({cur_index: ++this.state.cur_index})
      } else {
        Toast.info('没有下一题哦！', 1)
      }
      Toast.hide();
    });
  }

  handlePrev = () => {
    if(this.state.cur_index > 0){
      this.setState({cur_index: --this.state.cur_index})
    } else {
      Toast.info('没有上一题哦！', 1)
    }
  }

  render() {
    const { cur_index, questions, cur_select, categoryName } = this.state;

    return (
      <div style={{backgroundColor: '#fff', height: '100%', paddingTop: '20px', marginBottom: '104px'}}>
        <h4 style={{ textAlign: 'center', color: '#2fc2ba' }}>{categoryName}</h4>

        <div>
          <WingBlank>
            <div dangerouslySetInnerHTML={{__html: questions[cur_index].evalSubject.title}} />
          </WingBlank>
        </div>

        <WhiteSpace size='xl'/>


        <List renderHeader={() => <div><span>选择答案</span>  <span style={{float: 'right'}}>进度 {parseInt(cur_index, 0) + 1}/{this.state.questions.length}</span></div>}>
          {questions[cur_index].evalDefineOptionList.map(i => (
            <RadioItem key={i.id } checked={cur_select === i.optionCode} onChange={() => this.handleSelect(i.optionCode)}>
              {i.optionTitle}
            </RadioItem>
          ))}
        </List>

        {
          this.state.started ?
            <BottomAction
            buttons={[
              {label: '上一题', action: this.handlePrev, backgroundColor: '#fff', color: '#2fc3ba'},
              {label: '下一题', action: this.handleNext, backgroundColor: '#2fc3ba', color: '#fff' },
            ]}
          />
            :
            <Flex style={style}>
              <Flex.Item onClick={this.handleStart}>
                开始测评
              </Flex.Item>
            </Flex>

        }
      </div>
    );
  }
}

export default MBTI;
