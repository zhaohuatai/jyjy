import React from 'react';
import {Carousel} from 'antd-mobile';
import {API_DOMAIN} from "../../utils/config";
import {Link} from 'react-router';

const Slide = ({data}) => {
  return (
    <div>
      <Carousel
        className="my-carousel"
        autoplay={true}
        infinite
        selectedIndex={1}
        swipeSpeed={35}
      >
        {data.map(ii => (
          ii.content ?
            <Link to={`/slide/${ii.id}`} key={ii.id}>
              <div  style={{height: '176px'}}>
                <img
                  src={`${API_DOMAIN}${ii.imgUrl}`}
                  alt={ii.title}
                  style={{width: '100%', height: '176px'}}
                />
              </div>
            </Link>
            :
            <div key={ii.id} style={{height: '176px'}}>
              <img
                src={`${API_DOMAIN}${ii.imgUrl}`}
                alt={ii.title}
                style={{width: '100%', height: '176px'}}
              />
            </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Slide;
