import React, {Component} from 'react';
import {WhiteSpace, List} from 'antd-mobile';
import {hashHistory} from 'react-router';
import CategoryGrid from '../../components/eval/CategoryGrid';
import {loadEvalCategoryList, loadEvalSubjectRecordDataSet} from '../../service/eval';

const Item = List.Item;
const Brief = Item.Brief;

class BigDataIndex extends Component {
  state = {
    features_data: [
      {text: 'MBTI职业性格', icon: 'icon-dashuju', url: '/eval/mbit', id: 1},
      {text: '职业锚测评', icon: 'icon-jiangxiang', url: '/eval/career', id: 3},
      {text: '霍兰德职业倾向', icon: 'icon-tiku', url: '/eval/hollander', id: 2},
    ],
    records: []
  }

  componentDidMount() {
    loadEvalSubjectRecordDataSet({rows: 1000}).then(data => {
      this.setState({records: data.data.dataSet.rows});
    })
  }

  render() {
    return (
      <div>
        <CategoryGrid data={this.state.features_data} columnNum={3}/>
        <WhiteSpace/>
        <List renderHeader={() => '我的答题记录'}>
          {
            this.state.records.length > 0 ?
              this.state.records.map(item => {
                switch (item.categoryId) {
                  case 1 :
                    return <Item
                      key={item.id}
                      onClick={() => hashHistory.push({
                        pathname: '/eval/mbit',
                        query: {
                          categoryId: item.categoryId,
                          categoryName: item.categoryName,
                          recordId: item.id
                        }
                      })} extra={<span>未完成</span>} arrow='horizontal'>{item.categoryName}
                      <Brief>{item.createTime}</Brief></Item>;

                  default:
                    return;
                }
              })
              :
              <Item>没有记录</Item>
          }
        </List>
      </div>
    );
  }
}

export default BigDataIndex;
