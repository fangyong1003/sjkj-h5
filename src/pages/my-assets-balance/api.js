import ajax from '@/common/ajax';
import { Toast } from 'vant';
// import mock from './mock';

export const getAssets = () => {
  return ajax.get('/api/asset/my', {
    errorMessage: '获取资产信息失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const getBalance = (data) => {
  const { page = 1, size = 10 } = data;
  // return new Promise((res) => res(mock));
  return ajax.get('/api/asset/balance', {
    page,
    size
  }, {
    errorMessage: '获取余额数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
