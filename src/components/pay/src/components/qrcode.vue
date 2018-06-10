<template>
  <van-popup :value="true" :closeOnClickOverlay="false" :lockOnScroll="true" class="cap-qrcode-pay__container">
    <div class="cap-qrcode-pay__header">
      <van-icon name="close" class="cap-qrcode-pay__close" @click="doHidePopup"></van-icon>
      <p class="cap-qrcode-pay__header-row">
        <van-icon name="wechat" class="cap-qrcode-pay__wechat"></van-icon>
        点击确定
      </p>
      <p class="cap-qrcode-pay__header-row">长按图片 识别二维码 支付</p>
    </div>

    <div class="cap-qrcode-pay__content">
      <img class="cap-qrcode-pay__qrcode" :src="qrcodeUrl" @touchstart="doShowFooter" @click="doShowFooter">
    </div>

    <div class="cap-qrcode-pay__footer" v-if="showFooter">
      <van-button @click="doBtnClick('finish')" type="primary" block>我已完成支付</van-button>
      <van-button @click="doBtnClick()" block>更换支付方式</van-button>
    </div>
  </van-popup>
</template>

<script>
import { Popup, Icon, Button } from 'vant';

export default {
  components: {
    'van-popup': Popup,
    'van-icon': Icon,
    'van-button': Button
  },

  data() {
    return {
      showFooter: false
    };
  },

  props: {
    qrcodeUrl: String,
    onBtnClicked: Function
  },

  methods: {
    doHidePopup() {
      this.$emit('input', false);
    },

    doShowFooter() {
      this.showFooter = true;
    },

    doBtnClick(type) {
      this.onBtnClicked(type);
    }
  }
};
</script>

<style lang="postcss">

.cap-qrcode-pay {
  &__container {
    box-sizing: border-box;
    min-width: 280px;
    padding: 15px;
    border-radius: 5px;
  }

  /* 顶部title */
  &__header {
    position: relative;
    text-align: center;
  }

  &__header-row {
    line-height: 1.4;
    color: $green;
  }

  &__wechat {
    font-size: 16px;
  }

  &__close {
    position: absolute;
    left: -10px;
    top: -10px;
    padding: 10px;
    font-size: 18px;
  }

  /* 二维码 */
  &__content {
    text-align: center;
  }

  &__qrcode {
    width: 252px;
    height: 252px;
  }

  /* 底部按钮 */
  &__footer {
    margin: 10px 0;
    .van-button {
      margin-bottom: 10px;
    }
  }
}
</style>
