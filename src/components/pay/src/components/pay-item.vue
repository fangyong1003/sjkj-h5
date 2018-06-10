<template>
  <van-cell v-if="!loading" class="cap-pay-item__cell" :class="[{'disabled': !payWay.available}, highlightClass]" @click="onPayClick">
    <template slot="title">
      <span class="cap-pay-item--middle">{{payWayDesc}}</span>
      <span class="cap-pay-item--middle" :class="{ 'cap-pay--gray-darker': payWay.available }">{{extraDesc}}</span>
    </template>
  </van-cell>
  <van-cell v-else class="cap-pay-item__cell">
    <template slot="title">
      <van-loading class="cap-pay-item__cell__loading" type="circle" color="black"></van-loading>
    </template>
  </van-cell>
</template>

<script>
import { Loading, Cell, Icon } from 'vant';
import payConfig from '../config/pay-config';

export default {
  name: 'van-payitem',

  components: {
    'van-loading': Loading,
    'van-cell': Cell,
    'van-icon': Icon
  },

  props: {
    payWay: {
      type: Object,
      default: {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    onClick: {
      type: Function,
      validate(value) {
        return typeof value === 'function';
      }
    }
  },

  data() {
    // 支付方式显示
    let payWayDesc = this.payWay.pay_channel_name;

    return {
      payWayDesc: payWayDesc,
      extraDesc: this.payWay.available_desc
        ? '（' + this.payWay.available_desc + '）'
        : ''
    };
  },

  methods: {
    onPayClick() {
      if (!this.payWay.available) return;

      this.onClick(this.payWay);
    }
  },

  computed: {
    highlightClass() {
      const highlightData = payConfig[this.payWay.pay_channel] || {};
      return highlightData.className || '';
    }
  }
};
</script>

<style lang="postcss">

.cap-pay-item {
  &__cell {
    height: 50px;
    line-height: 28px;
    padding-left: 15px;
    font-size: 18px;
    text-align: center;
    user-select: none;

    &__loading {
      width: 16px;
      height: 16px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }
  }

  &__icon {
    margin-right: 15px;
    font-size: 18px;
  }

  &--middle {
    line-height: 30px;
    vertical-align: middle;
    font-size: 18px;

    &:not(:first-child) {
      font-size: 14px;
    }
  }

  &--gray-darker {
    color: #666;
  }
}

.disabled {
  color: #e5e5e5;
  pointer-events: none;
}

.cap-color {
  &--blue {
    color: #38f;
  }

  &--green {
    color: #06bf04;
  }
}
</style>
