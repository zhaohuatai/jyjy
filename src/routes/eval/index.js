import React, {Component} from 'react';
import {WhiteSpace, List} from 'antd-mobile';
import {hashHistory} from 'react-router';
import CategoryGrid from '../../components/eval/CategoryGrid';
import {loadEvalCategoryList, loadEvalSubjectRecordDataSet} from '../../service/eval';
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

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
    });

    WXshare({
      title: '经英教育-智能测评',
      link: `${API_DOMAIN}?redirect_url=eval`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
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
                let pathname = '';
                let count = 0;
                switch (item.categoryId) {
                  case 1 :
                    pathname = '/eval/mbit'; count = 93;
                    break;
                  case 2 :
                    pathname = '/eval/hollander'; count = 60;
                    break;
                  case 3 :
                    pathname = '/eval/career'; count = 40;
                    break;
                  default:
                    pathname = '/eval';
                    break;
                }

                  if(!item.finished){
                    return (
                      <Item
                        key={item.id}
                        onClick={() => hashHistory.push({
                          pathname,
                          query: {
                            categoryId: item.categoryId,
                            categoryName: item.categoryName,
                            recordId: item.id,
                            finishCount: item.finishCount,
                          }
                        })}
                        extra={<span>继续答题({item.finishCount}/{count})</span>}
                        arrow='horizontal'
                      >{item.categoryName}
                        <Brief>{item.createTime}</Brief>
                      </Item>
                    )
                  } else {
                    return (
                      <Item
                        key={item.id}
                        onClick={() => hashHistory.push({
                          pathname:'/eval/result',
                          query: {
                            categoryId: item.categoryId,
                            categoryName: item.categoryName,
                            recordId: item.id,
                            finishCount: item.finishCount,
                          }
                        })}
                        extra={<span style={{color: '#2fc2ba'}}>查看结果</span>}
                        arrow='horizontal'
                      >{item.categoryName}
                        <Brief>{item.createTime}</Brief>
                      </Item>
                      )
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
