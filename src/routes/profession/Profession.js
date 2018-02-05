import React, { Component } from 'react';
import { Link } from 'react-router';
import { SearchBar, Tabs, Tag, Flex } from 'antd-mobile';
import { loadDataProfessionSubjectDataSet, loadDataProfessionCategoryDataSet, loadDataProfessionDataSet } from '../../service/profession';
import TabsTabbar from "./TabsTabbar";
import WXshare from '../../utils/WXshare';
import { API_DOMAIN } from '../../utils/config';

const renderTab = (tab) => {
  return <span key={tab.id} style={{ height: '40px'}}>{tab.name}</span>
}

class Profession extends Component {
  state = {
    tabs: [],
    categorys:[{dataProfessionCategory: {id: 0}, dataProfessionList: []}],
    specicalties: []
  }

  componentDidMount(){
    loadDataProfessionSubjectDataSet({rows: 100}).then( data => {
      this.setState({ tabs: data.data.dataSet.rows });
      loadDataProfessionCategoryDataSet({ subjectId: data.data.dataSet.rows[0].id}).then( data => {
        this.setState({ categorys: data.data.DataSetDto.rows });
      })
    })

    WXshare({
      title: '经英教育-专业库',
      link: `${API_DOMAIN}?redirect_url=profession`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
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

        <div style={{ height: window.innerHeight-100 }}>
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
            <div style={{ height: window.innerHeight-100, backgroundColor: '#fff', paddingLeft: '10px' }}>
              {
                this.state.categorys.map(item => {
                  return (
                    <div key={item.dataProfessionCategory.id}>
                      <h4 style={{color: '#2fc2ba', margin: '10px 0'}}>{item.dataProfessionCategory.name}</h4>
                      <Flex wrap="wrap">
                        {
                          item.dataProfessionList.map( itemlist => {
                            return <Link
                              key={itemlist.id}
                              style={{ margin: '5px 5px',fontSize: '14px', height: '30px', lineHeight: '30px', display: 'block', textAlign: 'center' }}
                              to={`/profession/${itemlist.id}`}
                            >
                              { itemlist.profession }
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

export default Profession;
