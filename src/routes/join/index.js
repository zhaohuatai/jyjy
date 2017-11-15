import React, { Component } from 'react';
import { loadPubCustomize } from '../../service/customize';

class Join extends Component {
  state = {
    pubCustomize: {
      "content":"",
      "id":3,
      "isEnabled":"",
      "key":"JOIN_COMMUNITY",
      "recordTime":1510736638131,
      "status":""
    }
  }

  componentDidMount() {
    loadPubCustomize({ key: 'JOIN_COMMUNITY' }).then(data => {
      this.setState({pubCustomize: data.data.pubCustomize})
    })
  }


  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.pubCustomize.content }} style={{ backgroundColor: '#fff', padding: '15px' }} />
    );
  }
}

export default Join;