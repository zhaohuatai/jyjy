import React, { Component } from 'react';
import { List, WhiteSpace } from 'antd-mobile';
import { loadServiceCourseDataSet } from '../../service/course';
import CourseListItem from '../../components/course/CourseListItem';
import LoadMore from '../../components/loadmore/LoadMore';
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class CourseCat extends Component {
  state = {
    course:[],
    cur_page: 1,
    total: 0 ,
    loadmore_disable: false

  }

  componentDidMount(){
    const id = this.props.params.id;

    this.handleRefresh({ categoryId: id});

    WXshare({
      title: '经英教育',
      link: `${API_DOMAIN}?redirect_url=coursecat/${id}`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });

  }

  handleRefresh = (params) =>{
    loadServiceCourseDataSet(params).then((data) => {
      if( data.data.dataSet.total > data.data.dataSet.rows.length ){
        this.setState({ course: data.data.dataSet.rows, loadmore_disable: false });
      }else{
        this.setState({ course: data.data.dataSet.rows, loadmore_disable: true });
      }
    })
  }

  loadMore = () => {
    let cur_page = ++this.state.cur_page;

    loadServiceCourseDataSet({ page: cur_page, categoryId: this.props.params.id}).then((data) => {
      let temp_list = this.state.course;
      temp_list = temp_list.concat(data.data.dataSet.rows);

      if( data.data.dataSet.total > temp_list.length ){
        this.setState({ course: temp_list, cur_page, loadmore_disable: false });
      }else{
        this.setState({ course: temp_list, cur_page, loadmore_disable: true });
      }
    }).catch(err => {
      console.log(err);
    });

  }

  render() {
    return (
      <div style={{marginBottom:'50px'}}>
        <List>
          <List.Item>{this.props.location.query.categoryName}</List.Item>
        </List>
        <WhiteSpace/>

         <List>
           {
             this.state.course.map(item => {
               return <CourseListItem data={item} key={item.id}/>
             })
           }
           <LoadMore disable={this.state.loadmore_disable} onClick={this.loadMore}/>
         </List>
      </div>
    );
  }
}

export default CourseCat;
