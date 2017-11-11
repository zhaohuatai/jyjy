import React, { Component } from 'react';
import { List, WhiteSpace, Flex, Tabs } from 'antd-mobile';
import { SCH_BADGE } from '../../utils/config';
import { loadDataUniversity } from '../../service/school';
import NumberInfo from '../../components/school/NumberInfo';
import Intro from '../../components/debris/Intro';
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from 'recharts';

const Item = List.Item;
const Brief = Item.Brief;

class SchoolDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  render() {
    return (
      <div style={{ marginBottom: '40px' }}>
        <Item
          thumb={<img style={{ width: '60px', height: '60px' }} src={`${SCH_BADGE}${this.state.school.badge}`} />}
          multipleLine
        >
          {this.state.school.name}
          <Brief>
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
          <Flex.Item>
            <NumberInfo text={this.state.school.establishTime} name="建校" />
          </Flex.Item>
        </Flex>
        <WhiteSpace />

        <Item multipleLine>
          <Brief>
            层次：{this.state.school.stage} <br />
            隶属：{this.state.school.attached} <br />
            双一流：{this.state.school.firstRate ? '是' : '否' } <br />
            办学类型 ：{this.state.school.type} <br />
            招生办电话：{this.state.school.phone} <br />
            地点：{this.state.school.location} <br />

          </Brief>
        </Item>
        <WhiteSpace />
        <Tabs tabs={[{title: '介绍'}, {title: '录取线'}]} initialPage={1}>
          <div >
            <Intro title="简介" text={this.state.school.introduction} />

            <WhiteSpace />
            <Intro title="师资力量" text={this.state.school.faculty} />

            <WhiteSpace />
            <Intro title="特色专业" text={this.state.school.specialProfession} />
          </div>

          <div>
            <LineChart width={300} height={250} data={this.state.school.scoreLineList}
                       margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="years" />
              <YAxis />
              <Line type="monotone" dataKey="lowest" stroke="#8884d8" />
              <Line type="monotone" dataKey="highest" stroke="#82ca9d" />
            </LineChart>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default SchoolDetail;
