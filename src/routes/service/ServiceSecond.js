import React, { Component } from 'react';
import { loadCateThirdDtoBySecondCateId } from '../../service/service';
import { WhiteSpace, List } from 'antd-mobile';
import ServiceListItem from '../../components/service/ServiceListItem';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class ServiceSecond extends Component {
  state = {
    serviceEntranceList: [],
    serviceEntranceCateThirdList: []
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadCateThirdDtoBySecondCateId({ secondCateId: id }).then((data) => {
      this.setState({
        serviceEntranceList: data.data.entranceCateThirdDto.serviceEntranceList,
        serviceEntranceCateThirdList: data.data.entranceCateThirdDto.serviceEntranceCateThirdList,
      });
    });
  }

  render() {
    return (
      <div>
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

export default ServiceSecond;
