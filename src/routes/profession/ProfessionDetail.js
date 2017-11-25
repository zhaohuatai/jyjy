import React, { Component } from 'react';
import { loadDataProfession } from '../../service/profession';
import { List } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class ProfessionDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profession: {
        "categoryId": 1,
        "categoryName": "哲学类（0101）",
        "createTime": "2017-11-08 09:48:55",
        "degree": "哲学学士",
        "detail": "专业培养目标：本专业培养具有一定马克思主义哲学理论素养和系统的专业基础知识，有进一步培养潜质的哲学专门人才，以及能在国家机关、文教事业、新闻出版、企业等部门从事实际工作的应用型、复合型高级专门人才。\n\n专业培养要求：本专业学生主要学习马克思主义的基本理论与历史，以及社会科学、自然科学和思维科学的基础知识，受到中西方哲学的基本理论和发展线索的系统教育，以及创造性思维的培养和业务能力的训练。\n\n毕业生应获得以下几方面的知识和能力：\n1.比较系统地掌握马克思主义哲学、中国哲学和西方哲学的理论和历史；\n2.具有一定的社会科学、人文科学、自然科学、思维科学的相关知识；\n3.掌握哲学学科的基本研究方法、治学方法和相应的社会调查能力；\n4.了解国内外哲学界最重要的理论前沿和发展动态；\n5.了解国内外最重大的实践问题和发展动态；\n6.具有分析和解决社会现实问题的初步能力。\n\n主干学科：哲学\n\n主要课程：哲学概论、马克思主义哲学原理、中国哲学史、西方哲学史、科学技术哲学、伦理学、宗教学、美学、逻辑学、心理学、中外哲学原著导读等。\n\n主要实践性教学环节：包括社会实习、社会调查、社会公益活动等，一般安排10周左右。",
        "id": 1,
        "isEnabled": "",
        "offer": "中国人民大学\n北京大学\n中山大学\n武汉大学\n复旦大学",
        "profession": "哲学",
        "professionCode": "010101",
        "recordTime": 1510192669219,
        "remark": "",
        "revisedYears": "四年",
        "salary": "￥7910",
        "status": 1,
        "subjectId": 1,
        "subjectName": "哲学（01）",
        "undergradPro": "",
        "updateTime": ""
      },
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadDataProfession({ id }).then( data => {
      this.setState({ news: data.data.pubNews });
    });
  }

  render() {
    return (
      <div style={{ marginBottom: '54px' }}>
        <Item multipleLine>
          {this.state.profession.profession}
          <Brief>
            分类：{this.state.profession.subjectName}-{this.state.profession.categoryName} <br />
            授予学位：{this.state.profession.degree} <br />
            修业年限：{this.state.profession.revisedYears} <br />
            毕业5年薪酬：{this.state.profession.salary} <br />
            开设院校：{this.state.profession.offer} <br />
          </Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: this.state.profession.detail }} style={{ backgroundColor: '#fff', padding: '15px' }} />
      </div>
    );
  }
}

export default ProfessionDetail;
