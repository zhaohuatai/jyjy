import React, { Component } from 'react';
import { Tabs, List, Modal } from 'antd-mobile';
import { loadInterlocutionCategoryDataSet, loadInterlocutionDataSet } from '../../service/interlocution';
import LoadMore from '../../components/loadmore/LoadMore';
import InterlocutionItem from '../../components/interlocution/InterlocutionItem';

class Interlocution extends Component {
  state={
    interlocutions:[],
    loadmore_disable: false
  }

  componentDidMount() {
    loadInterlocutionCategoryDataSet().then(data=>{
      this.setState({category: data.data.dataSet.rows})
    })

    loadInterlocutionDataSet().then(data=>{
      this.setState({interlocutions: data.data.dataSet.rows})
    })
  }

  render() {
    const tabs = [
      { title: '官方问答' },
      { title: '用户问答' },
    ]
    return (
      <div>
        <Tabs
          tabs={tabs}
          onChange={this.handleChangeTab}
        >
          <List style={{marginBottom:'54px'}}>
            {
              this.state.interlocutions.map(item => {
                return (
                  <InterlocutionItem key={item.id} data={item} />
                )
              })
            }
            <LoadMore disable={this.state.loadmore_disable} onClick={this.loadMore}/>
          </List>
        </Tabs>

      </div>
    );
  }
}

export default Interlocution;
