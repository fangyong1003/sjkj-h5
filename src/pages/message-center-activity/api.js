import ajax from '@/common/ajax';
import { Toast } from 'vant';
// import mock from './mock';

export const getActivity = (data) => {
  const { page = 1, size = 10 } = data;
  // return new Promise((res) => res(mock));
  return ajax.get('/api/message/exhibition/list', {
    page,
    size
  }, {
    errorMessage: '获取活动消息数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const hasRead = (data) => {
  const { noticeId } = data;
  return ajax.post('/api/message/view', {
    data: JSON.stringify([noticeId])
  }, {
    isJson: true
  });
};
