import each from 'lodash/each';
import { getOrderTotal } from '@/common/helpers';

const getters = {
  cartBottomData: (state, getters) => {
    const result = getOrderTotal(state.currentChosenGoods);

    if (getters.allShopGoodsNum === result.num) {
      result.allChoose = true;
    }
    return result;
  },

  allShopGoodsNum: (state) => {
    let totalNum = 0;
    each(state.allShopInfo, shop => {
      totalNum += shop.goodsList.length;
    });
    return totalNum;
  },

  shopNameMap: (state) => {
    // currentChosen中键是由shopId 组成的，需要一个店铺名map
    const shopNameMap = {};
    each(state.allShopInfo, shop => {
      shopNameMap[shop.shopId] = shop.title;
    });

    return shopNameMap;
  }
};

export default getters;

