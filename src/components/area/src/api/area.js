import { Toast } from 'vant';
import ajax from '@/common/ajax';

export default {
  requestAreaList(url, parentCode) {
    return ajax.get(url, {
      parentCode
    }, {
      errorMessage: '获取数据失败'
    }).catch((err) => {
      Toast(err);
      throw err;
    });
  }
};
