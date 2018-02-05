import React, { Component } from 'react';
import { Carousel, List, Accordion, WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { API_DOMAIN, IMG_DOMAIN } from '../../utils/config';
import ServiceListPanel from '../../components/service/ServiceListPanel';
import { loadCateFirstDtoList } from '../../service/service';
import WXshare from '../../utils/WXshare';

const Item = List.Item;
const Brief = Item.Brief;

class Service extends Component {
  state = {
    entrance_top: [],
    entranceCatefirstDtoList: []
  };

  componentDidMount() {
    loadCateFirstDtoList().then((data) => {
      this.setState({
        entranceCatefirstDtoList: data.data.entranceCatefirstDtoList
      });
    });

    WXshare({
      title: '经英教育-捷径升学',
      link: `${API_DOMAIN}?redirect_url=service`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
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
          {this.state.entranceCatefirstDtoList.map(item => (
            <div key={item.id} style={{height: '176px'}} onClick={()=>hashHistory.push(`/service/${item.id}`)}>
              <img
                  src={`${IMG_DOMAIN}${item.coverUrl}`}
                  alt={item.title}
                  style={{width: '100%', height:'176px'}}
                />
            </div>
          ))}
        </Carousel>
        <ServiceListPanel list_data={this.state.entranceCatefirstDtoList}/>
      </div>
    );
  }
}


export default Service;
