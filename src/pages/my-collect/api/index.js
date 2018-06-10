import ajax from '@/common/ajax';

function getFavGoods({ pageNo, pageSize = 10 }) {
  return ajax.get('/v1/fav-item', {
    data: {
      pageNo,
      pageSize
    }
  }, {
    isJson: true
  });
}

export default {
  getFavGoods
};
