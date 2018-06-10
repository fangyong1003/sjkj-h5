// import { Toast } from 'vant';
import ajax from '@/common/ajax';

export default {
  getGroups(data) {
    const { type, id, pageNo = 1, pageSize = 10 } = data;
    return ajax.post('/v1/item/page', {
      data: {
        [type]: +id,
        pageNo,
        pageSize
      }
    }, {
      isJson: true,
      errorMessage: '获取商品失败'
    });
  },

  getExhibition(id) {
    return ajax.get(`/v1/exhibition/${id}`);
  }
};
