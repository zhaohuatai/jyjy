import React, { Component } from 'react';
import { loadServiceEntranceDataSet } from '../../service/service';
import { WhiteSpace, List } from 'antd-mobile';
import ServiceListItem from '../../components/service/ServiceListItem';

class EntranceDetail extends Component {
  state = {
    entrance: []
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadServiceEntranceDataSet({ catethirdId: id }).then((data) => {
      this.setState({ entrance: data.data.dataSet.rows });
    });
  }

  render() {
    return (
      <div>
        <List>
          <List.Item>{this.props.location.query.categoryName}</List.Item>
        </List>
        <WhiteSpace/>
        {
          this.state.entrance.map(item => {
            return <ServiceListItem key={item.id} data={item} />
          })
        }
      </div>
    );
  }
}

export default EntranceDetail;
