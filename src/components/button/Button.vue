<template>
  <van-button
    class="jz-button"
    v-bind="$attrs"
    @click="$emit('click', $event)">
    <slot></slot>
  </van-button>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'jz-button',

  components: {
    'van-button': Button
  },

  inheritAttrs: false
};
</script>

<style lang="postcss">
.jz-button {
  border-radius: 5px;
  font-size: 17px;

  &.van-button--primary {
    border: 0 none;
    background: #342C2A;
  }

  &.van-button--small {
    padding: 0 17px;
    font-size: 14px;
  }
}
</style>
