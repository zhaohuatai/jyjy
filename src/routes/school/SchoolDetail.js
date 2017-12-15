import React, { Component } from 'react';
import { List, WhiteSpace, Flex, Tabs, SegmentedControl, WingBlank, Modal } from 'antd-mobile';
import { SCH_BADGE } from '../../utils/config';
import { loadDataUniversity, loadDataScoreLineDataSet } from '../../service/school';
import NumberInfo from '../../components/school/NumberInfo';
import Intro from '../../components/debris/Intro';
import SchoolLineList from '../../components/school/SchoolLineList';
import { loadDicData } from '../../service/dic';

const Item = List.Item;
const Brief = Item.Brief;

class SchoolDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data_FK: [],
      liberalScienceCode: 0,
      batchCode: 0,
      FK_selectedIndex: 0,
      lines_data:[],
      school: {
        academicianNum: '0',
        academy: '',
        attached: '',
        badge: 'img/badge/北京大学.jpg',
        doctor: '0',
        establishTime: '1970',
        faculty: '',
        firstRate: 1,
        id: 1,
        introduction: '',
        isEnabled: '',
        location: '',
        masterNum: '0',
        name: '',
        phone: '010-00000000',
        province: '',
        rank: ' 全国1 综合1',
        remark: '',
        specialProfession: '',
        stage: '本科',
        studentNum: '0',
        type: '大学',
        updateTime: '',
        scoreLineList: []
      },
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadDataUniversity({ id }).then((data) => {
      this.setState({ school: data.data.dataUniversity });
    });

    loadDicData({ code: 'FK' }).then(data => {
      this.setState({data_FK: data.data.dicData, liberalScienceCode: data.data.dicData[0].itemCode });
    });

    loadDataScoreLineDataSet({
      liberalScienceCode: 0,
      universityId: this.state.school.id
    }).then(data => {
      this.setState({lines_data: data.data.dataSet.rows})
    })
  }

  onChangeFK = (e) => {
    this.setState({ FK_selectedIndex: e.nativeEvent.selectedSegmentIndex}, ()=>{
      this.handleGetLines()
    });
  };

  handleGetLines = () => {
    const { FK_selectedIndex } = this.state;
    loadDataScoreLineDataSet({
      liberalScienceCode: this.state.data_FK[FK_selectedIndex].itemCode,
      universityId: this.state.school.id
    }).then(data => {
      this.setState({lines_data: data.data.dataSet.rows})
    })
  }

  handleCall = () => {
    Modal.alert('拨打', '立即拨打招生电话', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '拨打', onPress: () => console.log('ok') },
    ])
  }

  render() {

    let SegmentedControl_FK = [];
    this.state.data_FK.map(item=>{
      SegmentedControl_FK.push(item.itemValue);
    });

    return (
      <div style={{ marginBottom: '40px' }}>
        <Item
          thumb={<img style={{ width: '60px', height: '60px' }} src={`${SCH_BADGE}${this.state.school.badge}`} />}
          multipleLine
        >
          <span style={{fontSize: '17px'}}>{this.state.school.name}</span>
          <Brief style={{fontSize: '14px'}}>
            排名：{this.state.school.rank}<br />
            省份：{this.state.school.province}
          </Brief>
        </Item>
        <WhiteSpace />

        <Flex style={{ backgroundColor: '#fff' }}>
          <Flex.Item>
            <NumberInfo text={this.state.school.doctor} name="博士点" />
          </Flex.Item>
          <Flex.Item>
            <NumberInfo text={this.state.school.masterNum} name="硕士点" />
          </Flex.Item>
          <Flex.Item>
            <NumberInfo text={this.state.school.academicianNum} name="院士人数" />
          </Flex.Item>
        </Flex>
        <WhiteSpace />

        <Item multipleLine>
          <Brief>
            {this.state.school.stage ? <div>层次：{this.state.school.stage}<br /></div> : null }
            {this.state.school.stage ? <div>隶属：{this.state.school.attached}<br /></div> : null }
            {this.state.school.stage ? <div>双一流：{this.state.school.firstRate ? '是' : '否' }<br /></div> : null }
            {this.state.school.stage ? <div>办学类型：{this.state.school.type}<br /></div> : null }
            {this.state.school.stage ? <div>建校时间：{this.state.school.establishTime}<br /></div> : null }
            {this.state.school.stage ? <div>招生办电话：<span onClick={this.handleCall} style={{color: '#2fc2ba'}}>{this.state.school.phone}</span><br /></div> : null }
            {this.state.school.stage ? <div>地点：{this.state.school.location}<br /></div> : null }
          </Brief>
        </Item>
        <WhiteSpace />
        <Tabs tabs={[{title: '介绍'}, {title: '山东省录取线'}]} initialPage={0}>
          <div >
            <Intro title="简介" text={this.state.school.introduction} />

            <WhiteSpace />
            <Intro title="师资力量" text={this.state.school.faculty} />

            <WhiteSpace />
            <Intro title="特色专业" text={this.state.school.specialProfession} />
          </div>

          <div style={{backgroundColor: '#fff'}}>
            <WingBlank>
              <WhiteSpace />
              <SegmentedControl
                values={SegmentedControl_FK}
                onChange={this.onChangeFK}
                selectedIndex={this.state.FK_selectedIndex}
              />
              <WhiteSpace />
              <SchoolLineList data={this.state.lines_data} />
            </WingBlank>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default SchoolDetail;
