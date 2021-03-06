import React, { Component } from 'react';
import { Link } from 'react-router';
import { SearchBar, Flex, Tabs } from 'antd-mobile';
import { loadDataCareerCategoryDataSet, loadDataCareerDataSet } from '../../service/career';
import TabsTabbar from './TabsTabbar';
import { API_DOMAIN } from '../../utils/config';
import WXshare from '../../utils/WXshare';

const renderTab = (tab) => {
  return <span key={tab.id} style={{ height: '40px'}}>{tab.name}</span>
}

class Profession extends Component {
  state = {
    categories: [],
    careers: []
  }
  componentDidMount() {
    loadDataCareerCategoryDataSet({rows: 100}).then( data => {
      this.setState({ categories: data.data.dataSet.rows });
      loadDataCareerDataSet({ categoryId: data.data.dataSet.rows[0].id }).then( data => {
        this.setState({ careers: data.data.dataSet.rows });
      })
    })

    WXshare({
      title: '经英教育-职业库',
      link: `${API_DOMAIN}?redirect_url=career`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  handleChangeTab = (tab, index) =>{
    loadDataCareerDataSet({ categoryId: tab.id }).then( data => {
      this.setState({ careers: data.data.dataSet.rows });
    })
  }

  render() {
    return (
      <div>
        <SearchBar placeholder="职业名称" />
        <div style={{ height: window.innerHeight-143 }}>
          <Tabs
            renderTab={renderTab}
            tabs={this.state.categories}
            initalPage={'t2'}
            tabBarPosition="left"
            tabDirection="vertical"
            onChange={this.handleChangeTab}
            usePaged={false}
            renderTabBar={TabsTabbar}
          >
            <div style={{ height: window.innerHeight-143, backgroundColor: '#fff' }}>
              <Flex wrap="wrap">
                {
                  this.state.careers.map( item => {
                    return <Link
                      key={item.id}
                      style={{ margin: '5px 5px', height: '40px', lineHeight: '40px', display: 'block', padding: '0 5px', border: 'solid 1px #ddd', textAlign: 'center' }}
                      to={`/career/${item.id}`}
                      >
                      { item.name }
                    </Link>
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

export default Profession;
