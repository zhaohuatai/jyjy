import React, { Component } from 'react';
import { loadMemberTeacher, createMemberTeacherAppointment, createMemberTeacherFavorite } from '../../service/expert';
import { IMG_DOMAIN } from '../../utils/config';
import BottomAction from '../../components/debris/BottomAction';
import { Modal, InputItem, Toast } from 'antd-mobile';

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
    createMemberTeacherAppointment({
      teacherId: this.props.params.id,
      phone: this.state.phone}).then(data => {
        Toast.success('预约成功',1);
        this.setState({ phone: '', pub_show: false });
    })
  }

  handleShowModal = () => {
    this.setState({pub_show: true})
  }

  handleInputPhone = (value) => {
    this.setState({phone: value})
  }

  handleAddFavorite = () => {
    createMemberTeacherFavorite({memberId: this.props.params.id}).then(data => {
      Toast.success('关注成功',1)
    })
  }

  render() {
    return (
      <div style={{height:'100%'}}>
        <div style={{ height: '250px', backgroundColor: '#2fc3ba', textAlign: 'center'}}>
          <img src={`${IMG_DOMAIN}${this.state.expert.profilePicture}`} style={{ marginTop: '60px', height: '120px', width:'120px', borderRadius: '50%' }} />
          <p style={{color: '#fff'}}>{this.state.expert.name}</p>
        </div>
        <div style={{ padding: '10px', backgroundColor: '#fff',height:'100%', marginBottom: '50px'}}>
          <h3>专家简介</h3>
          <div dangerouslySetInnerHTML={{__html: this.state.expert.introduction}}/>
        </div>

        <BottomAction
          buttons={[
            {label: '添加收藏', action: this.handleAddFavorite, backgroundColor: '#fff', color: '#2fc3ba'},
            {label: '立即预约', action: this.handleShowModal, backgroundColor: '#2fc3ba', color: '#fff' },
          ]}
        />

        <Modal
          visible={this.state.pub_show}
          maskClosable={false}
          transparent
          title='预约专家'
          footer={[
            { text: '取消', onPress: () => this.setState({pub_show: false})},
            { text: '提交', onPress: this.handleAppointment}
          ]}
        >
          <InputItem placeholder='输入联系方式' onChange={this.handleInputPhone}/>
        </Modal>
      </div>
    );
  }
}

export default ExpertDetail;
