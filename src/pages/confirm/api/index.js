import { Toast } from 'vant';
import ajax from '@/common/ajax';
import addressConfig from '../config/url';

export default {
  submitOrder(orderData) {
    return ajax.post('/api/order/create', {
      data: JSON.stringify(orderData)
    }, {
      isJson: true,
      errorMessage: '提交订单失败'
    }).catch((err) => {
      Toast(err);
      throw err;
    });
  },

  getAddressList() {
    return ajax.get(addressConfig.addressList);
  }
};
