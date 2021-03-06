import React from 'react';
import {Grid} from 'antd-mobile';
import {Link} from 'react-router';

const CategoryGrid = ({data, columnNum}) => {
  const gridData = data.map(item => ({
    icon: (<Link to={{
      pathname: item.url,
      query: {
        categoryId: item.id,
        categoryName: item.text
      }
    }}>
      <svg className="icon" aria-hidden="true" style={{width: '2.8em', height: '2.8em'}}>
        <use xlinkHref={`#${item.icon}`}/>
      </svg>
    </Link>),
    text: item.text,
  }));
  return (
    <Grid data={gridData} columnNum={columnNum} hasLine={false} activeStyle={false}/>
  );
};
export default CategoryGrid;
