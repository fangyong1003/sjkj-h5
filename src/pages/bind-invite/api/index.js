import { Toast } from 'vant';
import ajax from '@/common/ajax';

export default {
  bindInvite(mobile) {
    return ajax.get('/api/user/bind_inviter', {
      mobile
    }, {
      errorMessage: '绑定邀请人失败'
    }).catch((err) => {
      Toast(err);
      throw err;
    });
  }
};
