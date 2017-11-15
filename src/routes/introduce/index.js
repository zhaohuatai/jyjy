import React, { Component } from 'react';
import { loadPubCustomize } from '../../service/customize';

class Introduce extends Component {
  state = {
    pubCustomize: {
      "content":"",
      "id":3,
      "isEnabled":"",
      "key":"INTRODUCE",
      "recordTime":1510736638131,
      "status":""
    }
  }

  componentDidMount() {
    loadPubCustomize({ key: 'INTRODUCE' }).then(data => {
      this.setState({pubCustomize: data.data.pubCustomize})
    })
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.pubCustomize.content }} style={{ backgroundColor: '#fff', padding: '15px' }} />
    );
  }
}

export default Introduce;