import React from 'react';

const Fixed = ({ render, onClick }) => {
  const style={
    position: 'absolute',
    zIndex: '100',
    right: '5px',
    top: '30px',
    backgroundColor: '#fff'
  }

  return (
    <div style={style} onClick={() => onClick()}>
      {render}
    </div>
  );
}

export default Fixed;
