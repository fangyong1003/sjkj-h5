<template>
  <van-cell class="van-hairline--bottom login__code-cell">
    <input
      placeholder="请输入图形验证码"
      @input="onInput" />
    <img
      v-if="imgVerifyCode"
      class="login__img-verify-code"
      :src="imgVerifyCode"
      @click="getImgVerifyCode"
    >
  </van-cell>
</template>

<script>
import { Cell, Toast } from 'vant';
import * as api from './api';

export default {
  name: 'login-code',

  components: {
    [Cell.name]: Cell
  },

  props: {
    value: [String, Number]
  },

  data() {
    return {
      imgVerifyCode: ''
    }
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
    getImgVerifyCode() {
      this.imgVerifyCode = '/sjkj-web/api/img_check_code?clientType=4&deviceId=1&t=' + new Date().getTime();
      // api.getImgVerifyCode()
      //   .then((res) => {
      //     console.log(res)
      //   })
    }
  },

  created() {
    this.getImgVerifyCode();
  }
};
</script>

<style lang="postcss">
.login {
  &__code-cell {
    background: url('../../assets/images/login/code.png') no-repeat;
    background-size: 17px 21px;
    background-position: 10px 30px;
  }

  &__img-verify-code {
    position: absolute;
    right: 20px;
    bottom: 6px;
    width: 80px;
    height: 30px;
    line-height: 40px;
  }
}
</style>
