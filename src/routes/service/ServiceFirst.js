import React, { Component } from 'react';
import { loadSecondDtoByFirstCateId } from '../../service/service';
import { WhiteSpace, List } from 'antd-mobile';
import ServiceListItem from '../../components/service/ServiceListItem';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class ServiceFirst extends Component {
  state = {
    entranceCateSecondDtoList: []
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadSecondDtoByFirstCateId({firstCateId: id}).then((data) => {
      this.setState({
        entranceCateSecondDtoList: data.data.entranceCateSecondDtoList
      });
    });
  }

  render() {
    return (
      <div>
        <List>
          {
            this.state.entranceCateSecondDtoList.map(item => {
              return (
                <Item
                  onClick={() => hashHistory.push(`/service/second/${item.serviceEntranceCateSecond.id}`)}
                  arrow="horizontal"
                  key={item.serviceEntranceCateSecond.id}
                >
                  {item.serviceEntranceCateSecond.name}
                </Item>
              )
            })
          }
        </List>
        <WhiteSpace/>
        {
          this.state.entranceCateSecondDtoList.map(item => (
            <ServiceListItem data={item} key={item.id} />
          ))
        }
      </div>
    );
  }
}

export default ServiceFirst;
