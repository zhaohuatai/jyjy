import React, { Component } from 'react';
import { Accordion, List } from 'antd-mobile';
import ExpertListItem from '../../../components/expert/ExpertListItem';
import {loadMemberTeacherFavoriteDataSet} from '../../../service/expert';
import {loadServiceCourseFaverateDataSet} from '../../../service/course';
import {loadColumnChannelFavoriteDataSet} from '../../../service/column';
import CourseListItem from "../../../components/course/CourseListItem";
import ColumnListItem from "../../../components/column/ColumnListItem";

class MyFavorite extends Component {
  state = {
    teacher: [],
    courses: [],
    column: []
  }
  componentDidMount() {
    loadMemberTeacherFavoriteDataSet().then(data => {
      this.setState({ teacher: data.data.dataSet.rows });
    });

    loadServiceCourseFaverateDataSet().then(data => {
      this.setState({ courses: data.data.dataSet.rows });
    });

    loadColumnChannelFavoriteDataSet().then(data => {
      this.setState({ column: data.data.dataSet.rows });
    });
  }

  render() {
    return (
      <div>
        <Accordion defaultActiveKey='0' className="my-accordion" onChange={this.onChange}>
          <Accordion.Panel header="收藏的专家">
            <List>
              {
                this.state.teacher.map(item => {
                  return <ExpertListItem data={item.memberTeacher} key={item.memberTeacherFavorite.id}/>
                })
              }
            </List>
          </Accordion.Panel>
        </Accordion>
        <Accordion  className="my-accordion" onChange={this.onChange}>
          <Accordion.Panel header="收藏的课程">
            <List className="my-list">
              {
                this.state.courses.map(item => {
                  return <CourseListItem data={item.serviceCourse} key={item.serviceCourse.id}/>
                })
              }
            </List>
          </Accordion.Panel>
        </Accordion>
        <Accordion  className="my-accordion" onChange={this.onChange}>
          <Accordion.Panel header="收藏的专栏">
            <List className="my-list">
              {
                this.state.column.map(item => {
                  return <ColumnListItem data={item.columnChannel} key={item.columnChannel.id}/>
                })
              }
            </List>
          </Accordion.Panel>
        </Accordion>
        <Accordion  className="my-accordion" onChange={this.onChange}>
          <Accordion.Panel header="收藏的学校">
            <List className="my-list">

            </List>
          </Accordion.Panel>
        </Accordion>
      </div>
    );
  }
}

export default MyFavorite;
