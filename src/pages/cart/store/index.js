import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { INIT_EDIT_SHOPID } from '../constant';

Vue.use(Vuex);

const state = {
  // 购物车中的商品数据
  allShopInfo: [],
  // 当前购物车中选择的商品
  // 数据结构 shopId: Array形式
  currentChosenGoods: {},
  // 正在编辑的店铺
  currentEditShopId: INIT_EDIT_SHOPID,
  // 失效的商品列表
  invalidGoodsList: [],
  // 是否正在加载
  isLoadingData: false
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});
