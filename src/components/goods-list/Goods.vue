<template>
  <a :class="goodsClass" :href="goodsUrl">
    <div class="goods-list__image-wrap">
      <img class="goods-list__image" v-lazy="imageUrl" />
    </div>
    <div class="goods-list__info">
      <h3 class="goods-list__title">
        {{ goodsInfo.title }}
      </h3>
      <div v-if="showTags" class="goods-list__tags">
        <span v-for="(tag, index) in tags"
          :key="index"
          :class="['goods-list__tag', `goods-list__tag--${index}`]">{{ tag }}</span>
      </div>
      <template v-if="onlyCredit && goodsInfo.price.diamondPriceYuan">
        <p class="goods-list__price">
          <span class="goods-list__price-prefix">点石金价: </span>
          <span class="goods-list__price-number">{{ goodsInfo.price.diamondPriceYuan }}</span>
        </p>
      </template>
      <template v-else>
        <p class="goods-list__price">
          <span class="goods-list__price-symbol">¥</span>
          <span class="goods-list__price-number">{{ goodsInfo.price.sellPrice | cent2yuan }}</span>
        </p>
        <p v-if="showOrigin" class="goods-list__origin-price">
          <span class="goods-list__origin-price-symbol">¥</span>
          <span class="goods-list__origin-price-number">{{ goodsInfo.price.originPrice | cent2yuan }}</span>
        </p>
      </template>
    </div>
  </a>
</template>

<script>
import Args from '@/common/utils/args';
import { cent2yuan } from '@/common/helpers';

export default {
  name: 'goods',

  inheritAttrs: false,

  props: {
    goodsInfo: {
      type: Object,
      default: () => {}
    },
    extraArgs: Object,
    showOrigin: Boolean,
    showTags: Boolean,
    onlyCredit: Boolean,
    align: {
      type: String,
      default: 'center'
    }
  },

  filters: {
    cent2yuan
  },

  computed: {
    goodsClass() {
      return [
        'goods-list__goods',
        `goods-list__goods--${this.align}`,
        {
          'goods-list__goods--show-tag': this.showTags,
          'goods-list__goods--show-origin': this.showOrigin
        }
      ];
    },
    tags() {
      return this.goodsInfo.tags || [];
    },
    imageUrl() {
      return this.goodsInfo.photos[0] || 'http://img.yzcdn.cn/image/wap/no_pic.png';
    },
    goodsUrl() {
      return Args.add('/pages/goods.html', {
        id: this.goodsInfo.id,
        ...this.extraArgs
      });
    }
  },

  methods: {
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.goods-list {
  &__image-wrap {
    position: relative;
    padding-top: 100%;
    height: 0;
    border-radius: 5px;
    overflow: hidden;
  }

  &__image {
    @mixin abs-center;
    max-width: 100%;
    max-height: 100%;
  }

  &__info {
    padding: 5px;
  }

  &__title {
    margin: 8px 0 3px;
    max-height: 40px;
    height: 40px;
    line-height: 20px;
    font-size: 14px;
    color: #000;

    @mixin multi-ellipsis 2;
  }

  &__tags {
    margin-bottom: 5px;
    height: 20px;
    overflow: hidden;
  }

  &__tag {
    padding: 0 5px;
    margin-right: 5px;
    line-height: 18px;
    border-radius: 3px;
    color: #fff;
    font-size: 12px;
    text-align: center;

    &--0 {
      background-image: linear-gradient(-90deg, #38AAEE 0%, #624AF8 100%);
    }
    &--1 {
      background-image: linear-gradient(-90deg, #DD3DEA 6%, #A82FF9 99%);
    }
    &--2 {
      background-image: linear-gradient(89deg, #FB8A5E 0%, #FF5C9B 100%);
    }
  }

  &__price {
    display: inline-block;
    color: #f00;
    line-height: 17px;
  }

  &__price-prefix {
    font-size: 12px;
  }

  &__price-symbol {
    font-size: 12px;
  }

  &__price-number {
    font-size: 14px;
  }

  &__origin-price {
    display: inline-block;
    color: #999;
    line-height: 17px;
    text-decoration: line-through;
  }

  &__origin-price-symbol {
    font-size: 12px;
  }

  &__origin-price-number {
    font-size: 12px;
  }
}

.goods-list__goods {
  display: block;
  margin: 3px;
  background: #fff;
  text-align: left;

  &--center {
    .goods-list__price {
      display: block;
      text-align: center;
    }
    .goods-list__price-symbol {
      margin-right: -4px;
      font-size: 14px;
    }
  }

  &--show-origin {
    .goods-list__price {
      display: inline-block;
    }
  }

  &--show-tag {
    .goods-list__title {
      height: 20px;

      @mixin multi-ellipsis 1;
    }
  }
}
</style>
