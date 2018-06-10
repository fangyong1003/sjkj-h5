import ajax from '@/common/ajax';
import { Toast } from 'vant';
import mock from './mock';

export const myOrderList = () => {
  // return new Promise((res) => res(mock));
  return ajax.get('/api/order/query', {}, {
    errorMessage: '订单数据获取失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
