<template>
  <div class="goods-card" @click="onGoodsClicked(data.id)">
    <van-card>
      <div slot="thumb">
        <img :src="data.image" />
      </div>
      <div class="van-card__row" slot="title">
        <div class="van-card__title">{{ data.title }}</div>
      </div>
      <template slot="desc">
        <div class="van-card__row">
          <p class="van-card__desc">{{ data.goodsSpecs }}</p>
        </div>
        <div class="van-card__row">
          <div class="van-card__price">{{ price }}</div>
          <span v-if="showNumber" class="van-card__num">x {{ data.goodsNumber }}</span>
        </div>
      </template>
    </van-card>
  </div>
</template>

<script>
import { Card, Cell } from 'vant';
import { goToPage } from '@/common/helpers';

export default {
  name: 'goods-card',

  components: {
    [Card.name]: Card,
    [Cell.name]: Cell
  },

  props: {
    data: {
      type: Object,
      required: true
    },
    showNumber: Boolean
  },

  computed: {
    price() {
      return `¥${this.data.sellPriceString}`;
    }
  },

  methods: {
    onGoodsClicked(id) {
      goToPage('goods', {
        id
      });
    }
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.goods-card {
  position: relative;

  &:not(:last-child) {
    &::after {
      @mixin border-retina (bottom);
    }
  }

  .van-card {
    padding-top: 0;
    background-color: #fff;

    &__thumb {
      width: 88px;
      height: 88px;
    }

    &__row {
      margin-bottom: 5px;
    }

    &__title {
      font-size: 14px;
    }

    &__desc,
    &__num {
      font-size: 14px;
      color: #999;
    }

    &__price {
      color:#C4D52F;
      text-align: left;
    }
  }

  &__extra {
    background-color: #fff;
  }
}
</style>
