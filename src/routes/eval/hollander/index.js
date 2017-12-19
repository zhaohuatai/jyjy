import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { List, WhiteSpace, Flex, WingBlank, Radio, Toast, Modal } from 'antd-mobile';
import {
  loadEvalSubjectRecordItemDtoList,
  createEvalSubjectRecord,
  createEvalSubjectRecordItem
} from '../../../service/eval';
import BottomAction from "../../../components/debris/BottomAction";

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
          "title":"本测验是由美国著名职业教育专家霍兰德的人才测评理论为基础，结合中国广大学生和工作者的实际而编制。 \n" +
          "根据霍兰德的研究成果和后人的分析论证，按照不同的职业特点和个性特征，一般可以将人分为六类：现实型(R)、探索型(1)、艺术型(A)、社会型(S)、管理型(E)和常规型(C)。这六种类型的人具有不同的典型特征。每种类型的人对相应职业类型感兴趣，人格特征和职业需求进合理搭配的特点。\n" +
          "同时，人们在择业时主要受三个因素的影响：兴趣(你想做什么——兴趣倾向)、能力(你能做什么——个人经历)和人格(你适合做什么——人格倾向)。以此为依据，本套试题由三部分组成：兴趣倾向问卷、个人经历问卷和人格倾向问卷，分别对测评者的兴趣、能力和人格特点进行测评。通过对测评结果的综合分析，可以帮助测评者发现和确定自己的职业兴趣和能力特长，使我们对与自身性格匹配的职业类别、岗位特质有更为明晰的认识，从而在我们就业、升学、进修或职业转向时，做出最佳的选择。\n" +
          "该测评适用于高中毕业生、在读大中专生、应届大中专毕业生，以及已参加工作但渴望转行，需发现和确定自己的职业兴趣和能力特长的人士。\n" +
          "请根据对每一题目的第一印象作答，不必仔细推敲，答案没有好坏、对错之分。具体填写方法是，根据自己的情况每一题回答“是”或“否”\n" +
          "\n",
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
      Toast.info('请选择答案', '1');
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

        {
          this.state.started ?

        <List renderHeader={() => <div><span>选择答案</span>  <span style={{float: 'right'}}>进度 {parseInt(cur_index, 0) + 1}/{this.state.questions.length}</span></div>}>
          {questions[cur_index].evalDefineOptionList.map(i => (
            <RadioItem key={i.id } checked={cur_select === i.optionCode} onChange={() => this.handleSelect(i.optionCode)}>
              {i.optionTitle}
            </RadioItem>
          ))}
        </List>
            :
            null

        }

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
