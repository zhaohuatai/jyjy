import React, { Component } from 'react';
import { List, WhiteSpace } from 'antd-mobile';
import { loadEnrollAutoBigdataDataSet } from '../../../service/bigdata';
import BigDataListItem from '../../../components/bigdata/bigdata/BigDataListItem';
import LoadMore from '../../../components/loadmore/LoadMore';

const Item = List.Item;
const Brief = Item.Brief;

class BigData extends Component {
  state = {
    bigdata_data: [],
    cur_page: 1,
    total: 0 ,
    loadmore_disable: false
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh = (params) =>{
    loadEnrollAutoBigdataDataSet(params).then((data) => {
      if( data.data.dataSet.total > data.data.dataSet.rows.length ){
        this.setState({ bigdata_data: data.data.dataSet.rows, loadmore_disable: false });
      }else{
        this.setState({ bigdata_data: data.data.dataSet.rows, loadmore_disable: true });
      }
    }).catch(err => {
      console.log(err);
    });
  }


  loadMore = () => {
    let cur_page = ++this.state.cur_page;
    loadEnrollAutoBigdataDataSet({ page: cur_page }).then((data) => {
      let temp_list = this.state.bigdata_data;
      temp_list = temp_list.concat(data.data.dataSet.rows);

      if( data.data.dataSet.total > temp_list.length ){
        this.setState({ bigdata_data: temp_list, cur_page, loadmore_disable: false });
      }else{
        this.setState({ bigdata_data: temp_list, cur_page, loadmore_disable: true });
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
            自招大数据
          </Item>
        </List>

        <WhiteSpace/>
        <List>
          {
            this.state.bigdata_data.map(item => {
              return <BigDataListItem data={item} key={item.id} />
            })
          }
        </List>
        <LoadMore disable={this.state.loadmore_disable} onClick={this.loadMore}/>
      </div>
    );
  }
}

export default BigData;
