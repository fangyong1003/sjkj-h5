import ajax from '@/common/ajax';

export default {
  fetchOrderList(orderData) {
    return ajax.get('/api/order/query', {
      size: 10,
      ...orderData
    }, {
      errorMessage: '订单列表获取失败'
    });
  },

  cancelOrder(orderId) {
    return ajax.post('/api/order/cancel', {
      orderId
    }, {
      errorMessage: '取消订单失败'
    });
  },

  deleteOrder(orderId) {
    return ajax.post('/api/order/delete', {
      orderId
    }, {
      errorMessage: '删除订单失败'
    });
  },

  confirmOrder(orderId) {
    return ajax.post('/api/order/confirm', {
      orderId
    }, {
      errorMessage: '确认收货失败'
    });
  },

  remindOrder(orderId) {
    return ajax.post('/api/order/remind', {
      orderId
    }, {
      errorMessage: '提醒发货失败'
    });
  }
};
