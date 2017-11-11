import React, { Component } from 'react';
import { List, Accordion, WhiteSpace } from 'antd-mobile';
import { loadDataCareer } from '../../service/career';

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
            <div>
              <pre style={{ padding: '10px', margin: '10px', width: '100px' }}>
                {this.state.career.intro}
              </pre>
            </div>

          </Accordion.Panel>
          <Accordion.Panel header="职业定义" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.definition}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="任务职责" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.duty}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="知识背景" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.back}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="大学课程" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.course}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="职业技能" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.skill}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="从业资格" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.qualify}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="常用工具" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.tools}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="薪酬待遇" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.money}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="工作场所" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.local}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="发展前景" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.fore}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="职业道德" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.moral}
            </div>
          </Accordion.Panel>
          <Accordion.Panel header="招聘要求" className="pad">
            <div style={{ padding: '10px' }}>
              {this.state.career.claim}
            </div>
          </Accordion.Panel>
        </Accordion>
        <WhiteSpace />
      </div>
    );
  }
}

export default CareerDetail;
