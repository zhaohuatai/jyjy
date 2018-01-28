import React, {Component} from 'react';
import {loadServiceEntrance, createAppointment} from '../../service/service';
import {WhiteSpace, Modal, Toast, Flex} from 'antd-mobile';
import Intro from '../../components/debris/Intro';
import { API_DOMAIN, IMG_DOMAIN } from '../../utils/config';
import BottomAction from "../../components/debris/BottomAction";
import WXshare from '../../utils/WXshare';

const style = {
  position: 'fixed',
  zIndex: '100',
  bottom: '50px',
  height: '50px',
  lineHeight: '50px',
  width: '100%',
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#949494',
}

class EntranceDetail extends Component {
  state = {
    entrance: {}
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadServiceEntrance({id}).then((data) => {
      this.setState({entrance: data.data.serviceEntrance});
    });

    WXshare({
      title: '经英教育-捷径升学',
      link: `${API_DOMAIN}#/service/${id}`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  handleCreateAppointment = () => {
    Modal.alert('预约', '确定现在预约？', [
      {text: '取消', onPress: () => console.log('cancel')},
      {
        text: '确定', onPress: () => createAppointment({entranceId: this.props.params.id}).then(data => {
        Toast.success('预约成功，24小时内会有助教老师与您联系', 3);
      })
      },
    ])

  }

  render() {


    return (
      <div>
        <img src={`${IMG_DOMAIN}${this.state.entrance.coverUrl}`} style={{height: '176px', width: '100%'}}/>
        <WhiteSpace/>
        <Intro title='详情' text={this.state.entrance.introduction}/>

        {
          this.state.entrance.appointCount >= this.state.entrance.maxAppointCount ?
            <Flex style={style}>
              <Flex.Item>
                已被其他学员预约
              </Flex.Item>
            </Flex>
            :
            <BottomAction
              buttons={[
                {label: '申请项目', action: this.handleCreateAppointment, backgroundColor: '#2fc3ba', color: '#fff'},
              ]}
            />
        }
        }

      </div>
    );
  }
}

export default EntranceDetail;
