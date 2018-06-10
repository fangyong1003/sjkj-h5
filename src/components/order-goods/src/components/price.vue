<template>
  <div class="cap-order-goods-price">
    <p class="cap-order-goods-price__total">
      <span v-if="price" class="cap-order-goods-price__total-value">{{ price }}</span>
      <total-price v-else-if="shopTotalData" :total-data="shopTotalData" />
    </p>
    <p class="cap-order-goods-price__text">共{{ num }}件，小计</p>
  </div>
</template>

<script>
import { Cell } from 'vant';
import TotalPrice from '@/components/total-price';

export default {
  name: 'cap-order-goods-price',

  components: {
    TotalPrice,
    [Cell.name]: Cell
  },

  props: {
    price: [Number, String],
    num: Number,
    shopTotalData: Object
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.cap-order-goods-price {
  height: 44px;
  line-height: 44px;
  font-size: 14px;

  &__total {
    float: right;
    margin-right: 15px;
    color: #f00;

    .price-num {
      line-height: 44px;
      font-size: 14px;
      > span {
        font-size: 14px;
      }
    }
  }

  &__total-symbol {
    font-size: 12px;
  }

  &__text {
    float: right;
    margin-right: 16px;
    color: #999;
  }

  &__rule-text {
    margin-left: 10px;
    font-size: 14px;
    color: #999;
  }
}
</style>
