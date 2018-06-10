<template>
  <van-cell class="login__phone-cell van-hairline--bottom">
    <input type="number"
      :placeholder="placeholder"
      @input="onInput" />
  </van-cell>
</template>

<script>
import { Cell } from 'vant';

export default {
  name: 'login-phone',

  components: {
    [Cell.name]: Cell
  },

  props: {
    placeholder: {
      type: String,
      default: '请输入手机号'
    }
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value);
    }
  }
};
</script>

<style lang="postcss">
.login__phone-cell {
  background: url('../../assets/images/login/phone.png') no-repeat;
  background-size: 17px 24px;
  background-position: 10px 27px;

  input {
    width: 100%;
  }
}
</style>
