import React, { Component } from 'react';
import { Picker, List, WhiteSpace } from 'antd-mobile';
import { loadProvinceList, loadDicData } from '../../service/dic';
import LineList from '../../components/school/LineList';
import { loadDataScoreLineProvince } from '../../service/provinceline';

class ProvinceLine extends Component {
  state = {
    province_list: [],
    formdata: {
      provinceCode: '110000',
      subjectCode: '1',
    },
    provinceCode:['110000'],
    subjectCode: ['1'],
    line_data:[]
  }

  componentDidMount() {
    loadProvinceList().then(data => {
      data.data.provinceList.map(item => {
        item.value = item.code;
        item.label = item.name;
      });
      this.setState({ province_list: data.data.provinceList });
    })

    loadDicData({ code: 'FK' }).then(data => {
      data.data.dicData.map(item => {
        item.value = item.itemCode;
        item.label = item.itemValue;
      });

      this.setState({data_FK: data.data.dicData, liberalScienceCode: data.data.dicData[0].itemCode });
    });

    loadDataScoreLineProvince(this.state.formdata).then(data => {
      this.setState({line_data: data.data.dataSet.rows})
    })

  }

  handleSearch = (code, value) => {
    console.log(value);
    this.setState({ formdata:{...this.state.formdata, [code]:value }, [code]: value},()=>{
      console.log(this.state.formdata);
      loadDataScoreLineProvince(this.state.formdata).then(data => {
        this.setState({line_data: data.data.dataSet.rows})
      })
    })
  }

  render() {
    const { province_list, data_FK, line_data, subjectCode, provinceCode } = this.state;

    return (
      <div>
        <List style={{ backgroundColor: 'white' }}>
          <Picker
            extra="请选择"
            data={province_list}
            title="省份"
            cols={1}
            onOk={(value)=>this.handleSearch('provinceCode', value[0])}
            value={provinceCode}
          >
            <List.Item arrow="horizontal">省份</List.Item>
          </Picker>
        </List>
        <List style={{ backgroundColor: 'white' }}>
          <Picker
            extra="请选择"
            data={data_FK}
            title="科目"
            cols={1}
            value={subjectCode}
            onOk={(value)=>this.handleSearch('subjectCode', value[0])}
          >
            <List.Item arrow="horizontal">科目</List.Item>
          </Picker>
        </List>

        <WhiteSpace/>
        <LineList data={line_data} />
      </div>
    );
  }
}

export default ProvinceLine;