<template>
  <div class="goods-brief">
    <van-swipe :autoplay="3000" class="goods-brief__swipe">
      <van-swipe-item v-for="(photo, index) in photos" :key="index">
        <div class="goods-brief__swipe-img-wrap">
          <img class="goods-brief__swipe-img" :src="photo">
        </div>
      </van-swipe-item>
    </van-swipe>
    <!-- 标题 -->
    <h2 class="goods-brief__title">{{ title }}</h2>
    <!-- 价格 -->
    <div class="goods-brief__price-info">
      <p class="goods-brief__price">
        <span class="goods-brief__price-symbol">¥</span>
        <span class="goods-brief__price-number">{{ price | cent2yuan }}</span>
      </p>
      <p class="goods-brief__origin-price">
        <span class="goods-brief__origin-price-symbol">¥</span>
        <span class="goods-brief__origin-price-number">{{ originPrice | cent2yuan }}</span>
        <span v-if="extraText" class="goods-brief__extra">{{ extraText }}</span>
      </p>
    </div>
    <!-- 购买信息 -->
    <div class="goods-brief__buy-info">
      <span class="goods-brief__diamond">购买可得{{ diamond }}食间豆</span>
      <span class="goods-brief__sales">月销{{ sales }}笔</span>
    </div>
    <!-- sku选择 -->
    <div class="goods-brief__sku van-hairline--top" @click="$emit('buy')">
      选择规格数量
      <img class="goods-brief__sku-arrow" src="../images/arrow.png">
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { cent2yuan } from '@/common/helpers';

export default {
  name: 'goods-brief',

  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
  },

  props: {
    photos: Array,
    title: String,
    price: Number,
    originPrice: Number,
    diamond: [Number, String],
    sales: Number,
    extraText: String
  },

  filters: {
    cent2yuan
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.goods-brief {
  background-color: #fff;

  &__swipe {
    z-index: 1;
  }

  &__swipe-img-wrap {
    position: relative;
    padding-top: 100%;
    height: 0;
  }

  &__swipe-img {
    @mixin abs-center;

    width: 100%;
  }

  &__title {
    padding: 6px 12px;
    margin: 0;
    max-height: 48px;
    line-height: 24px;
    font-size: 17px;
    font-weight: normal;
    letter-spacing: 0.4px;
    color: #333;

    @mixin multi-ellipsis 2;
  }

  &__price-info {
    padding: 0 12px;
  }

  &__price {
    display: inline-block;
    margin-right: 15px;
    line-height: 28px;
    font-size: 20px;
  color: #C4D52F;
  }

  &__origin-price {
    display: inline-block;
    line-height: 20px;
    font-size: 14px;
    color: #999;
    text-decoration: line-through;
  }

  &__origin-price-symbol {
    margin-right: -4px;
  }

  &__extra {
    margin-left: 17px;
    color: #999;
    font-size: 14px;
    line-height: 20px;
  }

  &__buy-info {
    padding: 5px 12px;
    line-height: 20px;
    font-size: 14px;
    color: #666;
  }

  &__diamond {
    margin-right: 20px;
  }

  &__sku {
    position: relative;
    padding: 12px;
    line-height: 24px;
    font-size: 17px;
    color: #666;
  }

  &__sku-arrow {
    position: absolute;
    top: 3px;
    right: -2px;
    width: 44px;
  }

}
</style>
