<template>
  <div class="recommend-goods">
    <img class="recommend-goods__banner" src="./images/recommend.png">
    <goods-list
      :layout="2"
      :list="goodsList"
    />
  </div>
</template>

<script>
import GoodsList from '../goods-list';
import { goodsList } from '../goods-list/mock';

export default {
  name: 'recommend-goods',

  components: {
    GoodsList
  },

  data() {
    return {
      goodsList
    };
  }
};
</script>

<style>
.recommend-goods {
  &__banner {
    width: 100%;
  }
}
</style>
