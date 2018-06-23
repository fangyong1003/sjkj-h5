import ajax from '@/common/ajax';
import { Toast } from 'vant';
// import mock from '../mock';

export const getGoldRule = () => {
  return ajax.get('/api/asset/credit', {
    errorMessage: '获取食间豆规则失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const getDiamonds = ({ url, page }) => {
  // return new Promise((res) => res(mock));
  return ajax.get(url, {
    page,
    size: 10
  }, {
    errorMessage: '获取食间豆数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
