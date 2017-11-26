import React, { Component } from 'react';
import { List, InputItem, Toast } from 'antd-mobile';
import {sendSmsCheckCode,checkSmsCode} from '../../service/dic';

export default class SMSVerification extends Component{
    constructor(props){
        super(props);
        this.state={
            sendtime:0,
            phone:'',
            code:'',
            toptips:{
                show:true,
                message:'',
                type:''
            },
        };
    }

    handleSendCode = () => {
        if(this.state.sendtime === 0){
            let phone = this.state.phone;
            if(phone){
              sendSmsCheckCode({phone}).then(data=>{
                if(data.statusCode === 200){
                  this.setState({ sendtime: 90 })
                  Toast.success('发送成功');
                  //倒计时，到 0 停止
                  let countdown = setInterval(()=>{
                    this.setState({sendtime: this.state.sendtime-1});
                    if(this.state.sendtime === 0){
                      clearInterval(countdown);
                    }
                  },1000);
                }else{
                  this.setState({
                    toptips:{
                      type:'warn',
                      show:true,
                      message:data.message
                    }
                  });
                }
              })
            } else {
                Toast.fail('请正确输入手机号')
            }

        }
    }

    handleInputPhone = (value) => {
      this.setState({phone: value});
    }

    handleInputSmessage=(value)=>{
        if(value.length === 6){
            //do check
            checkSmsCode({
                phone:this.state.phone,
                checkCode:value
            }).then(data => {
                Toast.success('手机验证成功');
                this.props.checkSuccess(data.data.registResDto);                
            })
        }
    }

    render(){
        const SendBtn = ({ sendtime }) => {
            return (
              <div>
                {
                  sendtime == 0 ?
                    <span onClick={this.handleSendCode}>点击发送</span>
                    :
                    <span>{this.state.sendtime}</span>
                }
              </div>
            )
        }
        return(
            <div>
                <List
                  renderHeader={() => '验证手机号'}
                >
                    <InputItem
                      placeholder="请输入密码"
                      extra={<SendBtn sendtime={this.state.sendtime} />}
                      value={this.state.phone}
                      onChange={this.handleInputPhone}
                    >
                        手机号
                    </InputItem>
                    <InputItem
                      placeholder="请输入验证码"
                      type="number"
                      onChange={this.handleInputSmessage}
                    >
                        验证码
                    </InputItem>
                </List>
            </div>
        )
    }
}