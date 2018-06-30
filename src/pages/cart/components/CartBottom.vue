<template>
  <div class="cart-bottom">
    <div class="select-all" @click="chooseAll">
      <span
        class="icon-check"
        :class="{'icon-check-active': cartBottomData.allChoose}">
      </span>全选
    </div>
    <div class="button-wrap">
      <div
        v-if="currentEditShopId < 0"
        class="total-price"
        :class="{'total-price-active': cartBottomData.mainValues.length }">
        <template v-if="cartBottomData.ruleType === 0 && cartBottomData.mainValues.length">
          <span
            v-for="(mainValue, index) in cartBottomData.mainValues"
            :key="index"
            :class="`price-num price-num--${mainValue.key}`"
          >
            <span class="price-num__prefix">{{ mainValue.prefix }}</span>
            <span class="price-num__value">{{ mainValue.value | cent2yuan }}</span>
            <span class="price-num__suffix">{{ mainValue.suffix }}</span>
          </span>
        </template>
        <p v-else class="price-num">{{cartBottomData.totalPrice}}</p>
        <p class="desc">{{ cartBottomDesc }}</p>
      </div>
      <button
        v-if="currentEditShopId < 0"
        class="bottom-button"
        :class="{'bottom-button-active': canPay}"
        @click="goPay">
          <p class="bottom-button__pay-text">下单</p>
          <span>已选{{cartBottomData.num}}件</span>
      </button>
      <button
        v-else
        class="bottom-button"
        :class="{'bottom-button-active': currentEditShopId >= 0 && currentChosenGoods[currentEditShopId] && currentChosenGoods[currentEditShopId].length}"
        @click="batchDeleteGoodsAction">
          删除
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
  import each from 'lodash/each';
  import { goToPage, cent2yuan } from '@/common/helpers';
  import LocalStroage from '@/common/utils/local_storage';
  import { IS_CROSS_SHOP_CART } from '../constant';
  import types from '../store/mutation-type';

  const currentShopShopId = 0;
  export default {
    data() {
      return {
        showSeperatePopup: false,
        sepratePayType: 'multishop',
        isCrossShopCart: IS_CROSS_SHOP_CART
      };
    },

    filters: {
      cent2yuan
    },

    computed: {
      ...mapState(['currentChosenGoods', 'currentEditShopId', 'allShopInfo']),
      ...mapGetters(['cartBottomData', 'shopNameMap']),
      canPay() {
        return (this.cartBottomData.num > 0);
      },
      cartBottomDesc() {
        const diamond = this.cartBottomData.totalDiamond;
        let desc = `购买可获得${diamond}食间豆`;
        if (this.cartBottomData.ruleType === 0 && +diamond > 0) {
          desc = `现金支付可获得${diamond}食间豆`;
        }
        return desc;
      }
    },

    methods: {
      ...mapActions(['batchDeleteGoodsAction']),
      ...mapMutations({
        updateCurrentChosen: types.UPDATE_CURRENT_CHOSEN
      }),

      chooseAll() {
        const type = this.cartBottomData.allChoose ? 'remove' : 'add';

        each(this.allShopInfo, shop => {
          each(shop.goodsList, goods => {
            const payloads = {
              shopId: shop.shopId,
              goods: goods,
              type
            };
            this.updateCurrentChosen(payloads);
          });
        });
      },

      goPay() {
        if (!this.isCrossShopCart) {
          // 提交当前店铺选中的商品
          this.checkMixSubmit(currentShopShopId);
        } else {
          // 跨店购物车分开结算
          const payShopList = [];
          each(this.currentChosenGoods, (shop, shopId) => {
            if (shop.length > 0) payShopList.push(shopId);
          });
          this.checkMixSubmit(currentShopShopId);
        }
      },

      checkMixSubmit(shopId) {
        // 拆单结算弹出层点击结算
        this.submitOrder(shopId);
      },

      submitOrder(shopId, type) {
        const submitGoodsList = this.currentChosenGoods[shopId] || [];
        const goodsData = [];
        const orderData = [];
console.log(submitGoodsList)

        submitGoodsList.forEach(goods => {
          goodsData.push({
            image: goods.item.photos[0],
            sellPriceRule: goods.sku.sellPriceRule,
            sku: {
              sellPriceRule: goods.sku.sellPriceRule,
              diamondYuan: goods.sku.diamondYuan
            },
            goodsNumber: goods.quantity,
            goodsCreditsString: goods.sku.diamondYuan,
            sellPriceString: goods.sku.sellPriceYuan,
            goodsAmountString: (goods.sku.sellPriceYuan * goods.quantity).toFixed(2),
            goodsTitle: goods.item.title,
            goodsSpecs: goods.skuValues
          });
          orderData.push({
            vendorId: goods.item.vendorId,
            itemId: goods.itemId,
            itemSkuId: goods.skuId,
            goodsNumber: goods.quantity,
            shopId: goods.shopId,
            exhibitionId: goods.exhibitionId,
            cartId: goods.id
          });
        });

        const data = [{
          goodsData,
          orderData
        }];
        LocalStroage.setItem('goods', JSON.stringify(data));

        goToPage('confirm');
      },

      hidePop() {
        this.showSeperatePopup = false;
      }
    }
  };
</script>

<style>
  @import "mixins";
  @import "../common.pcss";

  .cart-bottom {
    position: fixed;
    z-index: 100;
    bottom: 55px;
    width: 100%;
    box-sizing: border-box;
    background: #fff;

    .warning-bar {
      width: 100%;
      height: 35px;
      background: #fff7cc;
      color: #f60;
      font-size: 12px;
      text-align: center;
      line-height: 35px;
    }

    .select-all {
      display: inline-block;
      height: 50px;
      line-height: 50px;
      font-size: 13px;
      color: #333;
      margin-left: 10px;
    }

    .button-wrap {
      float: right;
      /*width: 100%;
      display: flex;
      justify-content: flex-end;*/
    }

    .total-price {
      float: left;
      height: 50px;
      box-sizing: border-box;
      font-size: 12px;
      line-height: 17px;
      padding-top: 5px;
      color: #999;

      .price-num {
        color:#342C2A;
        line-height: 24px;
        font-size: 17px;
        display:inline-block;
        > span {
          font-size: 17px;
          vertical-align: middle;
        }
        &--diamond {
          margin-left: 5px;
          .price-num__prefix {
            color: #333;
          }
          .price-num__value {
            color: #342C2A;
            font-size:17px;
          }
        }
        &--cash{
        .price-num__value,.price-num__prefix {
          color: #C4D52F;
          font-size:17px;
        }
        }
      }
      .desc {
        color: #999;
      }
    }

    .total-price-active {
      color: #f60;
    }

    .bottom-button {
      height: 50px;
      width: 90px;
      border: none;
      padding: 0;
      border-radius: 0;
      text-align: center;
      margin-left: 10px;
      background-color: #f1f1f1;
      position: relative;
      color: #999;
      font-size: 14px;
      border:0;
      &::after {
        @mixin border-retina (top, right, bottom, left);
      }

      > span {
        line-height: 17px;
        font-size: 12px;
      }
    }

    .bottom-button__pay-text {
      line-height: 24px;
      font-size: 17px;
    }

    .bottom-button-active {
      background-color: #342C2A;
      color: #fff;
    }
  }

  .clearfix::after {
    height: 0;
    content: "";
    visibility: hidden;
    clear: both;
    display: block;
  }
</style>
