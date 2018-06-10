import ajax from '@/common/ajax';

function getRecommendList() {
  return ajax.post('/v1/item/page', {
    data: {
      sortedByScore: true
    }
  }, {
    isJson: true
  });
}

export default {
  getRecommendList
};
