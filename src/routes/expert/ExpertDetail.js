import React, { Component } from 'react';
import { loadMemberTeacher } from '../../service/expert';
import { IMG_DOMAIN } from '../../utils/config';

class ExpertDetail extends Component {
  state = {
    expert: {}
  }

  componentDidMount() {
    const id = this.props.params.id;
    loadMemberTeacher({ id }).then( data => {
      this.setState({ expert: data.data.memberTeacher });
    });
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
      </div>
    );
  }
}

export default ExpertDetail;