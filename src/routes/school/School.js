import React, { Component } from 'react';
import { SearchBar, List, Switch, Flex, WhiteSpace, Picker } from 'antd-mobile';
import SchoolListItem from '../../components/school/SchoolListItem';
import { SCH_BADGE } from '../../utils/config';
import { loadDataUniversityDataSet } from '../../service/school';
import { loadProvinceList } from '../../service/dic';
import LoadMore from '../../components/loadmore/LoadMore';

class School extends Component {
  constructor(props){
    super(props);
    this.state = {
      cur_page: 1,
      loadmore_disable: false,
      list:[
        {
          "badge": "img/badge/北京大学.jpg",
          "createTime": "2017-11-09 17:01:02",
          "name": "北京大学",
          "updateTime": "",
          "remark": "",
          "id": 1,
          "status": 1
        }
      ],
      filter: [[{ label: '空', value: '', }],[{ label: '空', value: '', }, {  label: ' 是', value: '1', }, { label: '否', value: '0',}]],
      search_form: {
        isFirstRate: '',
        name: '',
        provinceCode: '',
      }
    };
  }

  componentDidMount(){
    loadDataUniversityDataSet({ page: 1, ...this.state.search_form }).then(data => {
      if( data.data.dataSet.total > data.data.dataSet.rows.length ){
        this.setState({ list: data.data.dataSet.rows, loadmore_disable: false });
      }else{
        this.setState({ list: data.data.dataSet.rows, loadmore_disable: true });
      }
    });

    loadProvinceList({}).then(data => {
      data.data.provinceList.map(item => {
        item.value = item.code;
        item.label = item.name;
      });

      console.log(data.data.provinceList);

      let filter = [[],[{ label: '空', value: '', }, {  label: ' 是', value: true, }, { label: '否', value: false,}]];

      filter[0] = data.data.provinceList;

      this.setState({ filter: filter });
    });
  }

  handleSerch = (val) => {
    this.setState({search_form: { ...this.state.search_form, name: val}}, () => {
        loadDataUniversityDataSet(this.state.search_form).then(data => {
            this.setState({ list: data.data.dataSet.rows });
          })
      }
    )
  }

  loadMore = () => {
    let cur_page = ++this.state.cur_page;
    loadDataUniversityDataSet({ page: cur_page, ...this.state.search_form }).then((data) => {
      let temp_list = this.state.list;
      temp_list = temp_list.concat(data.data.dataSet.rows);

      if( data.data.dataSet.total >= temp_list.length ){
        this.setState({ list: temp_list, cur_page, loadmore_disable: true });
      }else{
        this.setState({ list: temp_list, cur_page, loadmore_disable: false });
      }
    }).catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <div style={{ marginBottom: '40px' }}>
        <SearchBar
          placeholder="学校名称"
          value={this.state.search_form.name}
          onClear={()=>this.setState({search_form: { ...this.state.search_form, name: ''}})}
          cancelText='搜索'
          onCancel={this.handleSerch}
          onChange={(val)=>this.setState({search_form: { ...this.state.search_form, name: val}})}
          showCancelButton={true}
        />

        {/*


        <Flex style={{ backgroundColor: '#fff' }}>
          <Flex.Item>
            <select>
              {
                this.state.provices.map(item => {
                  return <option key={item.id} value={item.code}>{item.name}</option>
                })
              }
            </select>
          </Flex.Item>

          <Flex.Item>

            <Switch
              checked={this.state.search_form.isFirsrRate}
              onClick={(checked) => this.setState({search_form: { ...this.state.search_form, name: val}})}
            />
          </Flex.Item>
        </Flex>
        */}

        <Picker
          data={this.state.filter}
          title="省份/双一流"
          cascade={false}
          extra="请选择(可选)"
          onOk={v => this.setState({search_form: { ...this.state.search_form, provinceCode: v[0], isFirsrRate: v[1]}})}
        >
          <List.Item arrow="horizontal">省份/双一流</List.Item>
        </Picker>

        <WhiteSpace />

        <List>
          {
            this.state.list.map(item => {
              return <SchoolListItem key={item.id} thumbnail={`${SCH_BADGE}${item.badge}`} title={item.name} id={item.id} />
            })
          }
          <LoadMore disable={this.state.loadmore_disable} onClick={this.loadMore}/>
        </List>

      </div>
    );
  }
}

export default School;
