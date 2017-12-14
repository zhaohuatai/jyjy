import React from 'react';

const TabsTabbar = ({ goToTab, tabs, activeTab, animated, renderTab}) => (
  <div className="am-tabs-tab-bar-wrap" style={{backgroundColor: '#fff'}}>
    <div className="am-tabs-default-bar am-tabs-default-bar-animated am-tabs-default-bar-left">
      {
        tabs.map((item, index) => (
          <div
            onClick={() => goToTab(index)}
            key={item.id}
            className={index === activeTab ? 'am-tabs-default-bar-tab am-tabs-default-bar-tab-active' : 'am-tabs-default-bar-tab'}
          >
            {item.categoryName}
          </div>
        ))
      }
      <div className="am-tabs-default-bar-underline" style={{height: '43.5px', top: `${activeTab * 43.5}px`}}/>
    </div>
  </div>
);

export default TabsTabbar;
