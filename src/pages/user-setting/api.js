import ajax from '@/common/ajax';
import { Toast } from 'vant';

export const addBank = ({ nick_name, head_img_url, birthday, sex, account }) => {
  return ajax.post('/api/user/modify_basic_info', {
    nick_name,
    head_img_url,
    birthday,
    sex,
    account
  }, {
    errorMessage: '保存用户信息失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
