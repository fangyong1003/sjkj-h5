<template>
<div id="app">
  <van-tabs v-if="showTab"
    :active="active"
    :swipe-threshold="5"
    @click="clickTab"
    class="order-tabs">
    <van-tab title="全部"></van-tab>
    <van-tab title="待支付"></van-tab>
    <van-tab title="待发货"></van-tab>
    <van-tab title="待收货"></van-tab>
    <van-tab title="交易成功"></van-tab>
  </van-tabs>

  <!-- 订单列表展示 -->
  <vm-list
    :type="type"
    :orderData="currentOrder"
    :loadMoreOrder="loadMoreOrder"
    class="order-list__container"
    :class="{ 'order-list__fix-top': showTab }"
  ></vm-list>
</div>
</template>

<script>
import { Tab, Tabs } from 'vant';
import findIndex from 'lodash/findIndex';
import initOrders from './config/init-orders';
import api from './api/index';
import List from './components/list';
// import args from '@/common/utils/args';

const type = location.hash.slice(1);

export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    'vm-list': List
  },

  data() {
    const index = findIndex(initOrders, item => item.type === type);
    return {
      type,
      active: index < 0 ? 0 : index,
      showTab: true,
      orders: initOrders
    };
  },

  computed: {
    currentOrder() {
      return this.orders[this.active] || this.orders[4];
    }
  },

  methods: {
    clickTab(index) {
      const type = initOrders[index].type;
      this.type = type;
      this.active = index;
      window.location.replace(`${window.location.href.split('#')[0]}#${type}`);
    },

    loadMoreOrder(orderData) {
      const currentOrder = this.currentOrder;
      return api.fetchOrderList(orderData)
        .then(data => {
          currentOrder.list = currentOrder.list.concat(data.orderItems);
          currentOrder.loading = false;
          currentOrder.page++;

          if (data.isLastPage) {
            currentOrder.finished = true;
          }
        })
        .catch(res => {
          currentOrder.loading = false;
          currentOrder.finished = true;

          return Promise.reject(res);
        });
    }
  }
};
</script>

<style>
body {
  background: #f8f8f8;
}

.order-tabs {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;

  .van-tabs__nav-bar {
    width: 20px !important;
    height: 3px;
    left: 10%;
    margin-left: -10px;
    background: #C4D52F;
  }

  .van-tab--active {
    color:#C4D52F;
  }
}
.order-list__fix-top {
  padding-top: 50px;
}

.van-dialog__confirm, .van-dialog__confirm:active {
  color: #f00;
}
</style>
