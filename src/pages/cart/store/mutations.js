import { Toast } from 'vant';
import types from './mutation-type';
import Vue from 'vue';
import each from 'lodash/each';
import YZLocalStorage from '@/common/utils/local_storage';
import { whereThisGoodsInList, hasDiffTypeInList, removeFromLS, findByIds } from '../utils';

const mutations = {
  [types.UPDATE_CART_DATA]: (state, payload) => {
    state.allShopInfo = payload;
  },

  [types.UPDATE_INVALID_GOODS_LIST]: (state) => {
    // 遍历每个店铺的失效商品，生成对应的失效商品列表
    let invalidGoodsList = [];
    each(state.allShopInfo, shop => {
      invalidGoodsList = invalidGoodsList.concat(shop.unavailable_goods_list);
    });
    state.invalidGoodsList = invalidGoodsList;
  },

  [types.UPDATE_CURRENT_CHOSEN]: (state, payload) => {
    // 添加商品还是清除商品，如果是非编辑状态要把选择的操作写到内存里
    const { shopId } = payload;
    const { currentEditShopId } = state;

    if (payload.type === 'add') {
      const shopGoods = state.currentChosenGoods[payload.shopId] || [];
      // 购物车中有不同支付类型的商品
      if (hasDiffTypeInList(shopGoods, payload.goods) && currentEditShopId !== shopId) {
        Toast('不能同时购买不同支付类型的商品');
        return;
      }
      // 如果当前选择数组中不包含这一项
      if (whereThisGoodsInList(shopGoods, payload.goods) === -1) {
        shopGoods.push(payload.goods);
      } else {
        return;
      }
      Vue.set(state.currentChosenGoods, shopId, shopGoods);
    } else {
      const shopGoods = state.currentChosenGoods[shopId];
      const index = whereThisGoodsInList(shopGoods, payload.goods);
      if (index === -1) return;
      shopGoods.splice(index, 1);
      Vue.set(state.currentChosenGoods, shopId, shopGoods);
    }
    // 非编辑状态下在update 这个mutaion 发生时存入localstorage
    if (!state.currentEditShopId) {
      const goodsList = [];
      each(state.currentChosenGoods, (shop, shopId) => {
        each(shop, goods => {
          const alias = shopId + '-' + goods.id + '-' + goods.skuId;
          goodsList.push(alias);
        });
      });
      YZLocalStorage.setItem('current-chosen', JSON.stringify(goodsList));
    }
  },

  [types.UPDATE_CURRENT_EDIT_KDT_ID]: (state, payload) => {
    state.currentEditShopId = payload;
  },

  [types.CLEAR_INVALID_GOODS_LIST]: (state) => {
    state.invalidGoodsList = [];
  },

  [types.CLEAR_CURRENT_CHOSEN]: (state) => {
    // 编辑状态下清除原来的勾选状态
    state.currentChosenGoods = {};
  },

  [types.UPDATE_SHOP_INFO_GOODS_DATA]: (state, payload) => {
    // payload = {kdtid, goods, num}
    each(state.allShopInfo, shop => {
      if (shop.shopId === payload.shopId) {
        const index = whereThisGoodsInList(shop.goodsList, payload.goods);
        if (index !== -1) {
          if (payload.num !== 0) {
            shop.goodsList[index].quantity = payload.num;
          } else {
            // 如果为空，直接删除这一项
            shop.goodsList.splice(index, 1);
            // shop.goodsList[index].num = 0;
            // 并且在内存中删除这一项
            removeFromLS(payload.goods);
          }
        }
      }
      return;
    });
  },

  [types.UPDATE_IS_LOADING_DATA]: (state, val) => {
    state.isLoadingData = val;
  },

  [types.READ_CURRENT_CHOSEN_LS]: (state, val) => {
    // 如果是在编辑状态下读取，不要执行
    if (state.currentEditShopId >= 0) return;

    // 如果有再来一单逻辑，则优先考虑再来一单，并清除老的所有勾选
    let goodsList = JSON.parse(YZLocalStorage.getItem('current-chosen') || '[]');
    const buyAgain = JSON.parse(window.sessionStorage.getItem('buyAgain') || '{}');

    const buyAgainGoodsList = [];
    // 按照规定格式生成勾选
    each(buyAgain.goodsList, goods => {
      const shopId = buyAgain.shopId;
      buyAgainGoodsList.push(shopId + '-' + goods.id + '-' + goods.skuId);
    });

    if (buyAgainGoodsList.length > 0) {
      goodsList = buyAgainGoodsList;
      YZLocalStorage.removeItem('current-chosen');
    }

    const currentChosenGoods = findByIds(goodsList, state.allShopInfo);
    state.currentChosenGoods = currentChosenGoods;
  },

  [types.UPDATE_ACTIVITY_INFO]: (state, payload) => {
    // payload.shopId 更新的店铺ID
    // payload.activityInfo 更新店铺的活动信息
    each(state.allShopInfo, shop => {
      if (shop.shopId === payload.shopId) {
        /* eslint-disable */
        shop.activity_info = payload.activityInfo;
        /* eslint-enable */
      }
    });
  }
};

export default mutations;
