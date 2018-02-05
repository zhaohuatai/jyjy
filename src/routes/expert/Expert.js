import React, { Component } from 'react';
import { loadMemberTeacherDataSet } from '../../service/expert';
import { List } from 'antd-mobile';
import ExpertListItem from '../../components/expert/ExpertListItem';
import LoadMore from '../../components/loadmore/LoadMore';
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

class Expert extends Component {
  state = {
    loadmore_disable: false,
    experts: [],
    cur_page:1,
  }

  componentDidMount(){
    loadMemberTeacherDataSet({}).then(data => {
      if(data.data.dataSet.rows.length <= data.data.dataSet.total)
        this.setState({ experts: data.data.dataSet.rows, loadmore_disable: true});
      else
        this.setState({ experts: data.data.dataSet.rows});
    });

    WXshare({
      title: '经英教育',
      link: `${API_DOMAIN}?redirect_url=expert`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  loadMore = () => {
    let cur_page = ++this.state.cur_page;
    loadMemberTeacherDataSet({ page: cur_page }).then((data) => {
      let temp_list = this.state.experts;
      temp_list = temp_list.concat(data.data.dataSet.rows);

      if( data.data.dataSet.total > temp_list.length ){
        this.setState({ experts: temp_list, cur_page, loadmore_disable: false });
      }else{
        this.setState({ experts: temp_list, cur_page, loadmore_disable: true });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div>
        <List>
          {
            this.state.experts.map(item => {
              return <ExpertListItem key={item.id} data={item} />
            })
          }
          <LoadMore disable={this.state.loadmore_disable} onClick={this.loadMore}/>
        </List>
      </div>
    );
  }
}

export default Expert;
