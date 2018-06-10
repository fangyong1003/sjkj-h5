<template>
  <div class="goods-action">
    <a href="/pages/cart.html" class="goods-action__mini-btn van-hairline">
      <div class="goods-action__img-wrap">
        <img src="../images/cart.png">
        <div v-if="cartNum > 0" class="goods-action__cart-num">{{ cartNum }}</div>
      </div>
      <p>购物车</p>
    </a>
    <a class="goods-action__mini-btn van-hairline" @click="$emit('collect');">
      <div class="goods-action__img-wrap">
        <img :src="collect">
      </div>
      <p>收藏</p>
    </a>
    <van-button
      tag="a"
      class="goods-action__big-btn"
      type="default"
      bottom-action
      @click="$emit('add-cart')"
    >
      加入购物车
    </van-button>
    <van-button
      tag="a"
      class="goods-action__big-btn"
      type="primary"
      bottom-action
      @click="$emit('buy')"
    >
      立即购买
    </van-button>
  </div>
</template>

<script>
import { Button } from 'vant';
import collectImage from '../images/collect.png';
import collectSelectedImage from '../images/collect-selected.png';

export default {
  name: 'goods-action',

  components: {
    'van-button': Button
  },

  props: {
    collected: Boolean,
    cartNum: Number
  },

  computed: {
    collect() {
      return this.collected ? collectSelectedImage : collectImage;
    }
  }
};
</script>

<style lang="postcss">
body {
  padding-bottom: 50px;
}

.goods-action {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  &__img-wrap {
    position: relative;
    line-height: 34px;

    img {
      width: 20px;
      vertical-align: middle;
    }
  }

  &__cart-num {
    position: absolute;
    top: 5px;
    left: 50%;
    padding: 0 3px;
    margin-left: 3px;
    min-width: 6px;
    height: 12px;
    font-size: 10px;
    line-height: 12px;
    border-radius: 12px;
    color: #fff;
    background: #f00;
  }

  &__mini-btn {
    height: 50px;
    font-size: 12px;
    min-width: 15%;
    line-height: 1;
    text-align: center;
    color: #666;
    background-color: #fff;

    &::after {
      border-width: 1px 0 0 1px;
    }

    &:first-child::after {
      border-left-width: 0;
    }
  }

  &__big-btn {
    flex: 1;
    padding: 0;
    font-size: 17px;

    &.van-button--default {
      background-color: #333;
    }

    &.van-button--primary {
      background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
    }

    @media(max-width: 321px) {
      font-size: 15px;
    }
  }
}
</style>
