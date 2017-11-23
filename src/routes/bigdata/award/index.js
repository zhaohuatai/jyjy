import React, { Component } from 'react';
import { List, WhiteSpace, Picker } from 'antd-mobile';
import { loadEnrollAutoAwardRecommendDataSet,
  loadEnrollAutoAwardCategoryDataSet,
  loadEnrollautoAwardCompetitionDataSet,
  loadEnrollAutoAwardEvaluationDataSet
} from '../../../service/bigdata';
import BigDataListItem from '../../../components/bigdata/bigdata/BigDataListItem';
import ListHeader from '../../../components/listpanel/ListHeader';
import LoadMore from '../../../components/loadmore/LoadMore';

const Item = List.Item;
const Brief = Item.Brief;

class Award extends Component {
  state = {
    cur_page: 1,
    total: 0 ,
    loadmore_disable: false,
    recommend_data: [],
    category_list: [],
    categoryId: [''],
    competition_list: [],
    competitionId: [''],
    award_list: [],
    awardId: [''],
  }

  componentDidMount() {
    loadEnrollAutoAwardCategoryDataSet().then(data => {
      data.data.dataSet.rows.map(item => {
        item.value = item.id;
        item.label = item.name;
      });
      this.setState({ category_list: data.data.dataSet.rows })
    });
  }

  doSearch= () => {
    const { awardId, categoryId, competitionId} = this.state;

    loadEnrollAutoAwardRecommendDataSet({
      awardId: awardId[0],
      categoryId: categoryId[0],
      competitionId: competitionId[0],
      rows: 1000
    }).then(data => {
      this.setState({ recommend_data: data.data.dataSet.rows })
    });
  }

  handleSelectCategory = (value) => {
    this.setState({
      categoryId: value,
      competitionId: [''],
      awardId: ['']
    });

    this.doSearch();

    loadEnrollautoAwardCompetitionDataSet({ categoryId: value[0] }).then(data => {
      data.data.dataSet.rows.map(item => {
        item.value = item.id;
        item.label = item.competition;
      });
      this.setState({ competition_list: data.data.dataSet.rows })
    });
  }

  handleSelectCompetition = (value) => {
    this.setState({
      competitionId: value,
      awardId: ['']
    });
    this.doSearch();

    loadEnrollAutoAwardEvaluationDataSet({ competitionId: value[0] }).then(data => {
      data.data.dataSet.rows.map(item => {
        item.value = item.id;
        item.label = item.award;
      });
      this.setState({ award_list: data.data.dataSet.rows })
    });
  }

  handleSelectAward = (value) => {
    this.setState({awardId: value}, () => {
      this.doSearch()
    })
  }

  render() {
    const { category_list, competition_list, award_list, awardId, competitionId, categoryId } = this.state;

    return (
      <div style={{marginBottom: '54px'}}>
        <List>
          <Item>
            奖项评测
          </Item>
        </List>

        <WhiteSpace/>

        <List style={{ backgroundColor: 'white' }}>
          <Picker
            extra="请选择"
            data={category_list}
            title="分类"
            cols={1}
            onOk={(value)=>this.handleSelectCategory(value)}
            value={categoryId}
          >
            <List.Item arrow="horizontal">分类</List.Item>
          </Picker>
        </List>
        <List style={{ backgroundColor: 'white' }}>
          <Picker
            extra="请选择"
            data={competition_list}
            title="竞赛"
            cols={1}
            value={competitionId}
            onOk={(value)=>this.handleSelectCompetition(value)}
          >
            <List.Item arrow="horizontal">竞赛</List.Item>
          </Picker>
        </List>
        <List style={{ backgroundColor: 'white' }}>
          <Picker
            extra="请选择"
            data={award_list}
            title="等级"
            cols={1}
            value={awardId}
            onOk={(value)=>this.handleSelectAward(value)}
          >
            <List.Item arrow="horizontal">奖项</List.Item>
          </Picker>
        </List>

        <WhiteSpace/>
        <ListHeader title='能上的大学' icon='icon-wujieguo' />
        <List>
          {
            this.state.recommend_data.map(item => {
              return <Item key={item.id} >{item.university}</Item>
            })
          }
        </List>
      </div>
    );
  }
}

export default Award;
