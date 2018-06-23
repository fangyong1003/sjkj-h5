<template>
  <div class="paid-action">
    <van-button class="paid-action__view"
      type="primary"
      block
      @click="toOrderDetail()">查看订单详情</van-button>
    <van-button class="paid-action__shopping"
      type="default"
      tag="a"
      :href="homepageUrl"
      block>继续购物</van-button>
  </div>
</template>
<script>
import { Button } from 'vant';
import { goToPage } from '@/common/helpers';

export default {
  components: {
    [Button.name]: Button
  },

  props: {
    orderData: Object
  },

  computed: {
    homepageUrl() {
      return '/pages/homepage.html';
    }
  },

  methods: {
    toOrderDetail() {
      const orderIds = this.orderData.orderIds;
      if (orderIds.length > 1) {
        goToPage('order-list');
      } else {
        goToPage('order-detail', {
          orderId: orderIds[0]
        });
      }
    }
  }
};
</script>
<style>
.paid-action {
  padding: 10px 50px;

  &__view {
    margin-bottom: 30px;
    border-radius: 5px;
    font-size: 17px;
    background: #fff;
    color: #333;
    border-color: #979797;
  }

  &__shopping {
    font-size: 17px;
    border-radius: 5px;
    background: #342C2A;
    color: #fff;
    border: 0 none;
  }
}
</style>
