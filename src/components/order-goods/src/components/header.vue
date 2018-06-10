<template>
  <van-cell class="cap-order-goods-header van-hairline" :border="false">
    <a :href="link">{{ title }}</a>
    <img v-if="badge" :src="badge" />
  </van-cell>
</template>

<script>
import { Cell } from 'vant';

export default {
  name: 'cap-order-goods-header',

  components: {
    [Cell.name]: Cell
  },

  props: {
    title: String,
    icon: String,
    link: String,
    badge: String
  }
};
</script>

<style lang="postcss">
.cap-order-goods-header {
  padding: 0 0 0 15px;
  line-height: 46px;

  a,
  img,
  .van-icon {
    vertical-align: middle;
  }

  a {
    color: #333;
    font-size: 17px;
  }

  img {
    height: 14px;
    margin-left: 5px;
  }
}
</style>
