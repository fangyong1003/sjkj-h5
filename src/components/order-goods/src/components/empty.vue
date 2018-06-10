<template>
  <div class="cap-order-goods-empty">
    <img :src="icon" />
    <p>{{ message }}</p>
    <van-button @click="onClickButton">{{ buttonText }}</van-button>
  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'cap-order-goods-empty',

  components: {
    [Button.name]: Button
  },

  props: {
    icon: String,
    message: String,
    buttonText: String
  },

  methods: {
    onClickButton() {
      history.back();
    }
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.cap-order-goods-empty {
  margin-left: -15px;
  text-align: center;
  position: relative;

  &::after {
    @mixin border-retina (top);
  }

  p {
    color: #999;
    padding: 0 10px;
    font-size: 14px;
    line-height: 20px;
  }

  img {
    width: 80px;
    height: 84px;
    padding: 15px 0;
  }

  .van-button {
    height: 41px;
    margin: 15px 0;
    padding: 0 10px;
    line-height: 39px;
    border-color: #e5e5e5;
  }
}
</style>


