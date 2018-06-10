<template>
  <div class="shop" v-if="shopInfo.goodsList.length">
    <div class="title">
      <i
        class="icon-check"
        :class="{'icon-check-active': isAllchoose}"
        @click="chooseAllShop"
      ></i>
      <span class="shop-name">{{shopInfo.title}}</span>
      <span class="edit" @click="edit">{{editText}}</span>
    </div>
<!--
    <activity-goods
      v-for="(activityInfo, index) in activityInfoList"
      :class="{'no-gap': (activityInfo.goodsList.length === shopInfo.goodsList.length)}"
      :shopId="shopInfo.shopId"
      :activityInfo="activityInfo"
      :key="index">
    </activity-goods> -->

    <div class="goods-list" v-if="normalGoodsList.length">
      <goods
        :goods="goods"
        :shopId="shopInfo.shopId"
        :isInvalid="false"
        v-for="(goods, index) in normalGoodsList"
        :key="index">
      </goods>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import Goods from './Goods';
  import ActivityGoods from './ActivityGoods';
  import each from 'lodash/each';
  import filter from 'lodash/filter';
  import types from '../store/mutation-type';
  import { whereThisGoodsInList } from '../utils';
  import { INIT_EDIT_SHOPID } from '../constant';

  export default {
    props: {
      shopInfo: Object
    },

    components: {
      'goods': Goods,
      'activity-goods': ActivityGoods
    },

    methods: {
      ...mapMutations({
        readCheckInLS: types.READ_CURRENT_CHOSEN_LS,
        updateCurrentChosen: types.UPDATE_CURRENT_CHOSEN,
        updateCurrentEditShopId: types.UPDATE_CURRENT_EDIT_KDT_ID,
        clearCurrentChosen: types.CLEAR_CURRENT_CHOSEN
      }),

      chooseAllShop() {
        // 全选或者全不选
        const type = this.isAllchoose ? 'remove' : 'add';
        each(this.shopInfo.goodsList, goods => {
          const payloads = {
            shopId: this.shopInfo.shopId,
            goods: goods,
            type
          };

          this.updateCurrentChosen(payloads);
        });
      },

      edit() {
        if (!this.editText) return;
        const payload = (this.editText === '编辑') ? this.shopInfo.shopId : INIT_EDIT_SHOPID;
        this.updateCurrentEditShopId(payload);
        if (this.currentEditShopId >= 0) {
          // 从正常状态切换到编辑状态
          this.clearCurrentChosen();
        } else {
          // 从编辑状态到正常状态
          this.readCheckInLS();
        }
      }
    },

    computed: {
      ...mapState(['currentChosenGoods', 'currentEditShopId']),

      isAllchoose() {
        // 选择数量与当前店铺商品数量
        const shop = this.shopInfo;
        if (!this.currentChosenGoods[shop.shopId]) return;
        return shop.goodsList.length === this.currentChosenGoods[shop.shopId].length;
      },

      editText() {
        if (this.currentEditShopId < 0) return '编辑';
        if (this.currentEditShopId === this.shopInfo.shopId) {
          return '完成';
        } else {
          return '';
        }
      },

      activityInfoList() {
        return [];
        // const activityList = this.shopInfo.activity_info.goods_activity_filter_info_list;
        // if (!activityList) return;
        // const activityInfoList = [];
        // const activityNameMap = {
        //   '104': 'packageBuy',
        //   '101': 'meetReduce'
        // };
        // // 组合出活动信息，以及根据goodsid-skuid查出活动商品
        // each(activityList, activity => {
        //   // activity 代表单个活动
        //   const activityInfo = activity;
        //   /* eslint-disable */
        //   activityInfo.activity_type = activityNameMap[activityInfo.activity_type];
        //   let goodsList = [];
        //   goodsList = filter(this.shopInfo.goodsList, goods => {
        //     return (whereThisGoodsInList(activity.goodsList, goods) !== -1);
        //   });

        //   activityInfo.goodsList = goodsList;
        //   /* eslint-enable */
        //   activityInfoList.push(activityInfo);
        // });
        // // 同时刷新当前普通商品的一些数据
        // return activityInfoList;
      },

      normalGoodsList() {
        // 遍历活动商品，并将它们过滤
        let activityGoods = [];
        let normalGoodsList = [];

        each(this.activityInfoList, activity => {
          activityGoods = activityGoods.concat(activity.goodsList);
        });

        normalGoodsList = filter(this.shopInfo.goodsList, goods => {
          return whereThisGoodsInList(activityGoods, goods) === -1;
        });

        // 获取过滤后的数组 但是不要改变shop的数据
        return normalGoodsList;
      }
    }
  };
</script>

<style>
  @import "../common.pcss";
  @import "mixins";

  .shop {
    margin-bottom: 12px;

    .title {
      color: #999;
      font-size: 18px;
      height: 52px;
      padding: 0 0 0 10px;
      line-height: 52px;
      position: relative;
      margin-bottom: 10px;
      background: #fff;

      &::after {
        @mixin border-retina (bottom);
      }

      .icon-check {
        margin-right: 10px;
      }

      .shop-name {
        display: inline-block;
        font-size: 17px;
        color: #333;
        vertical-align: top;
        line-height: 50px;
      }

      .edit {
        color: #38f;
        float: right;
        font-size: 14px;
        padding: 0 10px;
      }
    }

    .shop-tips {
      border-top: 1px solid #f9ecb5;
      border-bottom: 1px solid #f9ecb5;
      font-size: 12px;
      line-height: 16px;
      padding: 10px;
      color: #f09000;
      background-color: #fdf8e4;
      text-align: center;
    }

    .goods-list {
      padding-bottom: 10px;
    }
  }
</style>
