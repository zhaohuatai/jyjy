import React, { Component } from 'react';
import { Carousel, List } from 'antd-mobile';

import ColumnListItem from '../../components/column/ColumnListItem';

class Column extends Component {
  state = {
    data: ['', '', ''],  
    columns:[
      {id:1, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',title:'大作文',view:128, volume: 12, price: 1200},
      {id:2, thumbnail:'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',title:'大作文',view:128, volume: 12, price: 1200},      
    ],  
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
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

        <List>
          {
            this.state.columns.map(item => (
              <ColumnListItem
                key={item.id}
                thumbnail={item.thumbnail}
                title={item.title}
                studying={item.view}
                volume={item.volume}
                price={item.price}
                id={item.id}
              />
            ))
          }
      </List>

      </div>
    );
  }
}

export default Column;
