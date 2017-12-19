import React, { Component } from 'react';
import { Link } from 'react-router';
import { SearchBar, Tabs, Tag, Flex } from 'antd-mobile';
import { loadDataProfessionSubjectDataSet, loadDataProfessionCategoryDataSet, loadDataProfessionDataSet } from '../../service/profession';
import TabsTabbar from "./TabsTabbar";

const renderTab = (tab) => {
  return <span key={tab.id} style={{ height: '40px'}}>{tab.name}</span>
}

class Specialty extends Component {
  state = {
    tabs: [],
    categorys:[{dataProfessionCategory: {}, dataProfessionList: []}],
    specicalties: []
  }

  componentDidMount(){
    loadDataProfessionSubjectDataSet({rows: 100}).then( data => {
      this.setState({ tabs: data.data.dataSet.rows });
      loadDataProfessionCategoryDataSet({ subjectId: data.data.dataSet.rows[0].id}).then( data => {
        this.setState({ categorys: data.data.DataSetDto.rows });
      })
    })
  }

  handleChangeTab = (tab, index) =>{
    loadDataProfessionCategoryDataSet({ subjectId: tab.id}).then( data => {
      this.setState({ categorys: data.data.DataSetDto.rows });
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
      <div style={{ backgroundColor: '#fff' }}>
        {/*<SearchBar placeholder="本科专业名称" />*/}
        
        <div style={{ height: 550 }}>
          <Tabs
            renderTab={renderTab}
            tabs={this.state.tabs}
            initalPage={'t2'}
            tabBarPosition="left"
            tabDirection="vertical"
            onChange={this.handleChangeTab}
            usePaged={false}
            renderTabBar={TabsTabbar}
          >
            <div style={{ height: '500px', backgroundColor: '#fff', paddingLeft: '10px' }}>
              {
                this.state.categorys.map(item => {
                  return (
                    <div key={item.dataProfessionCategory.id}>
                      <h4 style={{color: '#2fc2ba', margin: '10px 0'}}>{item.dataProfessionCategory.name}</h4>
                      <Flex wrap="wrap">
                        {
                          item.dataProfessionList.map( item => {
                            return <Link
                              key={item.id}
                              style={{ margin: '5px 5px',fontSize: '14px', height: '30px', lineHeight: '30px', display: 'block', textAlign: 'center' }}
                              to={`/profession/${item.id}`}
                            >
                              { item.profession }
                            </Link>
                          })
                        }
                      </Flex>
                    </div>
                  )
                })
              }
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Specialty;
