import ajax from '@/common/ajax';
import { Toast } from 'vant';

const { Promise } = window;

export const getBankList = new Promise(res =>
  ajax.get('/api/bank/support', {
    errorMessage: '获取银行卡列表数据失败'
  }).then(res)
);
export const getMyBankList = new Promise(res =>
  ajax.get('/api/bank/my', {
    errorMessage: '获取我的银行卡列表数据失败'
  }).then(res)
);
