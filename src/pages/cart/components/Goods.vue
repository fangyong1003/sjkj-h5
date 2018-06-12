<template>
  <div class="goods"
    :class="{'is-editing': isEditing}"
    v-if="goodsNumber > 0">
    <van-cell-swipe :right-width="(isInvalid || isEditing) ? 0 : 60">
      <i
        v-if="!isInvalid"
        class="icon-check"
        :class="{'icon-check-active': isChoose}"
        @click="chooseGoods"></i>
      <div
        class="goods-card">
        <div class="goods-img-wrap" @click="goToGoodsPage">
          <img alt="商品图片" class="goods-img" v-lazy="imgUrl">
        </div>
        <div class="desc-wrap" @click="clickChooseGoods">
          <div class="goods-name" >
            {{goods.item.title}}
          </div>
          <div class="sku-str" :class="{'edit-sku-str': isEditing}">{{ goods.skuValues }}</div>
          <div v-if="!isInvalid" style="display: inline-block;">
            <total-price :total-data="totalData" />
            <p class="desc">{{ goodsDesc }}</p>
          </div>
          <span
            v-if="!isEditing"
            class="num">
            x {{goodsNumber}}
          </span>
          <div
            v-else
            class="input-num">
            <van-step
              v-model="goodsNumber"
              :min="1"
              :max="goods.sku.stock"
              @overlimit="overLimitAction"
            >
            </van-step>
          </div>
          <!-- <div class="err-msg">{{goods.error_msg}}</div> -->
        </div>
      </div>
      <span slot="right">
        <div
          v-if="!isInvalid"
          class="swipe-delete"
          @click="deleteGoods">
          <span>删除</span>
        </div>
      </span>
    </van-cell-swipe>
  </div>
</template>

<script>
  import cloneDeep from 'lodash/cloneDeep';
  import { goToPage, getSellRuleText, getSkuMainValue, getOrderTotal } from '@/common/helpers';
  import TotalPrice from '@/components/total-price';
  import types from '../store/mutation-type';
  import { mapState, mapMutations, mapActions } from 'vuex';
  import { Stepper, CellSwipe } from 'vant';
  import { whereThisGoodsInList } from '../utils';

  export default {
    components: {
      TotalPrice,
      'van-step': Stepper,
      'van-cell-swipe': CellSwipe
    },

    props: {
      goods: Object,
      shopId: Number,
      isInvalid: Boolean,
      isActivity: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      ...mapState(['currentChosenGoods', 'currentEditShopId', 'allShopInfo']),

      goodsNumber: {
        get() {
          return this.goods.quantity;
        },
        set(val) {
          this.numberChangeAction(val);
        }
      },

      totalData() {
        const data = cloneDeep(this.goods);
        data.quantity = 1;
        return getOrderTotal([[data]]);
      },

      goodsDesc() {
        const diamond = this.totalData.totalDiamond;
        let desc = `购买可获得${diamond}食间豆`;
        if (this.totalData.ruleType === 0 && +diamond > 0) {
          desc = `现金或余额支付可获得${diamond}食间豆`;
        }
        return desc;
      },

      price() {
        const value = getSkuMainValue(this.goods.sku);
        return value;
      },

      ruleText() {
        if (!this.goods.sku.sellPriceRule) return '';
        return getSellRuleText(this.goods.sku.sellPriceRule);
      },

      imgUrl() {
        return this.goods.item.photos[0];
      },

      isChoose() {
        // 当前商品是否选中
        if (!this.currentChosenGoods[this.shopId]) return;

        return whereThisGoodsInList(this.currentChosenGoods[this.shopId], this.goods) !== -1;
      },

      isEditing() {
        // 当前店铺是否处于编辑状态
        return +this.currentEditShopId === this.shopId;
      }
    },

    methods: {
      ...mapActions(['setGoodsNumAction', 'deleteGoodsAction']),
      ...mapMutations({
        updateCurrentChosen: types.UPDATE_CURRENT_CHOSEN,
        updateCurrentEditShopId: types.UPDATE_CURRENT_EDIT_KDT_ID
      }),

      chooseGoods() {
        const type = this.isChoose ? 'remove' : 'add';
        const payloads = {
          shopId: this.shopId,
          goods: this.goods,
          type
        };

        this.updateCurrentChosen(payloads);
      },

      clickChooseGoods() {
        // 非编辑状态下，非失效商品点击区域选中商品
        if ((+this.currentEditShopId < 0) && !this.isInvalid) {
          this.chooseGoods();
        }
        return;
      },

      overLimitAction() {
        //  超出库存
        // if (this.goodsNumber >= this.goods.stock_num) {
        //   Toast('就这么几件啦~');
        // }
      },

      numberChangeAction(val) {
        this.setGoodsNumAction({
          val,
          goods: this.goods,
          isActivity: this.isActivity
        });
      },

      deleteGoods() {
        this.deleteGoodsAction({
          goods: this.goods
        });
      },

      goToGoodsPage() {
        // 处于编辑状态则不跳
        if (+this.currentEditShopId >= 0) return;
        // 点击商品图片时所做的操作
        goToPage('goods', {
          id: this.goods.itemId
        });
      }
    }
  };
</script>

<style>
  @import "../common.pcss";

  .goods {
    margin-bottom: 10px;
    position: relative;
    background: #fff;

    &:last-child {
      margin-bottom: 0;
    }

    .icon-check {
      height: 112px;
      width: 40px;
      margin-right: 0;
    }

    .goods-img-wrap {
      width: 90px;
      height: 90px;
      float: left;
      position: relative;
      margin-left: auto;
      margin-right: auto;
      overflow: hidden;
      background-size: cover;
    }

    .goods-img {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }

    .input-num {
      position: absolute;
      right: 0;
      bottom: 0;
    }

    .goods-card {
      box-sizing: border-box;
      min-height: 112px;
      padding: 9px 10px 9px 0;
      margin-left: 40px;

      a {
        display: block;
      }
    }

    .goods-name {
      color: #333;
      font-size: 14px;
      line-height: 20px;
      height: 20px;
      overflow:hidden;
     text-overflow:ellipsis;
     white-space:nowrap
    }

    .desc-wrap {
      position: relative;
      margin-left: 98px;
    }

    .sku-str {
      margin: 5px 0;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #999;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .edit-sku-str {
      width: 160px;
    }

    .goods-price {
      font-size: 14px;
      color: #f00;
      height: 20px;
      line-height: 20px;
      display: inline-block;
    }

    .goods-rule-price {
      margin-left: 10px;
      color: #999;
    }

    .desc {
      color: #6b6b6b;
      padding:5px 5px;
      font-size: 12px;
      border-radius:3px;
      background: #F7F7F7;
    }

    .num {
      font-size: 14px;
      float: right;
      color: #666;
      line-height: 20px;
    }

    .err-msg {
      font-size: 12px;
      color: #f60;
      line-height: 18px;
      margin-top: 3px;
    }

    .delete-btn {
      width: 60px;
      height: 100%;
      background: #ff4343;
      color: #fff;
      position: absolute;
      right: 0;
      top: 0;
      display: none;

      span {
        font-size: 12px;
        left: 20px;
        position: absolute;
        top: 50%;
        margin-top: -6px;
      }
    }
  }

  .is-editing {

    .delete-btn {
      display: block;
    }
  }

  .swipe-delete {
    height: 100%;
    width: 60px;
    text-align: center;
    background: #ff4343;
    color: #fff;
    line-height: 1;
    font-size: 12px;

    span {
      font-size: 12px;
      left: 20px;
      position: absolute;
      top: 50%;
      margin-top: -6px;
    }
  }
</style>
