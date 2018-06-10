<template>
  <div class="cap-order-goods-card">
    <van-card @click.native="$emit('card-click', data.itemId)">
      <div slot="thumb">
        <img :src="thumb" />
      </div>
      <div class="van-card__row" slot="title">
        <div class="van-card__title">{{ data.goodsTitle }}</div>
      </div>
      <template slot="desc">
        <div class="van-card__row">
          <p class="van-card__desc">{{ data.goodsSpecs }}</p>
        </div>
        <div class="van-card__row">
          <div class="van-card__price">
            <total-price v-if="totalData" :total-data="totalData" />
            <template v-else>
              {{ price }}
              <span v-if="goodsRuleText" class="van-card__rule-text">{{ goodsRuleText }}</span>
            </template>
          </div>
          <span class="van-card__num">x {{ data.goodsNumber }}</span>
        </div>
        <div class="van-card__row">
          <div class="van-card__diamond">{{ totalDesc }}</div>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
import { Card, Cell } from 'vant';
import cloneDeep from 'lodash/cloneDeep';
import { getSellRuleText, getOrderTotal } from '@/common/helpers';
import TotalPrice from '@/components/total-price';

export default {
  name: 'cap-order-goods-card',

  components: {
    TotalPrice,
    [Card.name]: Card,
    [Cell.name]: Cell
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    thumb() {
      return this.data.image;
    },
    price() {
      if (this.data.price) return this.data.price;
      return `¥${this.data.sellPriceString}`;
    },
    goodsRuleText() {
      if (this.data.ruleText) return this.data.ruleText;
      if (!this.data.sellPriceRule) return '';
      return getSellRuleText(this.data.sellPriceRule);
    },
    totalData() {
      try {
        const data = cloneDeep(this.data);
        data.quantity = 1;
        return getOrderTotal([[data]]);
      } catch (e) {
        return null;
      }
    },
    totalDesc() {
      // 订单详情逻辑
      if (!this.totalData) {
        // const diamond = this.data.goodsCreditsString;
        // let desc = `购买可获得${diamond}点石金`;
        // if (this.data.sellType === 0 && +diamond > 0) {
        //   desc = `现金或余额支付可获得${diamond}点石金`;
        // } else if (!diamond) {
        //   desc = '';
        // }
        desc = '';
        return desc;
      }

      // 下单页逻辑
      const diamond = this.totalData.totalDiamond;
      let desc = `购买可获得${diamond}点石金`;
      if (this.totalData.ruleType === 0 && +diamond > 0) {
        desc = `现金或余额支付可获得${diamond}点石金`;
      }
      return desc;
    }
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.cap-order-goods-card {
  position: relative;

  &:not(:last-child) {
    &::after {
      @mixin border-retina (bottom);
    }
  }

  .van-card {
    padding-top: 0;
    background-color: #fff;
    min-height: 100px;
    height: auto;

    .price-num {
      font-size: 14px;

      &--diamond {
        display: block;
        margin-left: 0;
      }

      > span {
        font-size: 14px;
      }
    }

    &__thumb {
      width: 88px;
      height: 88px;
    }

    &__row {
      margin-bottom: 5px;
    }

    &__title {
      font-size: 14px;
    }

    &__desc,
    &__num,
    &__diamond {
      font-size: 14px;
      color: #999;
    }

    &__num {
      min-width: 40px;
    }

    &__price {
      flex: 3;
      color: #f00;
      text-align: left;
    }

    &__rule-text {
      margin-left: 10px;
      color: #999;
    }
  }

  &__extra {
    background-color: #fff;
  }
}
</style>
