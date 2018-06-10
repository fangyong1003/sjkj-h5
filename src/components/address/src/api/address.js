import { Toast } from 'vant';
import ajax from '@/common/ajax';

export default {
  requestAddressList(url) {
    return ajax.get(url).catch((err) => {
      Toast(err);
      throw err;
    });
  },

  requestDeleteAddress(url, requestData) {
    return ajax.post(url, {
      ...requestData
    });
  },

  requestAddEditAddress(url, requestData) {
    return ajax.post(url, {
      ...requestData
    });
  }
};
