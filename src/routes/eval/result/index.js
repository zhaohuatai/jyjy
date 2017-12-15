import React, { Component } from 'react';
import { loadRecordResultDtoByRecordId } from '../../../service/eval';
import { List } from 'antd-mobile';
import Intro from "../../../components/debris/Intro";
import { RadarChart, PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, Legend, ResponsiveContainer } from 'recharts';

const Item = List.Item;
const Brief = Item.Brief;

class EvalResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        evalSubjectRecord: {},
        evalSubjectRecordResultConclusion: {},
        evalSubjectRecordResultList: []
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
    const { evalSubjectRecordResultConclusion, evalSubjectRecord, evalSubjectRecordResultList } = this.state.result;

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

        <ResponsiveContainer width='100%' height={300}>
          <RadarChart outerRadius={90} width={330} height={250} data={evalSubjectRecordResultList}>
            <PolarGrid />
            <PolarAngleAxis dataKey="resultTypeChName" />
            <PolarRadiusAxis angle={2} domain={[0, 10]} />
            <Radar name="霍兰德职业倾向" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
        <List>
        {
          evalSubjectRecordResultList.map(item => {
            return <Item extra={item.score} key={item.id}
            >{item.resultTypeChName}-{item.resultTypeCode}</Item>
          })
        }
        </List>
      </div>
    );
  }
}

export default EvalResult;
