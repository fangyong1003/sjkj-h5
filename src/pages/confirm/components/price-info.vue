<template>
  <van-cell-group class="order-price-info">
    <!-- 商品金额 -->
    <van-cell title="商品合计">
      <total-price class="order-price-info__total" :total-data="orderTotalData" />
    </van-cell>
    <!-- 运费 -->
    <van-cell class="order-price-info__express" title="运费">
      免邮
    </van-cell>
  </van-cell-group>
</template>

<script>
  import { Cell, CellGroup } from 'vant';
  import TotalPrice from '@/components/total-price';

  export default {
    components: {
      TotalPrice,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },

    props: {
      expressTotalPrice: {},
      orderTotalData: Object
    }
  };
</script>

<style lang="postcss">
.order-price-info {
  margin-top: 12px;

  .van-cell__title {
    font-size: 17px;
  }

  &__total {
    .price-num {
      font-size: 17px;
      > span {
        font-size: 17px;
      }
    }
  }

  &__price-symbol {
    color: #f00;
    font-size: 14px;
  }

  &__price-value {
    color: #f00;
    font-size: 20px;
  }

  &__rule-text {
    margin-left: 10px;
    color: #999;
    font-size: 14px;
  }

  &__express {
    .van-cell__value {
      color: #f00;
    }
  }
}
</style>
