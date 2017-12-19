import React, { PropTypes } from 'react';
import { NavBar, Icon, Popover } from 'antd-mobile';
import { hashHistory } from 'react-router';

const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;

const router_name = [
  {  path: '', title: '经英教育' },
  {  path: 'my', title: '个人中心' },
  {  path: 'course', title: '课程' },
  {  path: 'column', title: '专栏' },
  {  path: 'login', title: '登录-经英教育' },
  {  path: 'register', title: '注册-经英教育' },
  {  path: 'school', title: '名校库' },
  {  path: 'career', title: '职业库' },
  {  path: 'profession', title: '专业库' },
  {  path: 'expert', title: '专家' },
  {  path: 'news', title: '新闻' },
  {  path: 'provinceline', title: '省控线' },
  {  path: 'bigdata', title: '自招大数据' },
  {  path: 'join', title: '加入社群' },
  {  path: 'employ', title: '应聘推广员' },
  {  path: 'memberexclusive', title: 'VIP专享' },
  {  path: 'event', title: '大事记' },
  {  path: 'consult', title: '咨询' },
  {  path: 'introduce', title: '经英简介' },
  {  path: 'interlocution', title: '百科问答' },
  {  path: 'service', title: '服务' },
  {  path: 'eval', title: '测评' },
]

class Header extends React.Component {
  state = {
    visible: false,
    selected: '',
    title: '经英教育',
  };
  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };

  componentDidMount() {
    let path_arr;
    let path = hashHistory.getCurrentLocation().pathname;

    path_arr  = path.split('/');

    if(path_arr[1]){
      let router;

      router = router_name.find(x => {
        return x.path === path_arr[1];
      });
      if(router){
        this.setState({title: router.title})
      } else {
        this.setState({title: '经英教育'})
      }
    } else {
      this.setState({title: '经英教育'})
    }
  }

  componentWillReceiveProps(){
    let path_arr;
    let path = hashHistory.getCurrentLocation().pathname;

    path_arr  = path.split('/');

    if(path_arr[1]){
      let router;

      router = router_name.find(x => {
        return x.path === path_arr[1];
      });

      if(router){
        this.setState({title: router.title})
      } else {
        this.setState({title: '经英教育'})
      }
    } else {
      this.setState({title: '经英教育'})
    }
  }

  render () {
    return(
      <NavBar
        mode="dark"
      >
        {this.state.title}
      </NavBar>
    );
  }
}

export default Header;
