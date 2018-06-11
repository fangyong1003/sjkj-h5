<template>
  <div class="pay-way">
    <template v-if="payData.type == 0">
      <div class="pay-way__timer">
            <div class="remainTimer">支付剩余时间 {{countdownText}}</div>
            <div class="payMoney">￥{{payData.needBalanceString}}</div>
      </div>
      <div class="pay-way__item van-hairline--bottom" @click="handleWeixinPay">
        <img class="pay-way__icon" src="./images/wepay.png">
        <span>微信支付</span>
        <van-icon name="arrow" class="pay-way__arrow" />
      </div>
      <div class="pay-way__item van-hairline--bottom" @click="handleDianshiPay">
        <img class="pay-way__icon" src="./images/dianshi.png">
        <span>点石金支付</span>
        <p class="pay-way__remain">您需要支付{{ payData.needCreditsString}}点石金，当前有{{ payData.leftCreditsString }}点石金可用</p>
        <van-icon name="arrow" class="pay-way__arrow" />
      </div>
      <div class="pay-way__item van-hairline--bottom" @click="handleBalancePay">
        <img class="pay-way__icon" src="./images/balance.png">
        <span>余额支付</span>
        <p class="pay-way__remain">您需要支付￥{{ payData.needBalanceString }}余额，当前有￥{{ payData.leftBalanceString }}余额可用</p>
        <van-icon name="arrow" class="pay-way__arrow" />
      </div>
    </template>
    <template v-if="payData.type == 1">
      <div class="pay-way__timer">
            <div class="remainTimer">支付剩余时间 {{countdownText}}</div>
            <div class="payMoney">￥{{payData.needCashString}}</div>
      </div>
      <div class="pay-way__text">
        <p>您此次消费需要扣除点石金{{ payData.needCreditsString }}</p>
        <p>还需支付现金 <span>￥{{ payData.needCashString }}</span></p>
      </div>
      <div class="pay-way__item van-hairline--bottom" @click="handleWeixinPay">
        <img class="pay-way__icon" src="./images/wepay.png">
        <span>微信支付</span>
        <van-icon name="arrow" class="pay-way__arrow" />
      </div>
    </template>
    <template v-if="payData.type == 6">
      <div class="pay-way__timer">
            <div class="remainTimer">支付剩余时间 {{countdownText}}</div>
            <div class="payMoney">￥{{payData.needBalanceString}}</div>
      </div>
      <div class="pay-way__text">
        <p>您此次消费需要扣除点石金{{ payData.needCreditsString }}</p>
        <p>还需支付余额 <span>￥{{ payData.needBalanceString }}</span></p>
      </div>
      <div class="pay-way__item van-hairline--bottom" @click="handleBalancePay">
        <img class="pay-way__icon" src="./images/balance.png">
        <span>余额支付</span>
        <span class="pay-way__remain">（您有{{ payData.leftBalanceString }}余额可用）</span>
        <van-icon name="arrow" class="pay-way__arrow" />
      </div>
    </template>
  </div>
</template>

<script>
import { Icon } from 'vant';
import Args from '@/common/utils/args';
import { goToPage } from '@/common/helpers';
import api from './api';

export default {
  name: 'pay-way',

  components: {
    'van-icon': Icon
  },

  props: {
    payData: Object
  },

  data() {
    return {
      ids: '',
      countdown: this.payData.expiredSeconds,
      countdownText: '00:00'
    };
  },

  methods: {
    handleAliPay() {
      api.pay('ali').then((resp) => {
        this.removeLeaveConfirm();
        window.location.href = resp.url;
      });
    },
    handleWeixinPay() {
      api.pay('weixin').then((resp) => {
        this.removeLeaveConfirm();
        window.location.href = resp.url;
      });
    },
    handleDianshiPay() {
      api.pay('dianshi').then(() => {
        this.removeLeaveConfirm();
        goToPage('paid', {
          orderIds: this.ids,
          payCredits: this.payData.needCreditsString
        });
      });
    },
    handleJiuzhouPay() {
      api.pay('jiuzhou').then(this.goToPaid);
    },
    handleBalancePay() {
      api.pay('balance').then(this.goToPaid);
    },
    goToPaid(resp) {
      console.log(resp, 'pay result');
      const { paymentType, returnedCreditsString = 0, returnedPropertyString = 0 } = resp;
      this.removeLeaveConfirm();
      goToPage('paid', {
        orderIds: this.ids,
        paymentType,
        returnedCreditsString,
        returnedPropertyString
      });
    },
    removeLeaveConfirm() {
      window.removeEventListener('beforeunload', this.unloadFunc);
    },
    unloadFunc(e) {
      const confirmationMessage = '确定要取消支付吗？';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    },
    getCountdown() {
      if (this.countdown === 0) {
        this.countdownText = this.getCountdownText(0);
        return;
      } else {
        this.countdownText = this.getCountdownText(this.countdown);
        this.countdown -= 1;
      }

      setTimeout(this.getCountdown, 1000);
    },

    getCountdownText(time) {
      const seconds = time % 60;
      const minutes = Math.floor(time / 60);
      return this.pad(minutes) + ':' + this.pad(seconds);
    },

    pad: function pad(number) {
      return number < 10 ? '0' + number : '' + number;
    }
  },

  created() {
    this.ids = Args.get('orderIds');
    if (this.countdown) {
      this.getCountdown();
    }
    window.addEventListener('beforeunload', this.unloadFunc);
  }
};
</script>

<style lang="postcss">
body {
  background-color: #f7f7f7;
}

.pay-way {
  &__text {
    padding: 14px 0;
    margin-bottom: 12px;
    line-height: 30px;
    font-size: 17px;
    text-align: center;
    background-color: #fff;

    span {
      color: #f00;
    }
  }

  &__timer{
    padding:20px 0px;
    text-align:center;
    background:#fff;
    margin-bottom:10px;
    line-height:35px;
    .remainTimer{
      font-size:14px;
      color:#7c7c7c;
    }
    .payMoney{
      font-size:25px;
      color:#383838;
    }
  }

  &__item {
    position: relative;
    padding: 12px;
    line-height: 28px;
    font-size: 17px;
    color: #333;
    background-color: #fff;
  }

  &__icon {
    width: 30px;
    height: 31px;
    vertical-align: middle;
  }

  &__remain {
    font-size: 14px;
    color: #999;
  }

  &__arrow {
    position: absolute;
    top: 20px;
    right: 12px;
    color: #999;
    font-size: 14px;
  }
}
</style>
