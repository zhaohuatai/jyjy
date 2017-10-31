import React from 'react';
import {hashHistory} from 'react-router';
import { TabBar } from 'antd-mobile';

export default class BottomTab extends React.Component{
    constructor(props){
        super(props);
        this.state={
            tab:0
        };
    }

    componentDidMount(){
        let path = hashHistory.getCurrentLocation().pathname;
        switch (path) {
        case '/':
            this.setState({tab:0});
            break;
        case '/sort':
            this.setState({tab:1});
            break;
        case '/order':
            this.setState({tab:2});
            break;
        case '/me':
            this.setState({tab:3});
            break;
        default:
            break;
        }

    }
    render(){
        let style={
            position:'fixed',
            bottom:'0',
            width:'100%',
            height:'54px'
        };

        return(
            <div style={{position:'fixed',bottom:'0',width:'100%'}}>
              <TabBar
                unselectedTintColor="#949494"
                tintColor="#33A3F4"
                barTintColor="white"
              >
                <TabBar.Item
                  title="Life"
                  key="Life"
                  icon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/sifuoDUQdAFKAVcFGROC.svg) center center /  21px 21px no-repeat' }}
                  />
                  }
                  selectedIcon={<div style={{
                    width: '22px',
                    height: '22px',
                    background: 'url(https://zos.alipayobjects.com/rmsportal/iSrlOTqrKddqbOmlvUfq.svg) center center /  21px 21px no-repeat' }}
                  />
                  }
                  selected={this.state.selectedTab === 'blueTab'}
                  badge={1}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'blueTab',
                    });
                  }}
                  data-seed="logId"
                >
                </TabBar.Item>
                <TabBar.Item
                  icon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://gw.alipayobjects.com/zos/rmsportal/BTSsmHkPsQSPTktcXyTV.svg) center center /  21px 21px no-repeat' }}
                    />
                  }
                  selectedIcon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://gw.alipayobjects.com/zos/rmsportal/ekLecvKBnRazVLXbWOnE.svg) center center /  21px 21px no-repeat' }}
                    />
                  }
                  title="Koubei"
                  key="Koubei"
                  badge={'new'}
                  selected={this.state.selectedTab === 'redTab'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'redTab',
                    });
                  }}
                  data-seed="logId1"
                >
                </TabBar.Item>
                <TabBar.Item
                  icon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://zos.alipayobjects.com/rmsportal/psUFoAMjkCcjqtUCNPxB.svg) center center /  21px 21px no-repeat' }}
                    />
                  }
                  selectedIcon={
                    <div style={{
                      width: '22px',
                      height: '22px',
                      background: 'url(https://zos.alipayobjects.com/rmsportal/IIRLrXXrFAhXVdhMWgUI.svg) center center /  21px 21px no-repeat' }}
                    />
                  }
                  title="Friend"
                  key="Friend"
                  dot
                  selected={this.state.selectedTab === 'greenTab'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'greenTab',
                    });
                  }}
                >
                </TabBar.Item>
                <TabBar.Item
                  icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
                  selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
                  title="My"
                  key="my"
                  selected={this.state.selectedTab === 'yellowTab'}
                  onPress={() => {
                    this.setState({
                      selectedTab: 'yellowTab',
                    });
                  }}
                >
                </TabBar.Item>
              </TabBar>
            </div>
        );
    }
}
