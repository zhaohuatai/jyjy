import React, { Component } from 'react';
import { Carousel, List, WhiteSpace } from 'antd-mobile';
import { loadServiceCourseGlobal, loadTopServiceCourse} from '../../service/course';
import ColumnListItem from '../../components/column/ColumnListItem';
import ListPanel from '../../components/listpanel/ListPanel';
import CourseListItem from '../../components/course/CourseListItem';
import CourseListPanel from "../../components/course/CourseListPanel";
import {IMG_DOMAIN} from "../../utils/config";

class Course extends Component {
  state = {
    course_global: [],
    course_top:[],
  }

  componentDidMount(){
    loadTopServiceCourse({rows: 100}).then(data => {
      this.setState({course_top: data.data.topServiceCourseList})
    })

    loadServiceCourseGlobal({rows: 3}).then(data => {
      this.setState({course_global: data.data.resList})
    })
  }

  render() {
    return (
      <div style={{marginBottom:'50px'}}>
        <Carousel
          className="my-carousel"
          autoplay={true}
          infinite
          selectedIndex={1}
          swipeSpeed={35}
        >
          {this.state.course_top.map(item => (
            <a href={`/#/course/${item.id}`} key={item.id}>
              <img
                src={`${IMG_DOMAIN}${item.coverUrl}`}
                alt={item.name}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                    initialHeight: null,
                  });
                }}
              />
            </a>
          ))}
        </Carousel>
        {
          this.state.course_global.map(item => {
            return  <CourseListPanel
              key={item.courseCategory.id}
              data={item.serviceCourseList}
              title={item.courseCategory.categoryName}
              title_icon='icon-kecheng'
              href={
                {pathname: `/coursecat/${item.courseCategory.id}`, query: item.courseCategory}}/>
          })
        }
      </div>
    );
  }
}

export default Course;
