import React from 'react';

const NumberInfo = ({ name, text }) => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <p style={{ color: '#2fc2ba', fontSize: '20px', margin: '5px'}}>
        {text}
      </p>
      <p style={{ fontSize: '14px', margin: '5px'}}>
        {name}
      </p>
    </div>
  );
}

export default NumberInfo;
