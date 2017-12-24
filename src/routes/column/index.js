import React, {Component} from 'react';
import {Carousel, List} from 'antd-mobile';
import {Link} from 'react-router';
import {loadTopColumnChannelList, loadColumnChannelDataSet} from '../../service/column';

import ColumnListItem from '../../components/column/ColumnListItem';
import {IMG_DOMAIN} from "../../utils/config";

// TODO: 显示是否有更新

class Column extends Component {
  state = {
    top: [],
    columns: [],
  }

  componentDidMount() {
    loadTopColumnChannelList().then(data => {
      this.setState({top: data.data.dataSet});
    })

    loadColumnChannelDataSet().then(data => {
      this.setState({columns: data.data.dataSet.rows});
    })
  }

  render() {
    return (
      <div style={{marginBottom: '50px'}}>
        <Carousel
          className="my-carousel"
          autoplay={true}
          infinite
          selectedIndex={1}
          swipeSpeed={35}
        >
          {this.state.top.map(item => (
            <Link to={`/column/${item.id}`} key={item.id}>
              <div style={{height: '176px', width: '100%'}}>
                <img
                  src={`${IMG_DOMAIN}${item.coverUrl}`}
                  alt={item.title}
                  style={{height: '176px', width: '100%'}}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({
                      initialHeight: null,
                    });
                  }}
                />
              </div>
            </Link>
          ))}
        </Carousel>

        <List>
          {
            this.state.columns.map(item => (
              <ColumnListItem data={item} key={item.columnChannel.id}/>
            ))
          }
        </List>

      </div>
    );
  }
}

export default Column;
