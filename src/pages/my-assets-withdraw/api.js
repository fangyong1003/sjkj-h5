import ajax from '@/common/ajax';
import { Toast } from 'vant';

const { Promise } = window;

export const getAssets = new Promise(res =>
  ajax.get('/api/asset/my', {
    errorMessage: '获取资产数据失败'
  }).then(res)
);

export const getWithdraw = new Promise(res =>
  ajax.get('/api/withdraw/before', {
    errorMessage: '获取提现规则数据失败'
  }).then(res)
);

export const onWithdraw = ({ money, verifyCode, bankId }) => {
  return ajax.post('/api/withdraw/balance', {
    money,
    verifyCode,
    bankId
  }, {
    errorMessage: '提现失败'
  }).catch(() => {
    Toast('提现失败');
    throw err;
  });
};
