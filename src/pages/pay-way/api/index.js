import { Toast } from 'vant';
import ajax from '@/common/ajax';
import Args from '@/common/utils/args';
import YZLocalStorage from '@/common/utils/local_storage';

const payMap = {
  ali: '/api/order/pay/h5',
  weixin: '/api/order/pay/h5',
  jiuzhou: '/api/order/pay/property',
  dianshi: '/api/order/pay/credits',
  balance: '/api/order/pay/balance'
};

const ids = Args.get('orderIds');
const idArr = JSON.stringify(ids.split(','));

export default {
  pay(type) {

    return ajax.post(payMap[type], {
      data: idArr
    }, {
      isJson: true,
      errorMessage: '支付失败'
    }).catch((err) => {
      Toast(err);
      throw err;
    });
  },

  payPreview() {
    return ajax.post('/api/payment/preview', {
      data: idArr
    }, {
      isJson: true
    });
  },

  postCode(code){
    return ajax.post('/api/weixin/openid', {
      code:code
    }, {
      errorMessage: '失败'
    }).then((resp) => {
      let user = JSON.parse(YZLocalStorage.getItem('user') || '{}');
      user.openId = resp.openId
      YZLocalStorage.setItem('user',JSON.stringify(user));
    }).catch((err) => {
      Toast(err);
      throw err;
    });
  },


};
