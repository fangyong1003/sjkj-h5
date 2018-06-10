import ajax from '@/common/ajax';

export default {
  fetchOrderDetail(orderId) {
    return ajax.get('/api/order/detail', {
      orderId
    }, {
      errorMessage: '订单详情获取失败'
    });
  }
};
