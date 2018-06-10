import ajax from '@/common/ajax';
// import { Toast } from 'vant';
// import mock from './mock';

export const getRightsInfo = () => {
  // return new Promise((res) => res(mock));
  return ajax.get('/api/member/rights', {}, {
    errorMessage: '获取会员权益数据失败'
  });
};