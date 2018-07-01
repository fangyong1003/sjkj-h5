<template>
  <a :class="goodsClass" :href="goodsUrl">
    <div class="goods-list__image-wrap">
      <img class="goods-list__image" :src="imageUrl" />
    </div>
    <div class="goods-list__info">
      <h3 class="goods-list__title">
        {{ goodsInfo.title }}
      </h3>
      <div class="tagbox">
        <div v-if="showTags"  class="goods-list__tags">
          <span v-for="(tag, index) in tags"
            :key="index"
            :class="['goods-list__tag', `goods-list__tag--${index}`]">{{ tag }}</span>
        </div>
      </div>
      <div class="goods-list__buy">
          <span >{{goodsInfo.sales}}人已买</span>
      </div>
      <template v-if="onlyCredit && goodsInfo.price.diamondPriceYuan">
        <p class="goods-list__price">
          <span class="goods-list__price-prefix">食间豆价: </span>
          <span class="goods-list__price-number">{{ goodsInfo.price.diamondPriceYuan }}</span>
        </p>
      </template>
      <template v-else>
        <span class="goods-list__price">
          <span class="goods-list__price-symbol">¥</span>
          <span class="goods-list__price-number">{{ goodsInfo.price.sellPrice | cent2yuan }}</span>
        </span>
        <span v-if="this.showOrigin"  class="goods-list__origin-price">
          <span class="goods-list__origin-price-symbol">¥</span>
          <span class="goods-list__origin-price-number">{{ goodsInfo.price.originPrice | cent2yuan }}</span>
        </span>
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
    float:left;
    width:30%;
    height: 0;
    padding-bottom: 30%;
    border-radius: 5px;
    overflow: hidden;
    position:relative;
  }

  &__image {
    width:100%;
    @mixin abs-center;
  }

  &__info {
    padding-left: 10px;
    float:left;
    width:70%;
    box-sizing:border-box;
  }
  .tagbox{
    height:20px;
  }
  &__title {
    max-height: 40px;
    height: 40px !important;
    line-height: 20px;
    font-size: 15px;
    color: #363636;

    @mixin multi-ellipsis 2;
  }
  &__buy{
    font-size: 13px;
    color: #6B6B6B;
    height:20px;
    line-height:20px;
    margin-bottom: 5px;
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
      background-image: linear-gradient(0deg, #C4D52F 0%, #B7E193 100%);
    }
    &--1 {
      background-image: linear-gradient(0deg, #FE778E 0%, #FFAFBD 99%);
    }
    &--2 {
      background-image: linear-gradient(89deg, #FB8A5E 0%, #FF5C9B 100%);
    }
  }

  &__price {
    display: inline-block !important;
    color: #342C2A;
    font-family: PingFangSC-Medium;
    font-size:16px;
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
    color: #6b6b6b;
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
  float:left;
  width:100%;
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
