import React, { Component } from 'react';
import { SearchBar, Tabs, Tag, Flex } from 'antd-mobile';
import { loadDataProfessionSubjectDataSet, loadDataProfessionCategoryDataSet, loadDataProfessionDataSet } from '../../service/specicalty';

const SpecialtyItem = ({data}) => {
  return   
}

const renderTab = (tab) => {
  return <span key={tab.id} style={{ height: '40px'}}>{tab.name}</span>
}

class Specialty extends Component {
  state = {
    tabs: [],
    categorys:[{id:1}],
    specicalties: []
  }

  componentDidMount(){
    loadDataProfessionSubjectDataSet({}).then( data => {
      this.setState({ tabs: data.data.dataSet.rows });
      loadDataProfessionCategoryDataSet({ subjectId: data.data.dataSet.rows[0].id}).then( data => {
        this.setState({ categorys: data.data.dataSet.rows });
        loadDataProfessionDataSet({ categoryId: data.data.dataSet.rows[0].id }).then( data => {
          this.setState({ specicalties: data.data.dataSet.rows })
        })
      })
    })
  }

  handleChangeTab = (tab, index) =>{
    loadDataProfessionCategoryDataSet({ subjectId: tab.id}).then( data => {
      this.setState({ categorys: data.data.dataSet.rows });
      loadDataProfessionDataSet({ categoryId: data.data.dataSet.rows[0].id }).then( data => {
          this.setState({ specicalties: data.data.dataSet.rows })
      })
    })
  }

  handleSelectCategory = (e) => {
    let categoryId = e.target.value;
    loadDataProfessionDataSet({ categoryId }).then( data => {
      this.setState({ specicalties: data.data.dataSet.rows })
    })
  }

  render() {
    return (
      <div>
        <SearchBar placeholder="专业名称" />
        
        <div style={{ height: 500 }}>
          <Tabs
            renderTab={renderTab}
            tabs={this.state.tabs}
            initalPage={'t2'}
            tabBarPosition="left"
            tabDirection="vertical"
            onChange={this.handleChangeTab}
            usePaged={false}
          >
            <div style={{ height: '500px', backgroundColor: '#fff' }}>
              <select 
                onChange={this.handleSelectCategory}
                defaultValue={this.state.categorys[0].id}
                style={{ height: '30px'}}
              >
                {
                  this.state.categorys.map( item => {
                    return <option key={item.id} value={item.id}>{item.name}</option>
                  })
                }
              </select>
              <Flex wrap="wrap">
                {
                  this.state.specicalties.map( item => {
                    return <Tag key={item.id} data-seed="logId" style={{ margin: '5px 5px', height: '40px', width:'45%', lineHeight: '40px' }} >{ item.profession }</Tag>
                  })
                }
              </Flex>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Specialty;