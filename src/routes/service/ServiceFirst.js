import React, { Component } from 'react';
import { loadByFirstCateId } from '../../service/service';
import { WhiteSpace, List } from 'antd-mobile';
import ServiceListItem from '../../components/service/ServiceListItem';
import { hashHistory } from 'react-router';
import ListHeader from "../../components/listpanel/ListHeader";

const Item = List.Item;
const Brief = Item.Brief;

class ServiceFirst extends Component {
  state = {
    entranceCateFirstDto: {},
    serviceEntranceCateSecondList: [],
    serviceEntranceList: [],
    serviceEntranceCateFirst: {}
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
  }

  render() {
    return (
      <div>
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
