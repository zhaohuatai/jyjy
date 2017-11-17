import React, { Component } from 'react';
import { loadServiceEntrance } from '../../service/service';
import { WhiteSpace } from 'antd-mobile';
import Intro from '../../components/debris/Intro';

class EntranceDetail extends Component {
  state = {
    entrance: {}
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadServiceEntrance({ id }).then((data) => {
      this.setState({ entrance: data.data.serviceEntrance });
    });
  }

  render() {
    return (
      <div>
        <WhiteSpace />
        <Intro title='详情' text={this.state.entrance.introduction}/>
      </div>
    );
  }
}

export default EntranceDetail;
