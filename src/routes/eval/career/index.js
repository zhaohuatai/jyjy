import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { List, WhiteSpace, Button, WingBlank, Radio, Toast, Modal } from 'antd-mobile';
import {
  loadEvalSubjectRecordItemDtoList,
  createEvalSubjectRecord,
  createEvalSubjectRecordItem,
  loadRecordItemDtoForCate3Sep2,
  createRecordItemForCate3Sep2
} from '../../../service/eval';
import BottomAction from "../../../components/debris/BottomAction";
import SelectStep2 from "../hollander/SelectStep2";

const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;

class MBTI extends Component {
  state = {
    start_btn: false,
    questions: [
      {
        "evalDefineOptionList":[
          {
            "categoryId":1,
            "id":1,
            "isEnabled":"",
            "optionCode":11,
            "optionScore":1,
            "optionTitle":"A",
            "optionValue":"1",
            "recordTime":1513059509380,
            "status":""
          },
          {
            "categoryId":1,
            "id":2,
            "isEnabled":"",
            "optionCode":12,
            "optionScore":1,
            "optionTitle":"B",
            "optionValue":"2",
            "recordTime":1513059509380,
            "status":""
          }
        ],
        "evalSubject":{
          "categoryId":1,
          "createTime":"",
          "id":1,
          "isEnabled":"",
          "recordTime":1513059509380,
          "remark":"",
          "showIndex":1,
          "status":"",
          "title":"当你要在一个星期内完成一个大项目，你在开始的时候会 <br/><br/>  A.把要做的不同工作依次列出，<br/><br/>B.马上动工",
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
    step2:[],
    step2_show: false
  }

  componentDidMount() {
    const categoryName = this.props.location.query.categoryName;

    this.setState({categoryName});

    Modal.alert('开始答题？', categoryName, [
      { text: '取消', onPress: () => hashHistory.push('/eval') },
      { text: '开始', onPress: () => this.handleStart() },
    ])
  }

  handleStart = () => {

    const categoryId = this.props.location.query.categoryId;
    const recordId = this.props.location.query.recordId;
    const finishCount = this.props.location.query.finishCount;

    if(recordId) {
      // 继续答题
      loadEvalSubjectRecordItemDtoList({categoryId, recordId}).then(data => {
        this.setState({ questions: data.data.recordItemDtoList, recordId, cur_index: finishCount})
      });
    } else {
      // 创建新记录
      createEvalSubjectRecord({categoryId}).then(data => {
        this.setState({recordId: data.data.record});
        loadEvalSubjectRecordItemDtoList({categoryId, recordId: data.data.record}).then(data => {
          this.setState({ questions: data.data.recordItemDtoList })
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

    // 提交答案
    createEvalSubjectRecordItem({
      recordId: this.state.recordId,
      categoryId: this.props.location.query.categoryId,
      subjectId: this.state.questions[this.state.cur_index].evalSubject.id,
      optionCode: this.state.cur_select,
      //memberId: 1
    }).then(data=>{
      // 判断是否结束
      if( data.data.isFininshed){
        // 结束
        this.setState({cur_select: null});
        // 请求第二步结果
        loadRecordItemDtoForCate3Sep2({recordId: this.state.recordId}).then(data=>{
          if(data.data.recordItemDtoList.length > 0){
            // 存在多个6分题，需要选择
            this.setState({ step2: data.data.recordItemDtoList, step2_show: true })
          } else {
            // 结束
          }
        })
      } else {
        // 切换下一题
        if(this.state.cur_index < this.state.questions.length-1){
          this.setState({cur_index: ++this.state.cur_index})
        } else {
          Toast.info('没有下一题哦！', 1)
        }
      }
    });
  }

  handlePrev = () => {
    if(this.state.cur_index > 0){
      this.setState({cur_index: --this.state.cur_index})
    } else {
      Toast.info('没有上一题哦！', 1)
    }
  }

  handleUpStep2 = (value) => {
    createRecordItemForCate3Sep2({subjectIds: value, recordId: this.state.recordId}).then(data => {
      Toast.success('评测完成, 请点击记录查看结果');
      this.setState({step2_show: false, step2: []});
      hashHistory.push('/eval')
    })

  }

  render() {
    const { cur_index, questions, cur_select, categoryName } = this.state;

    return (
      <div style={{backgroundColor: '#fff', height: '100%', paddingTop: '20px'}}>
        <h4 style={{ textAlign: 'center', color: '#2fc2ba' }}>{categoryName}</h4>

        <div>
          <WingBlank>
            <div dangerouslySetInnerHTML={{__html: questions[cur_index].evalSubject.title}} />
          </WingBlank>
        </div>

        <WhiteSpace size='xl'/>


        <List renderHeader={() => <div><span>选择答案</span>  <span style={{float: 'right'}}>进度 {cur_index+1}/{this.state.questions.length}</span></div>}>
          {questions[cur_index].evalDefineOptionList.map(i => (
            <RadioItem key={i.id } checked={cur_select === i.optionCode} onChange={() => this.handleSelect(i.optionCode)}>
              {i.optionTitle}
            </RadioItem>
          ))}
        </List>

        <SelectStep2
          data={this.state.step2}
          display={this.state.step2_show}
          onCancle={()=>this.setState({buy_display:false})}
          onPay={(value) => this.handleUpStep2(value)}
        />

        <BottomAction
          buttons={[
            {label: '上一题', action: this.handlePrev, backgroundColor: '#fff', color: '#2fc3ba'},
            {label: '下一题', action: this.handleNext, backgroundColor: '#2fc3ba', color: '#fff' },
          ]}
        />
      </div>
    );
  }
}

export default MBTI;
