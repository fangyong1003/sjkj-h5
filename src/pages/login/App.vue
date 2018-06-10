<template>
  <div class="login">
    <h2 class="login-title">登录</h2>
    <login-cell-group>
      <login-phone
        @input="onPhoneInput"
      />
      <img-verify-code
        v-model="imgCode"
      />
      <login-code
        :phone="phone"
        :img-code="imgCode"
        @input="onVerifyCodeInput"
      />
    </login-cell-group>

    <p class="login-text">点击登录即代表同意<a class="user-protocol" href="javascript:;" @click="goToPage('user-protocol')">《用户协议》</a></p>
    <div class="login-action">
      <van-button class="login-btn" @click="handleLogin">立即登录</van-button>
    </div>
  </div>
</template>

<script>
import { Button, Toast } from 'vant';
import LoginCellGroup from '@/components/login-cell-group';
import LoginCode from '@/components/login-code';
import ImgVerifyCode from '@/components/img-verify-code';
import LoginPhone from '@/components/login-phone';
import { validatePhone } from '@/common/utils/validate';
import cookie from '@/common/utils/cookie';
import YZLocalStorage from '@/common/utils/local_storage';
import Args from '@/common/utils/args';
import { goToPage } from '@/common/helpers';
import { login } from './api';

export default {
  name: 'login',

  components: {
    'van-button': Button,
    LoginCellGroup,
    LoginCode,
    LoginPhone,
    ImgVerifyCode
  },

  data() {
    return {
      goToPage,
      phone: '',
      code: '',
      imgCode: ''
    };
  },

  methods: {
    onPhoneInput(value) {
      this.phone = value;
    },
    onVerifyCodeInput(value) {
      this.code = value;
    },
    handleLogin() {
      if (!validatePhone(this.phone)) {
        Toast('请输入正确的手机号');
        return;
      }
      if (this.code === '') {
        Toast('请输入验证码');
        return;
      }

      const redirectUrl = Args.get('redirectUrl');
      login({
        mobile: this.phone,
        code: this.code
      }).then((resp) => {
        cookie('token', {
          value: resp.token,
          expires: 1
        });

        YZLocalStorage.setItem('user', JSON.stringify(resp.user));

        // 新用户跳转绑定邀请人
        if (resp.user && resp.user.is_new_user) {
          goToPage('bind-invite', {
            redirectUrl
          });
        } else if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          goToPage('homepage');
        }
      });
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
  .van-dialog__content {
    padding: 20px 30px;
    padding: 20px 30px;
    height: 300px;
    overflow: auto;
  }
  .van-dialog__confirm, .van-dialog__confirm:active {
    color: #00A3EE;
  }
}
</style>
