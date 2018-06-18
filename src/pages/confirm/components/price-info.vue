<template>
  <van-cell-group class="order-price-info">
    <!-- 商品金额 -->
    <van-cell title="商品总价">
      <total-price class="order-price-info__total" :total-data="orderTotalData" />
    </van-cell>
    <dou-price class="dou__price" :total-data="orderTotalData"/>
    <van-cell title="商品实付">
      <total-price class="order-price-info__dou" :total-data="orderTotalData" />
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
  import DouPrice from '@/components/dou-price';
  export default {
    components: {
      TotalPrice,
      DouPrice,
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },

    props: {
      expressTotalPrice: {},
      orderTotalData: Object
    },
  };
</script>

<style lang="postcss">
.order-price-info {
  margin-top: 12px;

  .van-cell__title {
    font-size: 17px;
  }
  .dou__price{
    width:calc(100% - 30px);
    display:table;
    margin:0 15px;
    padding:10px 0;
    -webkit-box-sizing:border-box;
    box-sizing:border-box;
    line-height:24px;
    position:relative;
    background-color:#fff;
    color:#333;
    font-size:14px;
    overflow:hidden;
    border-bottom:1px solid #f5f5f5;
  }
  &__total {
    .price-num {
      font-size: 17px;
      > span {
        font-size: 17px;
      }
    }
    .price-num--diamond{
     display:none;
    }
    .price-num--cash{
      color:#363636;
    }
  }

  &__dou{

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
      color: #363636;
    }
  }
}
</style>
