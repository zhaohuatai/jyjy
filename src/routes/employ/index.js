import React, { Component } from 'react';
import { loadPubCustomize } from '../../service/customize';

class Employ extends Component {
  state = {
    pubCustomize: {
      "content":"",
      "id":3,
      "isEnabled":"",
      "key":"EMPLOY",
      "recordTime":1510736638131,
      "status":""
    }
  }

  componentDidMount() {
    loadPubCustomize({ key: 'EMPLOY' }).then(data => {
      this.setState({pubCustomize: data.data.pubCustomize})
    })
  }


  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.pubCustomize.content }} style={{ backgroundColor: '#fff', padding: '15px' }} />
    );
  }
}

export default Employ;