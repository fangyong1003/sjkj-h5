import ajax from '@/common/ajax';
import { Toast } from 'vant';
// import mock from './mock';

export const getJzbRule = () => {
  return ajax.get('/api/asset/property', {
    errorMessage: '获取点石头金红包失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const getJzb = ({ url, page }) => {
  // return new Promise((res) => res(mock));
  return ajax.get(url, {
    page,
    size: 10
  }, {
    errorMessage: '获取数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const exchangeJZB = (amount) => {
  return ajax.post('/api/asset/property/exchange_to_credit', {
    amount
  }, {
      errorMessage: '兑换点石金失败'
    }).catch((err) => {
      Toast(err);
      throw err;
    });
};
