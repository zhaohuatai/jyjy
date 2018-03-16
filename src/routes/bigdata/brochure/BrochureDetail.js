import React, { Component } from 'react';
import { loadEnrollAutoRecruitBrochureDataSet } from '../../../service/bigdata';
import { List, WhiteSpace, Accordion } from 'antd-mobile';
import { loadDataUniversity } from '../../../service/school';
import {API_DOMAIN} from "../../../utils/config";
import WXshare from '../../../utils/WXshare';

const Item = List.Item;
const Brief = Item.Brief;

class BrochureDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brochures: [],
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
      },
    };
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadDataUniversity({ id }).then((data) => {
      this.setState({ school: data.data.dataUniversity });

      WXshare({
        title: `招生简章-${data.data.dataUniversity.name}`,
        desc: '经英教育',
        link: `${API_DOMAIN}?redirect_url=bigdata/brochure/${id}`,
        imgUrl: `${API_DOMAIN}${data.data.dataUniversity.badge}`,
      });
    });

    loadEnrollAutoRecruitBrochureDataSet({ universityId: id }).then((data) => {
      this.setState({ brochures: data.data.dataSet.rows });
    });
  }

  render() {
    return (
      <div>
        <Item
          thumb={<img style={{ width: '60px', height: '60px' }} src={`${API_DOMAIN}${this.state.school.badge}`} />}
          multipleLine
        >
          {this.state.school.name} - 历年招生简章
          <Brief>
            省份：{this.state.school.province}
          </Brief>
        </Item>
        <WhiteSpace />

        <Accordion>
          {
            this.state.brochures.map(item => {
              return (
                <Accordion.Panel header={item.title} key={item.id}>
                  <div style={{ backgroundColor: '#fff', padding: '15px' }} >
                    <div dangerouslySetInnerHTML={{ __html: item.content }} />
                  </div>
                </Accordion.Panel>
              );
            })
          }
        </Accordion>
      </div>
    );
  }
}

export default BrochureDetail;
