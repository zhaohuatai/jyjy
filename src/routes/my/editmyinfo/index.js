import React, {Component} from 'react';
import { List, InputItem, Button, Toast } from 'antd-mobile';
import { hashHistory } from 'react-router';
import { loadMember, updateMember } from '../../../service/user';
import { IMG_DOMAIN } from '../../../utils/config';
import { createForm } from 'rc-form';

const Item = List.Item;
const Brief = Item.Brief;

class MyInfo extends Component {
  state = {
    member: {},
  }

  componentDidMount() {
    loadMember({rows: 1000}).then(data => {
      this.setState({member: data.data.member});
    });
  }

  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
        let form = this.props.form.getFieldsValue();
        form.id = this.state.member.id;
        updateMember(form).then(data => {
          Toast.success('更新成功');
          hashHistory.push('/my/myinfo');
        })
      } else {
        alert('请检查输入内容');
      }
    });
  }

  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    const { name, point, clazz, schoolName, phone, profilePicture } = this.state.member;

    return (
      <div>
        <List>
          <Item
            extra={<img style={{ width:'60px', height:'60px' }} src={`${IMG_DOMAIN}${profilePicture}`} />}
            onClick={()=>hashHistory.push('/my/editmyinfo')}
          >
            头像
          </Item>
          <InputItem
            {...getFieldProps('name',{
              initialValue: name
            })}
            placeholder="输入昵称"
            type="text"
          >
            昵称
          </InputItem>
          <InputItem
            {...getFieldProps('schoolName',{
              initialValue: schoolName
            })}
            placeholder="输入学校"
            type="text"
          >
            学校
          </InputItem>
          <InputItem
            {...getFieldProps('clazz',{
              initialValue: clazz
            })}
            placeholder="输入年级"
            type="text"
          >
            年级
          </InputItem>
          <InputItem
            {...getFieldProps('phone',{
              initialValue: phone
            })}
            placeholder="输入电话"
            type="text"
          >
            年级
          </InputItem>
          <Item>
            <Button type="primary" size="small" inline onClick={this.onSubmit}>提交</Button>
          </Item>
        </List>
      </div>
    );
  }
}

export default createForm()(MyInfo);