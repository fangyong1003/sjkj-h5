import ajax from '@/common/ajax';
import { Toast } from 'vant';

export const sendVerifyCode = (mobile, imgCheckCode) => {
  return ajax.post('/api/sms/send_verify_code', {
    type: 'BALANCE_WITHDRAW',
    imgCheckCode
  }, {
    errorMessage: '验证码发送失败'
  });
};
