import ajax from '@/common/ajax';
import { Toast } from 'vant';

export const getInvite = () => {
  return ajax.get('/api/weixin/invite', {}, {
    errorMessage: '获取邀请人数据失败'
  });
};
