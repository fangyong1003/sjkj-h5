import ajax from '@/common/ajax';
import { Toast } from 'vant';
// import mock from './mock';

export const getDetail = (data) => {
  const { url, noticeId } = data;
  // return new Promise((res) => res(mock));
  return ajax.get(url, {
    noticeId
  }, {
    errorMessage: '获取系统消息数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
