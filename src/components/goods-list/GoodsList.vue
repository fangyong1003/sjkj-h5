<template>
  <ul :class="goodsListClass">
    <li
      v-for="(item, index) in list"
      :key="index"
      class="goods-list-item"
    >
      <goods
        v-bind="$attrs"
        :goodsInfo="item"
      />
    </li>
  </ul>
</template>

<script>
import Goods from './Goods';

export default {
  name: 'goods-list',

  components: {
    Goods
  },

  props: {
    list: {
      type: Array,
      default: () => []
    },
    layout: {
      type: [Number, String],
      default: 1
    }
  },

  data() {
    return {
    };
  },

  computed: {
    goodsListClass() {
      return [
        'goods-list',
        `goods-list--${this.layout}`
      ];
    }
  },

  methods: {
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.goods-list {
  margin: 0 -3px;

  @mixin clearfix;

  &-item {
    float: left;
    width: 100%;
    padding:10px 0px;
    border-bottom:1px solid #e5e5e5;
    background:#fff;
  }
  &--1 {
    .goods-list-item {
      width: 100%;
    }
  }
  &--2 {
    .goods-list-item {
      width: 50%;
    }
  }

  &--3 {
    .goods-list-item {
      width: 33.33%;
    }
  }
}
</style>
