import ajax from '@/common/ajax';
import { Toast } from 'vant';

export const feedback = (content) => {
  return ajax.post('/api/user/feedback', {
    content
  }, {
    errorMessage: '提交失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
