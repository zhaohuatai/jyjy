import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { List, WhiteSpace, Tabs } from 'antd-mobile';
import { loadEnrollAutoQuestionCategoryDataSet, loadEnrollAutoQuestionDataSet } from '../../../service/bigdata';
import BigDataListItem from '../../../components/bigdata/bigdata/BigDataListItem';
import LoadMore from '../../../components/loadmore/LoadMore';
import WXshare from '../../../utils/WXshare';
import { API_DOMAIN } from '../../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class Question extends Component {
  state = {
    question_data: [],
    cur_page: 1,
    total: 0 ,
    loadmore_disable: false,
    tabs:[],
    cur_tab_id:1
  }

  componentDidMount() {
    loadEnrollAutoQuestionCategoryDataSet({status: 1}).then(data=>{
      this.setState({
        tabs: data.data.dataSet.rows,
        cur_tab_id: data.data.dataSet.rows[0].id,
        total: data.data.dataSet.total
      })
      this.handleRefresh({categoryId: data.data.dataSet.rows[0].id, status: 1})
    });

    WXshare({
      title: '经英教育-自招题库',
      link: `${API_DOMAIN}?redirect_url=bigdata/question`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  handleRefresh = (params) =>{
    loadEnrollAutoQuestionDataSet(params).then((data) => {
      if( data.data.dataSet.total > data.data.dataSet.rows.length ){
        this.setState({ question_data: data.data.dataSet.rows, loadmore_disable: false });
      }else{
        this.setState({ question_data: data.data.dataSet.rows, loadmore_disable: true });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleChangeTab = (tab, index) => {
    this.setState({cur_page: 1, });
    this.handleRefresh({ categoryId: tab.id, page: 1, });
  }

  loadMore = () => {
    let cur_page = ++this.state.cur_page;
    loadEnrollAutoQuestionDataSet({ page: cur_page }).then((data) => {
      let temp_list = this.state.question_data;
      temp_list = temp_list.concat(data.data.dataSet.rows);

      if( data.data.dataSet.total > temp_list.length ){
        this.setState({ question_data: temp_list, cur_page, loadmore_disable: false });
      }else{
        this.setState({ question_data: temp_list, cur_page, loadmore_disable: true });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div style={{marginBottom: '54px'}}>
        <List>
          <Item>
            自招题库
          </Item>
        </List>

        <WhiteSpace/>

        <Tabs
          tabs={this.state.tabs}
          onChange={this.handleChangeTab}
          renderTab={tab => <span key={tab.id}>{tab.categoryName}</span>}
        >
          <List style={{marginBottom:'54px'}}>
            <List>
              {
                this.state.question_data.map(item => {
                  return (
                      <Item arrow="horizontal" key={item.id} onClick={()=>hashHistory.push(`/bigdata/question/${item.id}`)}>
                        {item.title} <Brief>浏览({item.browseCount})</Brief>
                      </Item>
                  )
                })
              }
            </List>
            <LoadMore disable={this.state.loadmore_disable} onClick={this.loadMore}/>
          </List>
        </Tabs>
      </div>
    );
  }
}

export default Question;
