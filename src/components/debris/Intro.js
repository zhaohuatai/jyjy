import React from 'react';

const Intro = ({ title, text }) => {
  return (
    <div style={{ width: '100%', backgroundColor: '#fff', padding: '10px 0' }}>
      <h4 style={{ color: '#2fc2ba', margin: '0 15px' }}>{title}</h4>
      <div dangerouslySetInnerHTML={{ __html: text }} style={{ backgroundColor: '#fff', padding: '15px' }} />
    </div>
  );
}

export default Intro;
