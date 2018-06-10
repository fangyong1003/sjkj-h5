import ajax from '@/common/ajax';
import { Toast } from 'vant';

export const getRule = () => {
  return ajax.get('/api/member/rules', {}, {
    errorMessage: '获取升级数据失败'
  });
};
