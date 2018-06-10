<template>
  <van-cell-group class="order-detail-panel">
    <!-- 订单信息 -->
    <van-cell title="订单号">
      {{ orderNo }}
    </van-cell>
    <!-- 商品金额 -->
    <van-cell title="商品总价">
      {{ goodsTotalPrice }}
    </van-cell>
    <!-- 运费 -->
    <van-cell title="运费">
      ￥{{ expressTotalPrice }}
    </van-cell>
    <van-cell title="订单总价">
      {{ orderTotalPrice }}
    </van-cell>
    <!-- 优惠 -->
    <van-cell title="获得点石金">
      {{ credit || '-' }}
    </van-cell>
  </van-cell-group>
</template>

<script>
  import { Cell, CellGroup } from 'vant';

  export default {
    components: {
      [Cell.name]: Cell,
      [CellGroup.name]: CellGroup
    },

    props: {
      orderNo: String,
      goodsTotalPrice: String,
      expressTotalPrice: String,
      credit: String,
      orderTotalPrice: String
    }
  };
</script>

<style lang="postcss">
.order-detail-panel {
  margin: 12px 0;
}
</style>
