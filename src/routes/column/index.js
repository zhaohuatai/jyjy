import React, {Component} from 'react';
import {Carousel, List} from 'antd-mobile';
import {Link} from 'react-router';
import {loadTopColumnChannelList, loadColumnChannelDataSet} from '../../service/column';

import ColumnListItem from '../../components/column/ColumnListItem';
import {IMG_DOMAIN, API_DOMAIN} from "../../utils/config";
import WXshare from '../../utils/WXshare';

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

    WXshare({
      title: '经英教育-专栏',
      link: `${API_DOMAIN}?redirect_url=column`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
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
