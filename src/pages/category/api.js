import ajax from '@/common/ajax';
import { Toast } from 'vant';
// import mock from './mock';

export const getCategoryNav = () => {
  return ajax.get('/v1/category', {}, {
    errorMessage: '获取分类数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const getCategory = (data) => {
  const { categoryId, pageNo = 1, pageSize = 10 } = data;
  return ajax.post('/v1/item/page', {
    data: {
      categoryId,
      pageNo,
      pageSize
    }
  }, {
    isJson: true,
    errorMessage: '获取商品分类失败'
  });
};

export const getRecommendCategory = () => {
  return ajax.get('', {
    category: 'recommend'
  }, {
    errorMessage: '获取分类数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};
