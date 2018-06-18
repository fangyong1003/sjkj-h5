<template>
<div>
  <cap-order-list
    :load-more-order="fetchOrder"
    :orders="orderData.list"
    :disabled="disabled"
    @btnclick="onBtnClick"
    @itemclick="onItemClick"
    @timeout="onTimeout"
  ></cap-order-list>

  <!-- 空列表 -->
  <div class="order-list__empty" v-if="isEmptyList">
    <img src="../images/nocontent.png" style="margin-bottom:10px;width:120px">
    <div class="order-list__empty-text">暂无内容</div>
  </div>
</div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import OrderList from '@/components/order-list';
import { goToPage } from '@/common/helpers';
import { ORDER_TYPE_STATUS_MAP } from '../config/constants';
import api from '../api';

export default {
  components: {
    [OrderList.name]: OrderList
  },

  props: {
    type: String,
    orderData: Object,
    loadMoreOrder: Function
  },

  computed: {
    disabled() {
      return this.orderData.loading || this.orderData.finished;
    },
    isEmptyList() {
      return this.orderData.list.length === 0 && this.orderData.finished;
    }
  },

  methods: {
    fetchOrder() {
      this.loadMoreOrder({
        orderStatus: ORDER_TYPE_STATUS_MAP[this.orderData.type],
        page: this.orderData.page
      });
    },

    onTimeout(order, index) {
      this.orderData.list.splice(index, 1);
    },

    onBtnClick(type, order, index) {
      console.log(type, order, index)
      this[`${type}Order`](order, index);
    },

    onItemClick(order) {
      goToPage('order-detail', {
        orderId: order.orderId
      });
    },

    cancelOrder(order, index) {
      Dialog.confirm({
        message: `确定要取消订单吗？`
      }).then(() => {
        api.cancelOrder(order.orderId).then(() => {
          this.orderData.list[index].orderStatus = 'CANCEL_ORDER';
        }).catch((err) => {
          Toast(err);
        });
      });
    },

    deleteOrder(order, index) {
      Dialog.confirm({
        message: `确定要删除这个订单吗？`
      }).then(() => {
        api.deleteOrder(order.orderId).then(() => {
          this.orderData.list.splice(index, 1);
        }).catch((err) => {
          Toast(err);
        });
      });
    },

    confirmOrder(order, index) {
      Dialog.confirm({
        message: `确定收货吗？`
      }).then(() => {
        api.confirmOrder(order.orderId).then(() => {
          if (this.type === 'toaccept') {
            this.orderData.list.splice(index, 1);
          } else {
            this.orderData.list[index].orderStatus = 'ORDER_COMPLETION';
          }
        }).catch((err) => {
          Toast(err);
        });
      });
    },

    remindOrder(order, index) {
      api.remindOrder(order.orderId).then(() => {
        Toast('提醒发货成功');
      }).catch((err) => {
        Toast(err);
      });
    },

    transportOrder(order) {
      goToPage('transport', {
        orderId: order.orderId
      });
    },

    topayOrder(order) {
      goToPage('order-detail', {
        orderId: order.orderId
      });
    }
  }
};
</script>

<style>
.order-list__empty {
  position: relative;
  padding-top: 150px;
  text-align: center;
}
.order-list__empty-text {
  position: relative;
  z-index: 1;
  background: #f8f8f8;
  padding: 0 10px;
  color: #999;
}
</style>
