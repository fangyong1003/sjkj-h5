<template>
  <div class="order-status">
    <img class="order-status__img" :src="IMAGE_MAP[status]">
    <p class="order-status__text">{{ statusText }}</p>
  </div>
</template>

<script>
import success from '../images/success.png';
import topay from '../images/topay.png';
import tosend from '../images/tosend.png';
import torecieve from '../images/toreceive.png';

const IMAGE_MAP = {
  'WAITING_PAY': topay,
  'WAITING_SHIPPING': tosend,
  'WAIT_RECEIVING': torecieve,
  'ORDER_COMPLETION': success
};

const STATUS_TEXT_MAP = {
  'WAITING_PAY': '等待支付',
  'WAITING_SHIPPING': '等待商家发货',
  'WAIT_RECEIVING': '等待确认收货',
  'ORDER_COMPLETION': '交易成功',
  'ORDER_CANCELED': '订单取消',
  'ORDER_EXPIRED': '订单失效'
};

export default {
  name: 'order-status',

  props: {
    status: String
  },

  data() {
    return {
      IMAGE_MAP
    };
  },

  computed: {
    statusText() {
      return STATUS_TEXT_MAP[this.status];
    }
  }
};
</script>

<style lang="postcss">
.order-status {
  padding: 26px;
  margin-bottom: 12px;
  line-height: 28px;
  color: #fff;
  font-size: 20px;
  background: #FF5252;

  &__img {
    width: 25px;
    vertical-align: middle;
  }

  &__text {
    display: inline-block;
    vertical-align: middle;
  }
}
</style>
