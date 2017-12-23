import React, { Component } from 'react';
import { loadRecordResultDtoByRecordId } from '../../../service/eval';
import { List, WhiteSpace } from 'antd-mobile';
import Intro from "../../../components/debris/Intro";
import { IMG_DOMAIN } from '../../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class EvalResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        evalSubjectRecord: {},
        evalSubjectRecordResultConclusion: {},
        evalSubjectRecordResultList: [],
      }
    };
  }

  componentDidMount() {
    const { recordId, categoryId, categoryName } = this.props.location.query;

    loadRecordResultDtoByRecordId({ recordId }).then( data => {
      this.setState({ result: data.data.resultDto });
    });
  }

  render() {
    const { evalSubjectRecordResultConclusion, evalSubjectRecord, evalSubjectRecordResultList, svg } = this.state.result;

    return (
      <div style={{backgroundColor: '#fff' }}>
        <Item
          multipleLine
          wrap
        >
          {evalSubjectRecord.categoryName}-结果  <Brief> 测评时间：{evalSubjectRecord.createTime}</Brief>
        </Item>
        <div dangerouslySetInnerHTML={{ __html: evalSubjectRecordResultConclusion.resultCombinConclusion }} style={{ backgroundColor: '#fff', padding: '15px' }} />
        <div dangerouslySetInnerHTML={{ __html: evalSubjectRecordResultConclusion.resultConclusion }} style={{ backgroundColor: '#fff', padding: '15px' }} />

        {
          evalSubjectRecord.categoryId === 2 ?
            <img src={`${IMG_DOMAIN}${svg}`} style={{ width: '100%' }} />
            :
            null
        }

        <List renderHeader='详细得分'>
        {
          evalSubjectRecordResultList.map(item => {
            return <Item extra={item.score} key={item.id}
            >{item.resultTypeChName}</Item>
          })
        }
        </List>
      </div>
    );
  }
}

export default EvalResult;
