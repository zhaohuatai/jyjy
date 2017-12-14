import React, { Component } from 'react';
import { Tabs, List, Modal, TextareaItem, Toast } from 'antd-mobile';
import { loadInterlocutionCategoryDataSet, loadInterlocutionDataSet, createInterlocutionConsultation, loadInterlocutionConsultationDataSet } from '../../service/interlocution';
import LoadMore from '../../components/loadmore/LoadMore';
import InterlocutionItem from '../../components/interlocution/InterlocutionItem';
import Fixed from '../../components/debris/Fixed';
import Consultation from '../../components/interlocution/Consultation';
import TabsTabbar from '../../components/interlocution/TabsTabbar';

const renderTab = (tab) => {
  return <span key={tab.id} style={{height: '60px'}}>{tab.categoryName}</span>
}

class Interlocution extends Component {
  state={
    cur_page: 1,
    interlocutions:[],
    loadmore_disable: false,
    category:[],
    pub_show: false,
    pub_content: '',
    consultation: []
  }

  componentDidMount() {
    loadInterlocutionCategoryDataSet().then(data=>{
      this.setState({category: data.data.dataSet.rows});
      this.handleRefresh({ categoryId: data.data.dataSet.rows[0].id });

    })

    loadInterlocutionConsultationDataSet().then(data=>{
      this.setState({consultation: data.data.dataSet.rows})
    })
  }

  handleRefresh = (params) =>{
    loadInterlocutionDataSet(params).then((data) => {
      if( data.data.dataSet.total > data.data.dataSet.rows.length ){
        this.setState({ interlocutions: data.data.dataSet.rows, loadmore_disable: false });
      }else{
        this.setState({ interlocutions: data.data.dataSet.rows, loadmore_disable: true });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  handleChangeTab = (tab, index) => {
    this.setState({cur_page: 1, });
    this.handleRefresh({ categoryId: tab.id, page: 1, });
  }

  doSubmit = () => {
    createInterlocutionConsultation({ content: this.state.pub_content}).then(data => {
      this.setState({pub_show:false, pub_content: ''});

      if( data.statusCode === 200 ){
        Toast.success('提问成功')
      }
    })
  }


  loadMore = () => {
    let cur_page = ++this.state.cur_page;
    loadInterlocutionDataSet({ page: cur_page, categoryId: this.state.cur_tab_id}).then((data) => {
      let temp_list = this.state.cur_news;
      temp_list = temp_list.concat(data.data.dataSet.rows);

      if( data.data.dataSet.total > temp_list.length ){
        this.setState({ interlocutions: temp_list, cur_page, loadmore_disable: false });
      }else{
        this.setState({ interlocutions: temp_list, cur_page, loadmore_disable: true });
      }
    }).catch(err => {
      console.log(err);
    });
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
          <div style={{ height: 500}}>
            <Tabs
              renderTab={renderTab}
              tabs={this.state.category}
              initalPage={'t2'}
              tabBarPosition="left"
              tabDirection="vertical"
              onChange={this.handleChangeTab}
              usePaged={false}
              renderTabBar={TabsTabbar}
            >
              <div style={{ height: '30px', backgroundColor: '#fff' }}>
                <List style={{marginBottom:'54px', height: '50px'}}>
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
          </div>


          <List style={{marginBottom:'54px'}}>
            <Fixed
              render={<svg className="icon" aria-hidden="true" style={{ width: '2.5em', height: '2.5em', color: '#2fc2ba' }}>
                <use xlinkHref="#icon-tianjiazhuanhuan" /></svg>}
              onClick={ () => this.setState({pub_show: true})}
            />
            {
              this.state.consultation.map(item => {
                return (
                  <Consultation key={item.id} data={item} />
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
