import ajax from '@/common/ajax';
import {
  QUERY_GOODS_URL,
  BATCH_DELETE_URL
} from '../constant';
// import mock from '../mock';

// 获取购物车相关的信息
function getCart() {
  return ajax.get(QUERY_GOODS_URL);
  // return Promise.resolve(mock);
}

// 设置数量时，patch 给后端
function setNum(shopId, goodsId, skuId, storeId, num) {
  return ajax.put(QUERY_GOODS_URL, {
    data: {
      items: [{
        id: goodsId,
        quantity: num
      }]
    }
  }, {
    isJson: true
  });
}

// 删除商品
function deleteGoods(shopId, goodsId) {
  return batchDeleteGoods([{ id: goodsId }]);
}

// 批量删除
function batchDeleteGoods(goodsList) {
  const deleteList = goodsList.map(goods => goods.id);

  return ajax.delete(BATCH_DELETE_URL, {
    data: {
      ids: deleteList
    }
  }, {
    isJson: true
  });
}

export {
  getCart,
  setNum,
  deleteGoods,
  batchDeleteGoods
};
