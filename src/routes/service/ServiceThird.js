import React, { Component } from 'react';
import { loadByThirdCateId } from '../../service/service';
import { WhiteSpace, List } from 'antd-mobile';
import ServiceListItem from '../../components/service/ServiceListItem';
import { hashHistory } from 'react-router';
import ListHeader from "../../components/listpanel/ListHeader";
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class ServiceThird extends Component {
  state = {
    serviceEntranceList: [],
    serviceEntranceCateThird: []
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadByThirdCateId({ thirdCateId: id }).then((data) => {
      this.setState({
        serviceEntranceList: data.data.entranceCateThirdDto.serviceEntranceList,
        serviceEntranceCateThird: data.data.entranceCateThirdDto.serviceEntranceCateThird,
      });
    });

    WXshare({
      title: '经英教育-捷径升学',
      link: `${API_DOMAIN}#/service/third/${id}`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  render() {
    return (
      <div>
        <ListHeader title={this.state.serviceEntranceCateThird.name} icon='icon-kecheng' />
        {
          this.state.serviceEntranceList.map(item => (
            <ServiceListItem data={item} key={item.id} />
          ))
        }
      </div>
    );
  }
}

export default ServiceThird;
