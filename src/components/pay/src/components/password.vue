<template>
  <div class="cap-password">
    <div class="cap-password__header">
      安全验证
      <van-icon name="close" class="cap-password__close" @click="close"></van-icon>
    </div>
    <div class="cap-password__input-container">
      <p>为了保障您的账户安全，请输入手机帐号{{secureAccount}}的登录密码</p>
      <van-field type="password" v-model="passwordValue" class="cap-password__input-container__input" placeholder="请输入登录密码" border></van-field>
    </div>
    <div class="cap-password__action-container">
      <van-button block :type="'primary'" :loading="loading" @click="onPayClick">付款</van-button>
    </div>
    <div class="cap-password__bottom-tips">
      <a :href="changePasswordUrl">忘记密码?</a>
    </div>
  </div>
</template>

<script>
import { Button, Field, Icon, Toast } from 'vant';

export default {
  name: 'cap-password',

  components: {
    'van-button': Button,
    'van-field': Field,
    'van-icon': Icon
  },

  props: {
    close: {
      type: Function,
      default: function() {}
    },
    account: {
      type: String,
      default: ''
    },
    payWay: Object,
    onConfirm: {
      type: Function,
      default: function() {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    changePasswordUrl: {
      type: String,
      default: ''
    }
  },

  data() {
    const account = this.account.toString();
    const secureAccount = account.slice(0, -8) + '****' + account.slice(-4);

    return {
      passwordValue: '',
      secureAccount: secureAccount
    };
  },

  methods: {
    onPayClick() {
      if (!this.passwordValue) return Toast('请输入密码');
      this.onConfirm(this.passwordValue);
    }
  }
};
</script>

<style lang="postcss">

.cap-password {
  padding: 20px 15px;
  position: relative;
  width: 270px;

  &__header {
    line-height: 22px;
    color: $black;
    font-size: 16px;
  }

  &__close {
    position: absolute;
    line-height: 22px;
    right: 20px;
    top: 20px;
    color: #666;
    font-size: 20px;
  }

  &__input-container {
    margin: 15px 0 10px;
    line-height: 1.4;

    > p {
      font-size: 12px;
      color: #666;
    }

    &__input {
      margin-top: 10px;
      height: 45px;
      line-height: 45px;
      font-size: 14px;
    }
  }

  &__bottom-tips {
    margin-top: 10px;
    line-height: 20px;

    a {
      color: #c9c9c9;
      font-size: 14px;
    }
  }
}
</style>
