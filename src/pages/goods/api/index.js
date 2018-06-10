import { Toast } from 'vant';
import ajax from '@/common/ajax';
import LocalStroage from '@/common/utils/local_storage';
import { goToPage } from '@/common/helpers';

export const getGoods = (id, exhibitionId) => {
  const url = exhibitionId
    ? `/v1/exhibition/${exhibitionId}/item/${id}`
    : `/v1/item/${id}`;
  return ajax.get(url, {}, {
    errorMessage: '获取商品数据失败'
  }).catch((err) => {
    Toast(err);
    throw err;
  });
};

export const postFavGoods = (id) => {
  return ajax.post('/v1/fav-item', {
    data: {
      itemId: id
    }
  }, {
    isJson: true
  });
};

export const getFavGoods = (id) => {
  return ajax.get(`/v1/fav-item/${id}`);
};

export const deleteFavGoods = (id) => {
  return ajax.delete(`/v1/fav-item/${id}`, {}, {
    isJson: true
  });
};

export const getCartCount = () => {
  return ajax.get(`/v1/cart/count`);
};

export const goToConfirm = (goodsData, orderData) => {
  const data = [{
    goodsData,
    orderData
  }];
  LocalStroage.setItem('goods', JSON.stringify(data));

  goToPage('confirm');
};

export const addToCart = (data) => {
  console.log(data);

  return ajax.post('/v1/cart', {
    data: {
      // buyerId: 1,
      ...data
    }
  }, {
    isJson: true,
    errorMessage: '加入购物车失败'
  });
};
