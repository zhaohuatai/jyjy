import React, { Component } from 'react';
import { loadEntranceByThirdCateId } from '../../service/service';
import { WhiteSpace, List } from 'antd-mobile';
import ServiceListItem from '../../components/service/ServiceListItem';
import { hashHistory } from 'react-router';

const Item = List.Item;
const Brief = Item.Brief;

class ServiceThird extends Component {
  state = {
    entranceList: [],
    serviceEntranceCateSecondList: []
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadEntranceByThirdCateId({ thirdCateId: id }).then((data) => {
      this.setState({
        entranceList: data.data.entranceList,
      });
    });
  }

  render() {
    return (
      <div>
        {
          this.state.entranceList.map(item => (
            <ServiceListItem data={item} key={item.id} />
          ))
        }
      </div>
    );
  }
}

export default ServiceThird;
