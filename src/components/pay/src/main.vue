<template>
  <div class="cap-pay">
    <van-popup v-model="showPayView" position="bottom">
      <div class="cap-pay__paylist">
        <cap-paylist
          :payWays="payWays"
          :loadingPayWay="loadingPayWay"
          :onPayItemClick="onPayItemClick"
        ></cap-paylist>
      </div>
    </van-popup>

    <!-- 密码输入弹窗 -->
    <van-popup v-model="showPassword" class="cap-pay__password-container" :closeOnClickOverlay="false">
      <cap-password
        :close="closePassword"
        :onConfirm="onPasswordConfirm"
        :account="account"
        :payWay="selectedPayWay"
        :loading="loadingPayWay.need_password && showPassword"></cap-password>
    </van-popup>

    <!-- 支付确认弹窗 -->
    <van-popup v-model="showConfirm" class="cap-pay__confirm-container" :closeOnClickOverlay="false">
      <cap-confirm
        :close="closeConfirm"
        :onConfirm="onConfirmAccept"
        :payWay="selectedPayWay"
        :loading="loadingPayWay.need_confirm && showConfirm"></cap-confirm>
    </van-popup>

    <cap-qrcode-pay
      v-if="showQrcodePay"
      :qrcodeUrl="qrcodeUrl"
      :onBtnClicked="onQrcodeBtnClick"
      @input="onCloseQrcodePay"></cap-qrcode-pay>
  </div>
</template>

<script>
import { Dialog, Popup } from 'vant';
import Password from './components/password';
import PayList from './components/pay-list';
import QrCode from './components/qrcode';
import Confirm from './components/confirm';

export default {
  name: 'cap-pay',

  components: {
    'cap-password': Password,
    'cap-paylist': PayList,
    'cap-qrcode-pay': QrCode,
    'cap-confirm': Confirm,
    'van-popup': Popup
  },

  props: {
    value: {},
    account: {
      type: String,
      default: ''
    },
    payWays: {
      type: Array,
      required: true
    },
    loadingPayWay: {
      type: Object,
      default: ''
    },
    onPayWaySelected: {
      type: Function,
      validator(value) {
        return typeof value === 'function';
      }
    },
    changePasswordUrl: {
      type: String,
      default: ''
    },
    showQrcodePay: {
      type: Boolean,
      default: false
    },
    qrcodeUrl: {
      type: String,
      default: ''
    },
    onCloseQrcodePay: {
      type: Function,
      validator(value) {
        return typeof value === 'function';
      },
      default() {
        return () => {};
      }
    },
    onQrcodeBtnClick: {
      type: Function,
      validator(value) {
        return typeof value === 'function';
      },
      default() {
        return () => {};
      }
    },
    showAfterPayConfirm: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    },
    showChangePriceConfirm: {
      type: Boolean,
      default: false
    },
    changePriceMsg: {
      type: String,
      default: ''
    },
    newPrice: {
      type: Number,
      default: -1
    }
  },

  data() {
    return {
      showConfirm: false,
      selectedPayWay: {},
      showPayView: this.value
    };
  },

  watch: {
    value(val) {
      // 如果只有一种支付方式的话，立刻唤起支付，不再显示弹层
      if (this.payWays.length === 1) {
        this.$emit('input', false);
        this.onPayItemClick(this.payWays[0]);
      } else {
        this.showPayView = val;
      }
    },
    showPayView(val) {
      this.$emit('input', val);
    },
    showAfterPayConfirm(val) {
      if (val) {
        this.startShowAfterPayConfirm();
      }
    },
    showChangePriceConfirm(val) {
      if (val) {
        this.startShowChangePriceConfirm();
      }
    }
  },

  methods: {
    closePassword() {
      this.$emit('update:show-password', false);
    },

    closeConfirm() {
      this.showConfirm = false;
    },

    onPayItemClick(payWay) {
      this.selectedPayWay = payWay;
      if (payWay.need_password) {
        this.$emit('update:show-password', true);
        return;
      }

      if (payWay.need_confirm) {
        this.showConfirm = true;
        return;
      }

      if (payWay.pay_channel === 'CASH_ON_DELIVERY') {
        Dialog.confirm({
          title: '下单提醒',
          message: this.getCODMessage(payWay.pay_channel_name)
        }).then(
          action => {
            this.onPayWaySelected({
              payWay: payWay
            });
          },
          error => {
            console.log(error);
          }
        );
        return;
      }

      this.onPayWaySelected({
        payWay: payWay
      });
    },

    getCODMessage(payName) {
      let message = '';
      switch (payName) {
        case '到店付款':
          message = '您正在选择到店付款，下单后请自行到店领取并付款。';
          break;
        // 货到付款
        default:
          message = '您正在选择货到付款，下单后由商家发货，送货上门并收款。';
      }
      return message;
    },

    onPasswordConfirm(password) {
      this.onPayWaySelected({
        payWay: this.selectedPayWay,
        password: password
      });
    },

    onConfirmAccept() {
      this.onPayWaySelected({
        payWay: this.selectedPayWay
      });
    },

    startShowAfterPayConfirm() {
      Dialog.confirm({
        title: '微信支付确认',
        message: '若你已付款成功，请点击“已完成支付”；若付款时遇到问题，可选择“其他支付方式”',
        confirmButtonText: '已完成支付',
        cancelButtonText: '其他支付方式'
      })
        .then(action => {
          this.$emit('update:show-after-pay-confirm', false);
          this.$emit('confirm:pay-result', action);
        })
        .catch(action => {
          this.$emit('update:show-after-pay-confirm', false);
          this.$emit('cancel:pay-result', action);
        });
    },

    startShowChangePriceConfirm() {
      Dialog.confirm({
        title: '改价提醒',
        message: this.changePriceMsg
      })
        .then(action => {
          this.onPayWaySelected({
            payWay: this.selectedPayWay,
            accept_price: 1,
            new_price: this.newPrice
          });
          this.$emit('confirm:change-price', action);
        })
        .catch(action => {
          this.$emit('cancel:change-price', action);
        });
    }
  }
};
</script>

<style lang="postcss">
.cap-pay {
  &__password-container {
    min-width: 280px;
    border-radius: 5px;
  }
}
</style>
