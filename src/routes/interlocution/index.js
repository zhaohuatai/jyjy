import React, { Component } from 'react';
import { Tabs, List, Modal, TextareaItem, Toast } from 'antd-mobile';
import { loadInterlocutionCategoryDataSet, loadInterlocutionDataSet, createInterlocutionConsultation } from '../../service/interlocution';
import LoadMore from '../../components/loadmore/LoadMore';
import InterlocutionItem from '../../components/interlocution/InterlocutionItem';
import Fixed from '../../components/debris/Fixed';

const renderTab = (tab) => {
  return <span key={tab.id} style={{ height: '40px'}}>{tab.categoryName}</span>
}

class Interlocution extends Component {
  state={
    interlocutions:[],
    loadmore_disable: false,
    category:[],
    pub_show: false,
    pub_content: ''
  }

  componentDidMount() {
    loadInterlocutionCategoryDataSet().then(data=>{
      this.setState({category: data.data.dataSet.rows})
    })

    loadInterlocutionDataSet().then(data=>{
      this.setState({interlocutions: data.data.dataSet.rows})
    })
  }

  doSubmit = () => {
    createInterlocutionConsultation({ content: this.state.pub_content}).then(data => {
      this.setState({pub_show:false, pub_content: ''});

      if( data.statusCode === 200 ){
        Toast.success('提问成功')
      }
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
          <Tabs
            renderTab={renderTab}
            tabs={this.state.category}
            initalPage={'t2'}
            tabBarPosition="left"
            tabDirection="vertical"
            onChange={this.handleChangeTab}
            usePaged={false}
          >
            <div style={{ height: '80px', backgroundColor: '#fff' }}>
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
            </div>
          </Tabs>

          <List style={{marginBottom:'54px'}}>
            <Fixed
              render={<svg className="icon" aria-hidden="true" style={{ width: '2.5em', height: '2.5em', color: '#2fc2ba' }}>
                <use xlinkHref="#icon-tianjiazhuanhuan" /></svg>}
              onClick={ () => this.setState({pub_show: true})}
            />
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

export default Interlocution;
