import React, { Component } from 'react';
import { Carousel, List, WhiteSpace } from 'antd-mobile';
import { loadServiceCourseCategoryDataSet } from '../../service/course';
import ColumnListItem from '../../components/column/ColumnListItem';
import ListPanel from '../../components/listpanel/ListPanel';
import CourseListItem from '../../components/course/CourseListItem';

class Course extends Component {
  state = {
    data: ['', '', ''],
    categories: [],
    columns:[
      {id:1, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',title:'大作文',view:128, volume: 12, price: 1200},
    ],
    course:[
      {id:1, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',title:'hahah',view:128},
      {id:2, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',title:'hahah',view:128},
      {id:3, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',title:'hahah',view:128}      
    ],
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);

    loadServiceCourseCategoryDataSet({rows: 100}).then(data => {
      this.setState({categories: data.data.dataSet.rows})
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
          {this.state.data.map(ii => (
            <a href="http://www.baidu.com" key={ii}>
              <img
                src={`https://zos.alipayobjects.com/rmsportal/${ii}.png`}
                alt=""
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

        <WhiteSpace size="sm" />
        <ListPanel list_data={this.state.course} title='面试课程列表' title_icon='icon-kecheng' renderItem={CourseListItem}/>

        <WhiteSpace size="sm" />
        <ListPanel list_data={this.state.course} title='笔试课程列表' title_icon='icon-kecheng' renderItem={CourseListItem}/>

        <WhiteSpace size="sm" />
        <ListPanel list_data={this.state.course} title='国内名校升学' title_icon='icon-kecheng' renderItem={CourseListItem}/>

        <WhiteSpace size="sm" />
        <ListPanel list_data={this.state.course} title='国内名校升学' title_icon='icon-kecheng' renderItem={CourseListItem}/>

      </div>
    );
  }
}

export default Course;
