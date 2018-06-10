<template>
  <div class="goods-detail">
    <div class="goods-detail__title">商品详情</div>
    <!-- 商品简介 -->
    <div class="goods-detail__desc">{{ desc }}</div>
    <!-- 商品详情 -->
    <div class="goods-detail__content">
      <img v-for="(photo, index) in photos"
        :key="index"
        :src="photo">
    </div>
  </div>
</template>

<script>

export default {
  name: 'goods-detail',

  props: {
    desc: String,
    photos: Array
  }
};
</script>

<style lang="postcss">
.goods-detail {
  padding: 10px;
  margin-top: 10px;
  background-color: #fff;

  &__title {
    line-height: 24px;
    font-size: 17px;
    color: #333;
    text-align: center;
  }

  &__desc {
    padding: 9px;
  }

  &__content {
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
