<template>
  <div class="pay-way">
      <div class="pay-way__timer">
            <div class="remainTimer">支付剩余时间 {{countdownText}}</div>
            <div class="payMoney">￥{{payData.needBalanceString}}</div>
      </div>
      <div class="pay-way__item van-hairline--bottom" >
        <img class="pay-way__icon" src="./images/dianshi.png">
        <span>食间豆支付</span>
        <!-- <p class="pay-way__remain">您需要支付{{ payData.needCreditsString}}食间豆，当前有{{ payData.leftCreditsString }}食间豆可用</p>-->
        <i class="icon-check":class="{'icon-check-active': isChoosed}"  @click="chooseGoodsd()"></i>
      </div>
      <div class="pay-way__item van-hairline--bottom">
        <img class="pay-way__icon" src="./images/wepay.png">
        <span>微信支付</span>
        <i  class="icon-check" :class="{'icon-check-active': isChoosew}"  @click="chooseGoodsw()"></i>
      </div>
      <div v-if="this.payType == 1" class="pay-way__do" @click="handleDianshiPay">
          使用<span>食间豆支付</span>￥：<span class="paymoney">{{ payData.needCreditsString}}</span>
      </div>
      <div v-if="this.payType == 2"  class="pay-way__do"  @click="handleWeixinPay">
          使用<span>微信支付</span>￥：<span class="paymoney">{{payData.needBalanceString}}</span>
      </div>
  </div>
</template>

<script>
import { Icon } from 'vant';
import Args from '@/common/utils/args';
import { goToPage } from '@/common/helpers';
import { initPayConfig } from '@/common/wxsdk/pay';
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
      countdownText: '00:00',
      payType:1,
      isChoosew:0,
      isChoosed:1,
    };
  },

  methods: {
    handleWeixinPay() {
      initPayConfig(this.ids)
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
    },

    chooseGoodsw(){
        this.isChoosew = 1;
        this.isChoosed = 0
        this.payType = 2;
    },
    chooseGoodsd(){
        this.isChoosew = 0;
        this.isChoosed = 1;
          this.payType = 1;
    }

  },

  created() {
    this.ids = Args.get('orderIds');
    if (this.countdown) {
      this.getCountdown();
    }
    window.addEventListener('beforeunload', this.unloadFunc);

    let url = window.location.href;
    let code = Args.get('code');
    if(code == null||code ===''){
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdfcc129b5b2daddd&redirect_uri='+encodeURIComponent(url)+'&response_type=code&scope=snsapi_base&state=1#wechat_redirect';
    }else{
        api.postCode(code);
    }
  },

};
</script>

<style lang="postcss">
@import "./common.pcss";
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

  &__do{
    position:fixed;
    bottom:0;
    width:100%;
    text-align:center;
    line-height:52px;
    background: #342C2A;
    color:#fff;
    font-size:18px;
    font-family: PingFangSC-Medium;
    .paymoney{
      font-size:25px;
    }
  }
}
</style>
