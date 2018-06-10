<template>
<div class="cap-pay-confirm">
  <div class="cap-pay-confirm__header">
    {{ payWay.pay_channel_name }}
    <van-icon v-if="!loading" name="close" class="cap-pay-confirm__close" @click="close"></van-icon>
  </div>

  <div class="cap-pay-confirm__content">
    <template v-if="loading">
      <van-loading class="cap-pay-confirm__loading"></van-loading>
      <p class="cap-pay-confirm__charge">扣款中...</p>
    </template>
    <template v-else>
      <p class="cap-pay-confirm__price">￥{{ payWay.pay_amount }}</p>
      <p class="cap-pay-confirm__tips">该笔交易将会使用卡内余额进行支付</p>
      <van-button type="primary" block :loading="loading" @click="onConfirm">确认</van-button>
    </template>
  </div>
</div>
</template>

<script>
import { Icon, Button, Loading } from 'vant';

export default {
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Loading.name]: Loading
  },

  props: {
    loading: Boolean,
    close: Function,
    onConfirm: Function,
    payWay: Object
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.cap-pay-confirm {
  width: 300px;
  font-size: 14px;

  &__header {
    font-size: 18px;
    position: relative;
    padding: 14px 0;
    line-height: 22px;
    font-weight: bold;
    text-align: center;

    &:after {
      @mixin border-retina (bottom), #06bf04;
    }
  }

  &__charge {
    font-size: 12px;
    color: #999;
  }

  &__close {
    position: absolute;
    line-height: 22px;
    right: 20px;
    top: 14px;
    font-size: 20px;
    color: #999;
  }

  &__content {
    padding: 20px;
    min-height: 120px;
    text-align: center;
  }

  &__price {
    font-size: 36px;
    font-weight: bold;
  }

  &__tips {
    color: #666;
    margin: 5px 0 20px;
  }

  &__loading {
    margin: 30px auto 20px;
  }
}
</style>
