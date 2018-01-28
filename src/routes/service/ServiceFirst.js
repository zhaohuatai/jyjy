import React, { Component } from 'react';
import { loadByFirstCateId } from '../../service/service';
import { loadPubSlideDataSet } from '../../service/slide';
import { WhiteSpace, List } from 'antd-mobile';
import ServiceListItem from '../../components/service/ServiceListItem';
import { hashHistory } from 'react-router';
import ListHeader from "../../components/listpanel/ListHeader";
import Slide from "../../components/debris/Slide";
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

const Item = List.Item;
const Brief = Item.Brief;

class ServiceFirst extends Component {
  state = {
    entranceCateFirstDto: {},
    serviceEntranceCateSecondList: [],
    serviceEntranceList: [],
    serviceEntranceCateFirst: {},
    slide: []
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadByFirstCateId({firstCateId: id}).then((data) => {
      this.setState({
        entranceCateFirstDto: data.data.entranceCateFirstDto.entranceCateFirstDto,
        serviceEntranceList: data.data.entranceCateFirstDto.serviceEntranceList,
        serviceEntranceCateSecondList: data.data.entranceCateFirstDto.serviceEntranceCateSecondList,
        serviceEntranceCateFirst: data.data.entranceCateFirstDto.serviceEntranceCateFirst,
      });
    });
    loadPubSlideDataSet({rows: 100, locationCode: 'FW', status: 1}).then(data => {
      this.setState({ slide: data.data.dataSet.rows });
    })

    WXshare({
      title: '经英教育-捷径升学',
      link: `${API_DOMAIN}#/service/first/${id}`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  render() {
    return (
      <div>
        {
          this.state.slide.length > 0 ? <Slide data={this.state.slide}/> : null

        }
        <ListHeader title={this.state.serviceEntranceCateFirst.name} icon='icon-kecheng' />

        <List>
          {
            this.state.serviceEntranceCateSecondList.map(item => {
              return (
                <Item
                  onClick={() => hashHistory.push(`/service/second/${item.id}`)}
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

export default ServiceFirst;
