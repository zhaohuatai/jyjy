import React, { Component } from 'react';
import { loadPubNewsDataSet, loadPubNewsCategoryDataSet } from '../../service/news';
import { Tabs, List, PullToRefresh, Button } from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_page: 1,
      tabs: [],
      cur_news: [],
      cur_tab_id: 0
    }
  }
  

  componentDidMount() {
    loadPubNewsCategoryDataSet({}).then((data) => {
      console.log(data.data.dataSet.rows[0].id);
      this.setState( {tabs: data.data.dataSet.rows, cur_tab_id: data.data.dataSet.rows[0].id })
      this.handleRefresh({ categoryId: data.data.dataSet.rows[0].id, rows: 1 });
    });
  }

  renderContent = tab =>
  (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
    <p>Content of {tab.title}</p>
  </div>);

  handleChangeTab = (tab, index) => {
    this.setState({cur_page: 1, });
    this.handleRefresh({ categoryId: tab.id, page: 1, rows: 1 });
  }

  handleRefresh = (params) =>{
    loadPubNewsDataSet(params).then((data) => {
      this.setState({ cur_news: data.data.dataSet.rows });
    }).catch(err => {
      console.log(err);
    });
  }

  loadMore = () => {
    let cur_page = ++this.state.cur_page;
    loadPubNewsDataSet({ page: cur_page, rows: 1, categoryId: this.state.cur_tab_id}).then((data) => {
      let temp_list = this.state.cur_news;
      temp_list = temp_list.concat(data.data.dataSet.rows);
      this.setState({ cur_news: temp_list, cur_page });
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <Tabs
        tabs={this.state.tabs}
        onChange={this.handleChangeTab}
        renderTab={tab => <span key={tab.id}>{tab.name}</span>}
      >
        <List style={{marginBottom:'54px'}}>
          {
            this.state.cur_news.map(item => {
              return (
                <Item key={item.id} arrow="horizontal" multipleLine onClick={() => {}}>
                  {item.title} <Brief>{item.addtime}</Brief>
                </Item>
              )
            })
          }
          <Button onClick={this.loadMore}>加载更多</Button>
        </List>
      </Tabs>
    );
  }
}

export default News;
