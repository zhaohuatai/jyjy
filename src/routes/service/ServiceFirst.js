import React, { Component } from 'react';
import { loadSecondDtoByFirstCateId } from '../../service/service';
import { WhiteSpace, List } from 'antd-mobile';
import ServiceListItem from '../../components/service/ServiceListItem';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class ServiceFirst extends Component {
  state = {
    serviceEntranceList: [],
    serviceEntranceCateSecondList: []
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadSecondDtoByFirstCateId({ firstCateId: id }).then((data) => {
      this.setState({
        serviceEntranceList: data.data.entranceCateSecondDto.serviceEntranceList,
        serviceEntranceCateSecondList: data.data.entranceCateSecondDto.serviceEntranceCateSecondList,
      });
    });
  }

  render() {
    return (
      <div>
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
        <WhiteSpace/>
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
