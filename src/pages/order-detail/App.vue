<template>
<div id="app">
  <order-status
    :status="orderStatus"
  />

  <cap-logistics
    :address="address"
    :editable="false"
  ></cap-logistics>

  <cap-order-goods
    :shop-name="teamName"
    :price="orderTotalPrice"
    :message-editable="false"
    :item-list="goodsList"
    class="order-goods"
  />

  <order-info
    :order-no="orderNo"
    :goods-total-price="orderTotalPrice"
    :express-total-price="expressFee"
    :credit="credit"
    :order-total-price="orderTotalPrice"
  ></order-info>

  <div
    v-if="actionBtns.length > 0"
    class="order-detail-actions">
    <cap-order-btns
      :actionBtns="actionBtns"
      :expiredSeconds="order.expiredSeconds"
      @click="onBtnClick"
    />
  </div>
</div>
</template>

<script>
import { Toast, Dialog } from 'vant';
import cloneDeep from 'lodash/cloneDeep';
import { goToPage, getOrderPaidString } from '@/common/helpers';
import Logistics from '@/components/logistics';
import OrderGoods from '@/components/order-goods';
import OrderActions from '@/components/order-actions';
import OrderInfo from './components/order-info';
import OrderStatus from './components/order-status';
import btns from './config';
import api from '@/pages/order-list/api';
import { PAYMENT_TYPE } from '@/common/constants';

export default {
  components: {
    [Logistics.name]: Logistics,
    [OrderGoods.name]: OrderGoods,
    'order-info': OrderInfo,
    'order-status': OrderStatus,
    'cap-order-btns': OrderActions
  },

  props: {
    order: Object
  },

  data() {
    const order = this.order;
    return {
      orderStatus: order.orderStatus,
      teamName: '',
      orderNo: order.serialNo,
      address: {
        addressDetail: order.address,
        mobile: order.mobile,
        receiver: order.receiver
      },
      goodsList: this.formatDetail(order),
      goodsTotalPrice: order.goodsAmountString,
      message: order.message,
      couponData: {
        list: [],
        show: false
      },
      paymentType: order.paymentType,
      expressFee: order.expressAmountString,
      credit: order.selfCreditsString,
      orderCredits: order.orderCreditsString
    };
  },

  computed: {
    actionBtns() {
      return btns[this.orderStatus] || [];
    },
    discountPrice() {
      const orderData = this.couponData.list[0] || {};

      return orderData.value || 0;
    },
    orderTotalPrice() {
      return getOrderPaidString(this.order);
    }
  },

  methods: {
    formatDetail(order) {
      const newDetails = cloneDeep(order.goodsDetails);
      return newDetails.map((detail) => {
        // 重新拼接获得的点石金
        detail.goodsCreditsString = detail.selfCreditsString;
        // 计算展示价格
        switch (order.paymentType) {
          case PAYMENT_TYPE.CASH:
            detail.price = `¥${detail.paidCashString}`;
            break;
          case PAYMENT_TYPE.CREDIT:
            detail.price = `点石金${detail.paidCreditsString}`;
            break;
          case PAYMENT_TYPE.BALANCE:
            detail.price = `余额${detail.paidBalanceString}`;
            break;
          case PAYMENT_TYPE.CASH_CREDIT:
            detail.price = `¥${detail.paidCashString}`;
            detail.ruleText = `+点石金${detail.paidCreditsString}`;
            break;
          case PAYMENT_TYPE.BALANCE_CREDIT:
            detail.price = `余额${detail.paidBalanceString}`;
            detail.ruleText = `+点石金${detail.paidCreditsString}`;
            break;
        }
        return detail;
      });
    },

    onBtnClick(type) {
      this[`${type}Order`](this.order.orderId);
    },

    cancelOrder(orderId) {
      Dialog.confirm({
        message: `确定要取消订单吗？`
      }).then(() => {
        api.cancelOrder(orderId).then(() => {
          this.orderStatus = 'ORDER_CANCELED';
        }).catch((err) => {
          Toast(err);
        });
      });
    },

    deleteOrder(orderId) {
      Dialog.confirm({
        message: `确定要删除这个订单吗？`
      }).then(() => {
        api.deleteOrder(orderId).then(() => {
          Toast('订单删除成功');
          setTimeout(() => {
            goToPage('order-list');
          }, 200);
        }).catch((err) => {
          Toast(err);
        });
      });
    },

    confirmOrder(orderId) {
      api.confirmOrder(orderId).then(() => {
        this.orderStatus = 'ORDER_COMPLETION';
      }).catch((err) => {
        Toast(err);
      });
    },

    remindOrder(orderId) {
      api.remindOrder(orderId).then(() => {
        Toast('提醒发货成功');
      }).catch((err) => {
        Toast(err);
      });
    },

    transportOrder(orderId) {
      goToPage('transport', {
        orderId
      });
    },

    topayOrder(orderId) {
      goToPage('pay-way', {
        orderIds: orderId
      });
    }
  }
};
</script>

<style lang="postcss">
body {
  background-color: #f7f7f7;
  padding-bottom: 50px;
}

.order-goods {
  margin-top: 12px;
}
.order-coupon {
  margin-top: 12px;
}

.order-detail-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
}

.van-dialog__confirm, .van-dialog__confirm:active {
  color: #f00;
}
</style>
