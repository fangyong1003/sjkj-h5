<template>
  <van-cell class="van-hairline--bottom login__code-cell">
    <input type="number"
      placeholder="请输入验证码"
      @input="onInput" />
    <p class="login__verify-code"
      :class="codeClass"
      @click="handleGetVerfiyCode">{{ verifyCodeText }}</p>
  </van-cell>
</template>

<script>
import { Cell, Toast } from 'vant';
import { validatePhone } from '@/common/utils/validate';
import { sendVerifyCode } from './api';

export default {
  name: 'login-code',

  components: {
    [Cell.name]: Cell
  },

  props: {
    phone: [String, Number],
    imgCode: String
  },

  data() {
    return {
      countdown: null
    };
  },

  computed: {
    codeClass() {
      return {
        'login__verify-code--num': this.countdown !== null
      };
    },
    verifyCodeText() {
      if (this.countdown === null) return '获取验证码';

      return `(${this.countdown})重新获取`;
    }
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    },
    handleGetVerfiyCode() {
      if (!this.imgCode) return Toast('请先输入图形验证码');
      if (this.countdown) return;
      if (!validatePhone(this.phone)) return Toast('请输入正确的手机号');

      sendVerifyCode(this.phone, this.imgCode).then((data) => {
        this.getCountdown();
        const msg = data ? '验证码已发送' : '验证码发送失败';
        Toast(msg);
      }).catch((err) => {
        Toast(err);
      });
    },
    getCountdown() {
      if (this.countdown === null) {
        this.countdown = 60;
      } else if (this.countdown === 0) {
        this.countdown = null;
        return;
      } else {
        this.countdown -= 1;
      }

      setTimeout(this.getCountdown, 1000);
    }
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

  &__verify-code {
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 0 17px;
    line-height: 42px;
    font-size: 17px;
    text-align: center;
    letter-spacing: .75px;
    color: #333;

    &--num {
      color: #999;
    }
  }
}
</style>
