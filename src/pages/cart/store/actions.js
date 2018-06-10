import recommendApi from '@/common-api/recommend';
import * as api from '../api';
import types from './mutation-type';
import { Toast, Dialog } from 'vant';
import each from 'lodash/each';

const actions = {
  getRecommendList: ({ commit, dispatch }) => {
    return recommendApi.getRecommendList().then((resp) => {
      return resp.result.data;
    });
  },

  getCartDataAction: ({ commit, dispatch }) => {
    // 初始化从后端读购物车数据
    // 生成所有店铺数据
    // 生成失效商品列表
    // 从内存中读取勾选状态
    // 当加载完成后，清除掉loading 状态
    Toast.loading();
    commit(types.UPDATE_IS_LOADING_DATA, true);
    api.getCart().then(resp => {
      Toast.clear();
      resp.result.forEach(goods => {
        goods.shopId = goods.item.shopId;
        goods.skuValues = goods.sku.specs.map(spec => spec.value.valueName).join('，');
      });
      commit(types.UPDATE_CART_DATA, [
        { goodsList: resp.result, shopId: 0, unavailable_goods_list: [] }
      ]);
      commit(types.UPDATE_INVALID_GOODS_LIST);
      commit(types.READ_CURRENT_CHOSEN_LS);
      commit(types.UPDATE_IS_LOADING_DATA, false);
    }).catch(() => {
      Toast('加载购物车出错，请重试');
    });
  },

  setGoodsNumAction: ({ commit, dispatch }, payload) => {
    /* eslint-disable */
    const { shopId, id, skuId, store_id } = payload.goods;
    commit(types.UPDATE_SHOP_INFO_GOODS_DATA, {
      shopId: shopId,
      goods: payload.goods,
      num: payload.val
    });

    if (payload.isActivity) {
      dispatch('updateActivityInfoAction', shopId);
    }
console.log(payload, 'update cart num');
    // 先把数据刷新掉，如果后端那边出错了，再通过getCart 刷新回来
    api.setNum(shopId, id, skuId, store_id, payload.val).catch(() => {
      Toast('设置商品数量出错，请重试');
      dispatch('getCartDataAction');
    });
    /* eslint-enable */
  },

  deleteGoodsAction: ({ commit, state, dispatch }, payload) => {
    /* eslint-disable */
    const { shopId, id, skuId, store_id } = payload.goods;
    Dialog.confirm({
      message: '确定要删除该商品么?'
    }).then(resp => {
      if (resp === 'confirm') {
        api.deleteGoods(shopId, id, skuId, store_id).then(resp => {
          dispatch('deleteSingleGoodsAction', payload.goods);
          Dialog.close();
        }).catch(() => {
          Toast('删除商品出错，请重试');
        });
      }
    }).catch(() => {
      Dialog.close();
    });
  },

  batchDeleteGoodsAction: ({ commit, state, dispatch }, payload) => {
    console.log(payload)
    // 深拷贝一次
    const toDeleteGoodsList = JSON.parse(JSON.stringify(state.currentChosenGoods[state.currentEditShopId]));
    Dialog.confirm({
      message: `确定删除所选的${toDeleteGoodsList.length}个商品？`
    }).then(resp => {
      if (resp === 'confirm') {
        Toast.loading();
        api.batchDeleteGoods(toDeleteGoodsList).then(resp => {
          // 遍历顶层数据商品，将删除的商品设为0
          each(toDeleteGoodsList, goods => {
            dispatch('deleteSingleGoodsAction', goods);
          });
          Toast.clear();
          Dialog.close();
        }).catch(err => {
          console.log(err);
          Toast('批量删除出错，请重试');
        });
      }
    }).catch(() => {
      Dialog.close();
    });
  },

  updateActivityInfoAction: ({ commit }, shopId) => {
    // 更新购物车对应店铺的活动信息
    let activityInfo = {};
    api.getCart().then(resp => {
      if (resp.code === 0) {
        each(resp.data, shop => {
          if (shop.shopId === shopId) {
            activityInfo = shop.activity_info;
          }
        });
        commit(types.UPDATE_ACTIVITY_INFO, {
          shopId,
          activityInfo
        });
      }
    });
  },

  deleteSingleGoodsAction: ({ commit, state, dispatch }, goods) => {
    // 设置这个商品数量为0，
    // 清除这个商品的勾选状态，
    // 检查当前店铺是不是已经没有商品了，如果是需要清除编辑状态, 并且读取内存中勾选
    /* eslint-disable */
    const { shopId, id, skuId, store_id } = goods;
    commit(types.UPDATE_SHOP_INFO_GOODS_DATA, {
      shopId: shopId,
      goods: goods,
      num: 0
    });
    // 清除当前的勾选状态
    const changes = {
      shopId: shopId,
      goods: goods,
      type: 'remove'
    };
    commit(types.UPDATE_CURRENT_CHOSEN, changes);
    // 检查当前店铺是否已经没有商品，如果是，则清除掉编辑状态
    each(state.allShopInfo, shop => {
      if (shop.shopId === shopId && shop.goodsList.length === 0) {
        commit(types.UPDATE_CURRENT_EDIT_KDT_ID, '');
        commit(types.READ_CURRENT_CHOSEN_LS);
      }
      /* eslint-enable */
    });
  }
};

export default actions;
