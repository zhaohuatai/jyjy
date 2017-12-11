import React, { Component } from 'react';
import { loadServiceEntrance, createAppointment } from '../../service/service';
import { WhiteSpace, Modal, Toast } from 'antd-mobile';
import Intro from '../../components/debris/Intro';
import {IMG_DOMAIN} from "../../utils/config";
import BottomAction from "../../components/debris/BottomAction";

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

  handleCreateAppointment = () => {
    Modal.alert('预约', '确定现在预约？', [
      { text: '取消', onPress: () => console.log('cancel') },
      { text: '确定', onPress: () =>     createAppointment({entranceId: this.props.params.id}).then(data=>{
        Toast.success('预约成功');
      }) },
    ])

  }

  render() {
    return (
      <div>
        <img src={`${IMG_DOMAIN}${this.state.entrance.coverUrl}`} style={{height: '176px', width: '100%'}} />
        <WhiteSpace />
        <Intro title='详情' text={this.state.entrance.introduction}/>
        <BottomAction
          buttons={[
            {label: '申请项目', action: this.handleCreateAppointment, backgroundColor: '#2fc3ba', color: '#fff' },
          ]}
        />
      </div>
    );
  }
}

export default EntranceDetail;
