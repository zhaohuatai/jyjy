import React, { Component } from 'react';
import { loadPubNewsDataSet, loadPubNewsCategoryDataSet } from '../../service/news';
import { Tabs, List, PullToRefresh } from 'antd-mobile';
import LoadMore from '../../components/loadmore/LoadMore';
import { hashHistory } from 'react-router';
import { API_DOMAIN } from '../../utils/config';
import WXshare from '../../utils/WXshare';
const Item = List.Item;
const Brief = Item.Brief;

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cur_page: 1,
      tabs: [
          { title: 'First Tab', sub: '1' },
          { title: 'Second Tab', sub: '2' },
          { title: 'Third Tab', sub: '3' },
      ],
      cur_news: [],
      cur_tab_id: 0,
      total: 0 ,
      loadmore_disable: false
    }
  }

  componentDidMount() {
    loadPubNewsCategoryDataSet({}).then((data) => {
      this.setState( {
        tabs: data.data.dataSet.rows,
        cur_tab_id: data.data.dataSet.rows[0].id,
        total: data.data.dataSet.total
       })
      this.handleRefresh({ categoryId: data.data.dataSet.rows[0].id });
    });

    WXshare({
      title: '经英教育-新闻',
      link: `${API_DOMAIN}?redirect_url=news`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  renderContent = tab =>
  (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
    <p>Content of {tab.title}</p>
  </div>);

  handleChangeTab = (tab, index) => {
    this.setState({cur_page: 1, });
    this.handleRefresh({ categoryId: tab.id, page: 1, });
  }

  handleRefresh = (params) =>{
    loadPubNewsDataSet(params).then((data) => {
      if( data.data.dataSet.total > data.data.dataSet.rows.length ){
        this.setState({ cur_news: data.data.dataSet.rows, loadmore_disable: false });
      }else{
        this.setState({ cur_news: data.data.dataSet.rows, loadmore_disable: true });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  loadMore = () => {
    let cur_page = ++this.state.cur_page;
    loadPubNewsDataSet({ page: cur_page, categoryId: this.state.cur_tab_id}).then((data) => {
      let temp_list = this.state.cur_news;
      temp_list = temp_list.concat(data.data.dataSet.rows);

      if( data.data.dataSet.total > temp_list.length ){
        this.setState({ cur_news: temp_list, cur_page, loadmore_disable: false });
      }else{
        this.setState({ cur_news: temp_list, cur_page, loadmore_disable: true });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <Tabs
        tabs={this.state.tabs}
        onChange={this.handleChangeTab}
        renderTab={tab => tab.name}
      >
        <List style={{marginBottom:'54px'}}>
          {
            this.state.cur_news.map(item => {
              return (
                <Item key={item.id} arrow="horizontal" multipleLine  wrap onClick={() => hashHistory.push(`/news/${item.id}`)}>
                  {item.title} <Brief>{item.addtime}</Brief>
                </Item>
              )
            })
          }
          <LoadMore disable={this.state.loadmore_disable} onClick={this.loadMore}/>
        </List>
      </Tabs>
    );
  }
}

export default News;
