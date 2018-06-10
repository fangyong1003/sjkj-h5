<template>
  <div class="login">
    <h2 class="login-title">邀请人绑定</h2>
    <login-cell-group>
      <login-phone
        placeholder="请输入邀请人手机号"
        @input="onInvitePhoneInput"
      />
    </login-cell-group>

    <div class="login-action">
      <van-button class="login-btn" @click="handleBindInvite">确定</van-button>
      <van-button class="login-noinvite-btn" @click="redirect">没有邀请人</van-button>
    </div>
  </div>
</template>


<script>
import { Button, Toast } from 'vant';
import { goToPage } from '@/common/helpers';
import Args from '@/common/utils/args';
import { validatePhone } from '@/common/utils/validate';
import LoginCellGroup from '@/components/login-cell-group';
import LoginPhone from '@/components/login-phone';
import api from './api';

export default {
  name: 'bind-invite',

  components: {
    'van-button': Button,
    LoginCellGroup,
    LoginPhone
  },

  data() {
    return {
      goToPage,
      invitePhone: ''
    };
  },

  methods: {
    onInvitePhoneInput(value) {
      this.invitePhone = value;
    },
    handleBindInvite() {
      const mobile = this.invitePhone;

      if (!validatePhone(mobile)) {
        Toast('请填写正确的手机号');
        return;
      }

      api.bindInvite(mobile).then((resp) => {
        this.redirect();
      });
    },

    redirect() {
      const redirectUrl = Args.get('redirectUrl');
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        goToPage('homepage');
      }
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
    padding: 46px 11px;
  }

  &-btn.van-button {
    width: 100%;
    background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
    border-radius: 100px;
    font-size: 18px;
    color: #fff;

    &::after {
      border: 0 none;
    }
  }

  &-noinvite-btn.van-button {
    margin-top: 38px;
    width: 100%;
    border-radius: 100px;
    font-size: 18px;
    color: #999;
    &::after {
      border-color: #ccc;
    }
  }
}
</style>
