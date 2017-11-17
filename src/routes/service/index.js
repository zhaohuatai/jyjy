import React, { Component } from 'react';
import { loadServiceEntranceDataSet, loadServiceEntranceCategoryDataSet } from '../../service/service';
import { Carousel, List, Accordion, WhiteSpace } from 'antd-mobile';
import { Link } from 'react-router';
import ServiceListItem from '../../components/service/ServiceListItem';
import ListHeader from '../../components/listpanel/ListHeader';
import {API_DOMAIN} from "../../utils/config";

const Item = List.Item;
const Brief = Item.Brief;

class Service extends Component {
  state = {
    entrance_top: [],
    entranceCateList: []
  };

  componentDidMount() {
    loadServiceEntranceDataSet({isTop: 1}).then(data => {
      this.setState({entrance_top: data.data.dataSet.rows})
    })

    loadServiceEntranceCategoryDataSet().then(data => {
      this.setState({entranceCateList: data.data.entranceCateList})
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
            <Link to={`/entrancesecond/${item.id}`} key={item.id}>
              <img
                src={`${API_DOMAIN}${item.coverUrl}`}
                alt={item.title}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({
                    initialHeight: null,
                  });
                }}
              />
            </Link>
          ))}
        </Carousel>

        {
          this.state.entranceCateList.map(item => {
            return (
              <div key={item.serviceEntranceCatefirst.id}>
                <ListHeader title={item.serviceEntranceCatefirst.name} icon='icon-lanmupeizhi' />
                <List>
                  {
                    item.serviceEntranceCatesecondDtoList.map(item => {
                      return (
                        <Accordion key={item.serviceEntranceCatesecond.id}>
                          <Accordion.Panel header={item.serviceEntranceCatesecond.name}>
                            <List className="my-list">
                              {
                                item.serviceEntranceCatethirdList.map(item => {
                                  return <Link
                                    to={{pathname: `/servicethird/${item.id}`,query:{categoryName: item.name}}}
                                    key={item.id}>
                                    <Item >{item.name}</Item>
                                  </Link>
                                })
                              }
                            </List>
                          </Accordion.Panel>
                        </Accordion>
                      )
                    })
                  }
                </List>
                <WhiteSpace />
              </div>
            )
          })
        }
      </div>
    );
  }
}


export default Service;