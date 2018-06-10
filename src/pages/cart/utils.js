import findIndex from 'lodash/findIndex';
import YZLocalStorage from '@/common/utils/local_storage';
import each from 'lodash/each';
// 在一个商品列表中查找某个商品的索引
const whereThisGoodsInList = (list, goods) => {
  const index = findIndex(list, item => item.id === goods.id && item.skuId === goods.skuId);
  return index;
};

// 从内存中移除某一项
const removeFromLS = (goods) => {
  const chosenGoods = JSON.parse(YZLocalStorage.getItem('current-chosen') || '[]');
  const alias = goods.shopId + '-' + goods.id + '-' + goods.skuId;
  const index = chosenGoods.indexOf(alias);
  if (index !== -1) {
    chosenGoods.splice(index, 1);
  }
  YZLocalStorage.setItem('current-chosen', JSON.stringify(chosenGoods));
};

// 根据kdtid goodsid skuid 在所有商品中找出
const findByIds = (goodsList, allShopInfo) => {
  const currentChosenGoods = {};
  each(goodsList, item => {
    const [shopId, goodsId, skuId] = item.split('-');
    each(allShopInfo, shop => {
      if (shop.shopId === +shopId) {
        each(shop.goodsList, goods => {
          if (goods.id === +goodsId && goods.skuId === +skuId) {
            if (!currentChosenGoods[shopId]) currentChosenGoods[shopId] = [];
            currentChosenGoods[shopId].push(goods);
          }
        });
      } else {
        return;
      }
    });
  });
  return currentChosenGoods;
};

const hasDiffTypeInList = (list, goods) => {
  try {
    const index = findIndex(list, item => item.sku.sellPriceRule.type !== goods.sku.sellPriceRule.type);
    return index > -1;
  } catch (e) {
    return true;
  }
};

export {
  hasDiffTypeInList,
  whereThisGoodsInList,
  removeFromLS,
  findByIds
};
