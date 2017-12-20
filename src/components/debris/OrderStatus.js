import React from 'react'

// 订单状态 _D#1等待付款，2已完成,3 退款中 ,4交易关闭#

const OrderStatus = ({ orderStatus }) => {
  switch (orderStatus) {
    case '1': return <span style={{ color: '#2fc2ba' }}>等待付款</span>;
    case '2': return <span style={{ color: '#2fc2ba' }}>已完成</span>;
    case '3': return <span style={{ color: '#2fc2ba' }}>退款中</span>;
    case '4': return <span style={{ color: '#2fc2ba' }}>交易关闭</span>;
    default: return <span style={{ color: '#2fc2ba' }}>未知</span>;
  }
}

export default OrderStatus;
