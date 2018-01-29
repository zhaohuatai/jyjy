import React, { Component } from 'react';
import { loadBySecondCateId } from '../../service/service';
import { WhiteSpace, List } from 'antd-mobile';
import ServiceListItem from '../../components/service/ServiceListItem';
import { hashHistory } from 'react-router';
import ListHeader from "../../components/listpanel/ListHeader";
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class ServiceSecond extends Component {
  state = {
    serviceEntranceCateSecond: {},
    serviceEntranceCateThirdList: [],
    serviceEntranceList: [],
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadBySecondCateId({ secondCateId: id }).then((data) => {
      this.setState({
        serviceEntranceCateSecond: data.data.entranceCateSecondDto.serviceEntranceCateSecond,
        serviceEntranceCateThirdList: data.data.entranceCateSecondDto.serviceEntranceCateThirdList,
        serviceEntranceList: data.data.entranceCateSecondDto.serviceEntranceList,
      });

      WXshare({
        title: `捷径升学-${data.data.entranceCateSecondDto.serviceEntranceCateSecond.name}`,
        desc: '经英教育',
        link: `${API_DOMAIN}#/service/second/${id}`,
        imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
      });
    });
  }

  render() {
    return (
      <div>
        <ListHeader title={this.state.serviceEntranceCateSecond.name} icon='icon-kecheng' />

        <List>
          {
            this.state.serviceEntranceCateThirdList.map(item => {
              return (
                <Item
                  onClick={() => hashHistory.push(`/service/third/${item.id}`)}
                  arrow="horizontal"
                  key={item.id}
                >
                  {item.name}
                </Item>
              )
            })
          }
        </List>
        {
          this.state.serviceEntranceList.map(item => (
            <ServiceListItem data={item} key={item.id} />
          ))
        }
      </div>
    );
  }
}

export default ServiceSecond;
