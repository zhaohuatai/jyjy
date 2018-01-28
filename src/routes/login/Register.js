import React, { Component } from 'react';
import { createForm } from 'rc-form';
import { WECHAT_LOGIN, API_DOMAIN } from '../../utils/config';
import { hashHistory } from 'react-router'
import { List, InputItem, Button, Toast, Modal } from 'antd-mobile';
import { loadDicData } from '../../service/dic';
import SMSVerification from "./SMSVerification";
import {createAccount, ishaveOpenId} from "../../service/user";
import WXshare from '../../utils/WXshare';

const Item = List.Item;

class Register extends Component {
  state = {
    sendtime:0,
    value: 1,
    class: [],
    phone: '',
    registId: ''
  }


  componentDidMount() {
    loadDicData({ code: 'NJ' }).then(data => {
      this.setState({ class: data.data.dicData })
    });

    ishaveOpenId().then(data => {
      if(data.data.ishaveOpenId !== 'yes'){
        Modal.alert('未登录', '请先登录', [
          { text: '取消', onPress: () => hashHistory.push('/') },
          { text: '登录', onPress: () => window.location.href = WECHAT_LOGIN },
        ]);
      }
    });

    WXshare({
      title: '经英教育',
      link: `${API_DOMAIN}#/register`,
      imgUrl: `${API_DOMAIN}static/WechatIMG290.png`,
    });
  }

  onSubmit = () => {
    if( this.state.registId && this.state.phone ){
      this.props.form.validateFields({ force: true }, (error) => {
        if (!error) {
          let create_form = this.props.form.getFieldsValue();
          create_form.phone = this.state.phone;
          create_form.registId = this.state.registId;
          createAccount(create_form).then(data => {
            Toast.success('注册成功',1);
            hashHistory.push('/')
          })
        } else {
          alert('请检查信息');
        }
      });
    } else {
      Toast.fail('请先验证手机',2);
    }

  }

  setRegister = ({phone,registId})=>{
    this.setState({phone,registId});
  }

  onReset = () => {
    this.props.form.resetFields();
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (<form>
      <SMSVerification checkSuccess={this.setRegister} />
      <List
        renderHeader={() => '基本信息'}
      >

        {/*<InputItem*/}
          {/*{...getFieldProps('account', {*/}
            {/*rules: [*/}
              {/*{ required: true, message: '请输入账号' },*/}
            {/*],*/}
          {/*})}*/}
          {/*placeholder="请输入账号"*/}
        {/*>*/}
          {/*账号*/}
        {/*</InputItem>*/}
        {/*<InputItem {...getFieldProps('password',{*/}
          {/*rules: [*/}
            {/*{ required: true, message: '请输入密码' },*/}
          {/*],*/}
        {/*})}*/}
                   {/*placeholder="请输入密码"*/}
                   {/*type="password">*/}
          {/*密码*/}
        {/*</InputItem>*/}

        <InputItem
          {...getFieldProps('nickName', {
            rules: [
              { required: true, message: '请输入昵称' },
            ],
          })}
          placeholder="请输入昵称"
        >昵称</InputItem>

        {/*<InputItem {...getFieldProps('schoolName')} placeholder="请输入学校" type="text">*/}
          {/*学校*/}
        {/*</InputItem>*/}
        <Item
          {...getFieldProps('clazz',{
            initialValue: 0,
            rules: [
              { required: true, message: '请选择年级' },
            ],
          })}
        >
          <select defaultValue='0'>
            {
              this.state.class.map(item=>{
                return <option key={item.itemCode} value={item.itemCode}>{item.itemValue}</option>
              })
            }
          </select>
        </Item>

      </List>
      <List renderHeader={() => '操作'}>
        <Item>
          <Button type="primary" size="small" inline onClick={this.onSubmit}>提交</Button>
          <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.onReset}>重置</Button>
        </Item>
      </List>
    </form>);
  }
}

export default createForm()(Register);
