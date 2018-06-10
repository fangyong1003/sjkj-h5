import ajax from '@/common/ajax';
import { Toast } from 'vant';
// import mock from './mock';

export const getMembers = (data) => {
  // return new Promise((res) => res(mock));
  const { page = 1, size = 20 } = data;
  return ajax.get('/api/user/my/team', {
    page,
    size
  }, {
    errorMessage: '获取团队数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
