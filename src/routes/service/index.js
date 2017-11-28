import React, { Component } from 'react';
import { loadServiceEntranceDataSet, loadServiceEntranceCategoryDataSet, loadAllServiceEntranceCatefirstList, loadServiceEntranceAtTopDto } from '../../service/service';
import { Carousel, List, Accordion, WhiteSpace } from 'antd-mobile';
import { hashHistory } from 'react-router';
import ServiceListItem from '../../components/service/ServiceListItem';
import ListHeader from '../../components/listpanel/ListHeader';
import {IMG_DOMAIN} from "../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;

class Service extends Component {
  state = {
    entrance_top: [],
    entranceCatefirst: []
  };

  componentDidMount() {

    loadAllServiceEntranceCatefirstList().then(data => {
      this.setState({entranceCatefirst: data.data.entranceCatefirst})
    })

    loadServiceEntranceAtTopDto().then(data => {
      this.setState({entrance_top: data.data.entranceAtTopDto.serviceEntranceList})
    })

  }

  render() {
    return (
      <div style={{marginBottom:'50px'}}>
        <Carousel
          className="my-carousel"
          autoplay={true}
          infinite
          selectedIndex={1}
          swipeSpeed={35}
        >
          {this.state.entrance_top.map(item => (
            <div key={item.id} style={{height: '176px'}} onClick={()=>hashHistory.push(`/service/${item.id}`)}>
              <img
                  src={`${IMG_DOMAIN}${item.coverUrl}`}
                  alt={item.title}
                  style={{width: '100%', height:'176px'}}
                />
            </div>
          ))}
        </Carousel>

        <List>
          {
            this.state.entranceCatefirst.map(item => {
              return (
                <Item
                  onClick={() => hashHistory.push(`/service/first/${item.id}`)}
                  arrow="horizontal"
                >
                  {item.name}
                </Item>
              )
            })
          }
        </List>

        {/*{*/}
          {/*this.state.entranceCateList.map(item => {*/}
            {/*return (*/}
              {/*<div key={item.serviceEntranceCatefirst.id}>*/}
                {/*<ListHeader title={item.serviceEntranceCatefirst.name} icon='icon-lanmupeizhi' />*/}
                {/*<List>*/}
                  {/*{*/}
                    {/*item.serviceEntranceCatesecondDtoList.map(item => {*/}
                      {/*return (*/}
                        {/*<Accordion key={item.serviceEntranceCatesecond.id}>*/}
                          {/*<Accordion.Panel header={item.serviceEntranceCatesecond.name}>*/}
                            {/*<List className="my-list">*/}
                              {/*{*/}
                                {/*item.serviceEntranceCatethirdList.map(item => {*/}
                                  {/*return <Link*/}
                                    {/*to={{pathname: `/servicethird/${item.id}`,query:{categoryName: item.name}}}*/}
                                    {/*key={item.id}>*/}
                                    {/*<Item >{item.name}</Item>*/}
                                  {/*</Link>*/}
                                {/*})*/}
                              {/*}*/}
                            {/*</List>*/}
                          {/*</Accordion.Panel>*/}
                        {/*</Accordion>*/}
                      {/*)*/}
                    {/*})*/}
                  {/*}*/}
                {/*</List>*/}
                {/*<WhiteSpace />*/}
              {/*</div>*/}
            {/*)*/}
          {/*})*/}
        {/*}*/}
      </div>
    );
  }
}


export default Service;
