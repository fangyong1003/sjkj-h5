import ajax from '@/common/ajax';
import { Toast } from 'vant';
import mock from './mock';

export const getVipInfo = () => {
  // return new Promise((res) => res(mock));
  return ajax.get('/api/member/my', {}, {
    errorMessage: '获取会员数据失败'
  });
};

export const upgrade = () => {
  return ajax.get('/api/member/upgrade', {}, {
    errorMessage: '升级会员失败'
  });
}