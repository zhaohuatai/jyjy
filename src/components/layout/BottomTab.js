import React from 'react';
import { hashHistory } from 'react-router';
import { TabBar } from 'antd-mobile';

export default class BottomTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: hashHistory.getCurrentLocation().pathname,
    };
  }

  handleChangeTab = (path) => {
    this.setState({selectedTab:path});
    hashHistory.push(path);
  }

  handleSelect = (pathname, select_path) => {
    let path_arr  = pathname.split('/');
    return select_path === path_arr[1];
  }
  
  render() {
    return (
      <div style={{ position: 'fixed', bottom: '0', width: '100%' }}>
        <TabBar
          unselectedTintColor="#949494"
          tintColor="#2fc2ba"
          barTintColor="white"
        >
          <TabBar.Item
            title="首页"
            key="index"
            icon={<svg className="icon" aria-hidden="true" style={{ width: '1.5em', height: '1.5em' }}><use xlinkHref="#icon-shouye" /></svg>}
            selectedIcon={<svg className="icon" aria-hidden="true" style={{ width: '1.5em', height: '1.5em', color: '#2fc2ba' }}><use xlinkHref="#icon-shouye" /></svg>}
            selected={ hashHistory.getCurrentLocation().pathname === '/'}
            onPress={() => this.handleChangeTab('/')}
            data-seed="logId"
          />
          <TabBar.Item
            icon={<svg className="icon" aria-hidden="true" style={{ width: '1.5em', height: '1.5em' }}><use xlinkHref="#icon-lanmupeizhi" /></svg>}
            selectedIcon={<svg className="icon" aria-hidden="true" style={{ width: '1.5em', height: '1.5em', color: '#2fc2ba' }}><use xlinkHref="#icon-lanmupeizhi" /></svg>}
            title="专栏"
            key="zhuanlan"
            selected={ this.handleSelect(hashHistory.getCurrentLocation().pathname, 'column') }
            onPress={() => this.handleChangeTab('/column')}
            data-seed="logId1"
          />
          <TabBar.Item
            icon={<svg className="icon" aria-hidden="true" style={{ width: '1.5em', height: '1.5em' }}><use xlinkHref="#icon-kecheng" /></svg>}
            selectedIcon={<svg className="icon" aria-hidden="true" style={{ width: '1.5em', height: '1.5em', color: '#2fc2ba' }}><use xlinkHref="#icon-kecheng" /></svg>}
            title="课程"
            key="class"
            selected={this.handleSelect(hashHistory.getCurrentLocation().pathname, 'course')}
            onPress={() => this.handleChangeTab('/course')}
          />
          <TabBar.Item
            icon={<svg className="icon" aria-hidden="true" style={{ width: '1.5em', height: '1.5em' }}><use xlinkHref="#icon-wo" /></svg>}
            selectedIcon={<svg className="icon" aria-hidden="true" style={{ width: '1.5em', height: '1.5em', color: '#2fc2ba' }}><use xlinkHref="#icon-wo" /></svg>}
            title="我的"
            key="my"
            selected={this.handleSelect(hashHistory.getCurrentLocation().pathname, 'my')}
            onPress={() => this.handleChangeTab('/my')}
          />
        </TabBar>
      </div>
    );
  }
}
