<template>
  <div class="cap-pay-list">
    <van-cell-group class="cap-pay-list__body">
      <cap-payitem
        v-for="payWay in displayPayWays"
        :key="payWay.pay_channel"
        :payWay="payWay"
        :onClick="doPayItemClick"
        :loading="payWay.pay_channel === loadingPayWay.pay_channel"
      ></cap-payitem>
    </van-cell-group>
  </div>
</template>

<script>
import { CellGroup, Icon } from 'vant';
import PayItem from './pay-item';
export default {
  data() {
    return {
      showAllPayWays: false
    };
  },

  components: {
    'cap-payitem': PayItem,
    'van-cell-group': CellGroup,
    'van-icon': Icon
  },

  props: {
    loadingPayWay: Object,
    payWays: {
      type: Array,
      required: true
    },
    onPayItemClick: {
      type: Function,
      required: true
    }
  },

  computed: {
    displayPayWays() {
      if (this.showAllPayWays) {
        return this.payWays;
      }

      let displayPayWays = this.payWays.filter(payWay => {
        if (payWay.should_wrap) {
          return false;
        }

        return true;
      });

      if (displayPayWays.length !== this.payWays.length) {
        displayPayWays.push({
          pay_channel_name: '更多支付方式',
          available: true,
          pay_channel: 'more'
        });
      }

      return displayPayWays;
    }
  },

  methods: {
    doPayItemClick: function(payWay) {
      if (payWay.pay_channel === 'more') {
        this.showAllPayWays = true;
        return;
      }

      this.onPayItemClick(payWay);
    }
  }
};
</script>

<style lang="postcss">

.cap-pay-list {
  &__header {
    position: relative;
    line-height: 1.2;
    padding: 15px 5px;
    text-align: center;
    font-size: 18px;
  }

  &__close {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 5px;
    height: 22px;
    padding: 10px;
    margin: auto;
  }

  &__body {
    padding-left: 0;

    &::after {
      border: 0 none;
    }
  }
}
</style>
