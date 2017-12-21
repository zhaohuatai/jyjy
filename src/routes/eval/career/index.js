import React, {Component} from 'react';
import {hashHistory} from 'react-router';
import {List, WhiteSpace, Flex, WingBlank, Radio, Toast, Modal} from 'antd-mobile';
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
        "evalDefineOptionList": [],
        "evalSubject": {
          "categoryId": 1,
          "createTime": "",
          "id": 1,
          "isEnabled": "",
          "recordTime": 1513059509380,
          "remark": "",
          "showIndex": 1,
          "status": "",
          "title": '<p style="text-indent: 2em; line-height: 1.5em;">\n' +
          '    <span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong><span style="font-family: 楷体, 楷体_GB2312, SimKai; color: rgb(0, 176, 80);">锚</span></strong>，是使船只停泊定位用的铁制器具。职业锚，又称职业系留点（CareerAnchor）。实际就是人们选择和发展自己的职业时所围绕的中心，是指当一个人不得不做出选择的时候，他无论如何都不会放弃的职业中的那种至关重要的东西或价值观。是自我意向的一个习得部分。个人进入早期工作情境后，由习得的实际工作经验所决定，与在经验中自省的动机、价值观、才干相符合，达到自我满足和补偿的一种稳定的职业定位。职业锚强调个人能力、动机和价值观三方面的相互作用与整合。职业锚是个人同工作环境互动作用的产物，在实际工作中是不断调整的。&nbsp;</span>\n' +
          '</p>\n' +
          '<p style="text-indent: 31px; line-height: 1.5em;">\n' +
          '    <span style="font-family: 楷体, 楷体_GB2312, SimKai; color: rgb(0, 176, 80);"><strong><span style="font-family: 楷体, 楷体_GB2312, SimKai; font-size: 16px;">职业锚理论（Career Anchor Theory）</span></strong></span><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong><span style="font-size: 16px;"></span></strong><span style="font-size: 16px;">产生于在职业生涯规划领域具有“教父”级地位的美国麻省理工大学斯隆商学院、美国著名的职业指导专家埃<strong>德加•H•施恩</strong>（Edgar.H.Schein）教授领导的专门研究小组，是对该学院毕业生的职业生涯研究中演绎成的。斯隆管理学院的44名MBA毕业生，自愿形成一个小组接受施恩教授长达12年的职业生涯研究，包括面谈、跟踪调查、公司调查、人才测评、问卷等多种方式，最终分析总结出了职业锚(又称职业定位)理论。</span></span>\n' +
          '</p>\n' +
          '<p style="text-indent: 31px; line-height: 1.5em;">\n' +
          '    <span style="font-family: 楷体, 楷体_GB2312, SimKai; color: rgb(0, 176, 80);"><strong><span style="font-family: 楷体, 楷体_GB2312, SimKai; font-size: 16px;">职业锚问卷（Career Anchor Questionaire）</span></strong></span><span style="font-family: 楷体, 楷体_GB2312, SimKai;"><strong><span style="font-size: 16px;"></span></strong><span style="font-size: 16px;">是国外职业测评运用最广泛、最有效的工具之一。职业锚问卷是一种职业生涯规划咨询、自我了解的工具，能够协助组织或个人进行更理想的职业生涯发展规划。职业锚倾向没有好坏，<strong><span style="font-family: 楷体, 楷体_GB2312, SimKai; font-size: 16px; color: rgb(0, 176, 80);">请根据第一感觉，不假思索迅速答题。</span></strong></span></span>\n' +
          '</p>\n' +
          '<p>\n' +
          '    <br/>\n' +
          '</p>\n',
          "updateTime": ""
        },
        "evalSubjectRecordItem": ""
      },

    ],
    cur_index: 0,
    cur_select: null,
    categoryName: '',
    total: 3,
    recordId: null,
    step2: [],
    step2_show: false
  }

  componentDidMount() {
    const categoryName = this.props.location.query.categoryName;

    this.setState({categoryName});
  }

  handleStart = () => {

    const categoryId = this.props.location.query.categoryId;
    const recordId = this.props.location.query.recordId;
    const finishCount = this.props.location.query.finishCount;

    if (recordId) {
      // 继续答题

      // 判断是否已经完成第一步
      if (finishCount >= 40) {
        // 进入第二步
        loadRecordItemDtoForCate3Sep2({recordId: this.state.recordId}).then(data => {
          if (data.data.recordItemDtoList.length > 0) {
            // 存在多个6分题，需要选择
            this.setState({step2: data.data.recordItemDtoList, step2_show: true, started: true})
          } else {
            Modal.alert('完毕', '返回测评首页产看结果', [
              {text: 'OK', onPress: () => hashHistory.push('/eval')},
            ])
          }
        })
      } else {
        // 继续第一步
        loadEvalSubjectRecordItemDtoList({categoryId, recordId}).then(data => {
          this.setState({questions: data.data.recordItemDtoList, recordId, cur_index: finishCount, started: true})
        });
      }

    } else {
      // 创建新记录
      createEvalSubjectRecord({categoryId}).then(data => {
        this.setState({recordId: data.data.record});
        loadEvalSubjectRecordItemDtoList({categoryId, recordId: data.data.record}).then(data => {
          this.setState({questions: data.data.recordItemDtoList, started: true})
        });
      })
    }
  }

  handleSelect = (optionCode) => {
    console.log('code', optionCode);
    this.setState({cur_select: optionCode});
  }

  handleNext = () => {
    console.log('now', this.state)

    if (!this.state.cur_select) {
      Toast.info('请选择答案', 1);
      return;
    }

    Toast.loading('正在加载', 0);


    // 提交答案
    createEvalSubjectRecordItem({
      recordId: this.state.recordId,
      categoryId: this.props.location.query.categoryId,
      subjectId: this.state.questions[this.state.cur_index].evalSubject.id,
      optionCode: this.state.cur_select,
    }).then(data => {
      this.setState({cur_select: null});

      // 判断是否结束
      if (data.data.isFininshed) {
        // 结束
        this.setState({cur_select: null});
        // 请求第二步结果
        loadRecordItemDtoForCate3Sep2({recordId: this.state.recordId}).then(data => {
          if (data.data.recordItemDtoList.length > 0) {
            // 存在多个6分题，需要选择
            this.setState({step2: data.data.recordItemDtoList, step2_show: true})
          } else {
            Modal.alert('完毕', '返回测评首页产看结果', [
              {text: 'OK', onPress: () => hashHistory.push('/eval')},
            ])
          }
        })
      } else {
        // 切换下一题
        if (this.state.cur_index < this.state.questions.length - 1) {
          this.setState({cur_index: ++this.state.cur_index})
        } else {
          Toast.info('没有下一题哦！', 1)
        }
      }

      Toast.hide();
    });
  }

  handlePrev = () => {
    if (this.state.cur_index > 0) {
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
    const {cur_index, questions, cur_select, categoryName} = this.state;

    return (
      <div style={{backgroundColor: '#fff', height: '100%', paddingTop: '20px', marginBottom: '104px'}}>
        <h4 style={{textAlign: 'center', color: '#2fc2ba'}}>{categoryName}</h4>

        <div>
          <WingBlank>
            <div dangerouslySetInnerHTML={{__html: questions[cur_index].evalSubject.title}}/>
          </WingBlank>
        </div>

        <WhiteSpace size='xl'/>

        {
          this.state.started ?
            <List renderHeader={() => <div><span>选择答案</span> <span
              style={{float: 'right'}}>进度 {parseInt(cur_index, 0) + 1}/{this.state.questions.length}</span></div>}>
              {questions[cur_index].evalDefineOptionList.map(i => (
                <RadioItem key={i.id} checked={cur_select === i.optionCode}
                           onChange={() => this.handleSelect(i.optionCode)}>
                  {i.optionTitle}
                </RadioItem>
              ))}
            </List>
            :
            null
        }

        <SelectStep2
          data={this.state.step2}
          display={this.state.step2_show}
          onCancle={() => this.setState({buy_display: false})}
          onPay={(value) => this.handleUpStep2(value)}
        />

        {
          this.state.started ?
            <BottomAction
              buttons={[
                {label: '上一题', action: this.handlePrev, backgroundColor: '#fff', color: '#2fc3ba'},
                {label: '下一题', action: this.handleNext, backgroundColor: '#2fc3ba', color: '#fff'},
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
