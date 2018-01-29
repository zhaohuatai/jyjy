import React, { Component } from 'react';
import { List, Accordion, WhiteSpace } from 'antd-mobile';
import { loadDataCareer } from '../../service/career';
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class CareerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      career: {
        back: '',
        categoryId: 1,
        categoryName: '',
        claim: '',
        course: '',
        createTime: '',
        definition: '',
        duty: '',
        fore: '',
        id: 1,
        intro: '',
        isEnabled: '',
        local: '',
        money: '',
        moral: '',
        name: '',
        qualify: '',
        recordTime: 0,
        remark: '',
        skill: '',
        status: 1,
        tools: '',
        updateTime: '',
      },
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadDataCareer({ id }).then((data) => {
      this.setState({ career: data.data.dataCareer });

      WXshare({
        title: `职业库-${data.data.dataCareer.name}`,
        link: `${API_DOMAIN}#/career/${id}`,
        desc: '经英教育',
        imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
      });
    });
  }

  render() {
    return (
      <div>
        <Item multipleLine>
          {this.state.career.name}
          <Brief>
            分类：{this.state.career.categoryName} <br />
          </Brief>
        </Item>
        <WhiteSpace />
        <Accordion>
          <Accordion.Panel header="简介" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.intro }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="职业定义" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.definition }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="任务职责" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.duty }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="知识背景" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.back }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="大学课程" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.course }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="职业技能" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.skill }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="从业资格" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.qualify }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="常用工具" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.tools }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="薪酬待遇" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.money }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="工作场所" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.local }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="发展前景" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.fore }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="职业道德" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.moral }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
          <Accordion.Panel header="招聘要求" className="pad">
            <div dangerouslySetInnerHTML={{ __html: this.state.career.claim }} style={{ backgroundColor: '#fff', padding: '15px' }} />
          </Accordion.Panel>
        </Accordion>
        <WhiteSpace />
      </div>
    );
  }
}

export default CareerDetail;
