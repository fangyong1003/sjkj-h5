<template>
  <van-cell-group class="login-cell-group">
    <slot></slot>
  </van-cell-group>
</template>

<script>
import { CellGroup } from 'vant';

export default {
  'name': 'login-cell-group',

  components: {
    'van-cell-group': CellGroup
  }
};
</script>

<style lang="postcss">
.login-cell-group {
  &::after {
    border: 0 none;
  }

  .van-cell {
    padding: 24px 0 4px 44px;

    &::after {
      left: 0;
    }

    input {
      line-height: 30px;
      font-size: 16px;
      border: 0 none;
    }
  }
}
</style>
