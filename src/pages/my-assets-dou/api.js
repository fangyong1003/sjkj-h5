import ajax from '@/common/ajax';
import { Toast } from 'vant';

export const getAssets = () => {
  return ajax.get('/api/asset/my', {
    errorMessage: '获取资产数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const onWithdraw = (amount) => {
  return ajax.post('/api/withdraw/credit', {
    amount
  }, {
    errorMessage: '转换失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
