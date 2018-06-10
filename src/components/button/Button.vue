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
  border-radius: 100px;
  font-size: 17px;

  &.van-button--primary {
    border: 0 none;
    background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
  }

  &.van-button--small {
    padding: 0 17px;
    font-size: 14px;
  }
}
</style>
