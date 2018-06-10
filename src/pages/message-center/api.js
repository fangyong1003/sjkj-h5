import ajax from '@/common/ajax';
import { Toast } from 'vant';
// import mock from './mock';

export const getMessage = () => {
  // return new Promise((res) => res(mock));
  return ajax.get('/api/message/count', {}, {
    errorMessage: '获取资产数据失败'
  });
};
