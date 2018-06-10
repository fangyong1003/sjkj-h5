<template>
  <div class="login">
    <h2 class="login-title">绑定手机号</h2>
    <login-cell-group>
      <login-phone
        placeholder="请输入邀请人手机号（选填）"
        @input="onInvitePhoneInput"
      />
      <login-phone
        @input="onPhoneInput"
      />
      <login-code
        @input="onVerifyCodeInput"
      />
    </login-cell-group>

    <p class="login-text">点击登录即代表同意<a class="user-protocol" href="">《用户协议》</a></p>
    <div class="login-action">
      <van-button class="login-btn">确定</van-button>
    </div>
  </div>
</template>


<script>
import { Button } from 'vant';
import LoginCellGroup from '@/components/login-cell-group';
import LoginCode from '@/components/login-code';
import LoginPhone from '@/components/login-phone';

export default {
  name: 'bind-phone',

  components: {
    'van-button': Button,
    LoginCellGroup,
    LoginCode,
    LoginPhone
  },

  data() {
    return {
      invitePhone: '',
      phone: '',
      code: ''
    };
  },

  methods: {
    onInvitePhoneInput(value) {
      this.invitePhone = value;
    },
    onPhoneInput(value) {
      this.phone = value;
    },
    onVerifyCodeInput(value) {
      this.code = value;
    }
  }
};
</script>

<style lang="postcss">

.login {
  padding: 30px 24px;

  &-title {
    margin: 10px 0;
    font-size: 24px;
    font-weight: normal;
    color: #333333;
    letter-spacing: 1px;
    line-height: 25px;
  }

  &-text {
    margin: 16px 0 28px 10px;
    line-height: 24px;
    font-size: 14px;
    color: #999;
  }

  &-action {
    padding: 0 11px;
  }

  &-btn {
    width: 100%;
    background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
    border-radius: 100px;
    font-size: 18px;
    color: #fff;

    &::after {
      border: 0 none;
    }
  }
}
</style>
