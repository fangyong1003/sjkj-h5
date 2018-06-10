import ajax from '@/common/ajax';
import { Toast } from 'vant';

export const getBankList = () => {
  return ajax.get('/api/bank/support', {
    errorMessage: '获取银行卡列表数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const addBank = ({ bankCategory, bank, bankNum, username, identity }) => {
  return ajax.post('/api/bank/add', {
    bankCategory,
    bankName: bank,
    bankCard: bankNum,
    bankOwner: username,
    ownerIdentityCard: identity
  }, {
    errorMessage: '添加银行卡失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
