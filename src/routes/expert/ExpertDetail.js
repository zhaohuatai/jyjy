import React, { Component } from 'react';
import { loadMemberTeacher, createMemberTeacherAppointment } from '../../service/expert';
import { IMG_DOMAIN } from '../../utils/config';
import BottomAction from '../../components/debris/BottomAction';
import { Modal, TextareaItem } from 'antd-mobile';

class ExpertDetail extends Component {
  state = {
    expert: {},
    pub_show: false,
    pub_content: ''
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadMemberTeacher({ id }).then( data => {
      this.setState({ expert: data.data.memberTeacher });
    });
  }

  handleAppointment = () => {
    createMemberTeacherAppointment({}).then(data => {

    })
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <div style={{ height: '250px', backgroundColor: '#2fc3ba', textAlign: 'center'}}>
          <img src={`${IMG_DOMAIN}${this.state.expert.profilePicture}`} style={{ marginTop: '60px', height: '120px', width:'120px', borderRadius: '50%' }} />
          <p style={{color: '#fff'}}>{this.state.expert.name}</p>
        </div>
        <div style={{ padding: '10px', backgroundColor: '#fff',height:'100%'}}>
           <h3>专家简介</h3>
          {this.state.expert.introduction}
        </div>

        <BottomAction
          buttons={[
            {label: '立即预约', action:()=>this.setState({})},
          ]}
        />

        <Modal
          visible={this.state.pub_show}
          maskClosable={false}
          transparent
          title='提问'
          footer={[
            { text: '取消', onPress: () => this.setState({pub_show: false})},
            { text: '提交', onPress: this.doSubmit }
          ]}
        >
          <TextareaItem
            value={this.state.pub_content}
            rows={3}
            count={100}
            onChange={(value)=>this.setState({pub_content: value})}
          />
        </Modal>
      </div>
    );
  }
}

export default ExpertDetail;