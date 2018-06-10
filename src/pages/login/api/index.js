import ajax from '@/common/ajax';
import { Toast } from 'vant';

export const login = ({ mobile, code }) => {
  return ajax.post('/api/user/login', {
    mobile,
    verify_code: code
  }, {
    errorMessage: '登录失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
