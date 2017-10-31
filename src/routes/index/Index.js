import React, { Component } from 'react';
import {loadCaseSuccessDataSet} from '../../service/cases';

class Index extends Component {
  componentDidMount(){
    loadCaseSuccessDataSet({},data=>{
      console.log(data)
    })
  }
    render() {
        return (
            <div>
                首页
            </div>
        );
    }
}

export default Index;
