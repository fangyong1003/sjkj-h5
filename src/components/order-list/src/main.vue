<template>
  <div
    class="cap-order-list"
    v-waterfall-lower="loadMore"
    waterfall-disabled="disabled"
  >
    <slot>
      <cap-order-item
        v-for="(item, index) in orders"
        :key="item.orderId"
        :order="item"
        @btnclick="onBtnClick(index, $event)"
        @itemclick="onItemClick(index, $event)"
        @timeout="onTimeout(index, $event)"
      ></cap-order-item>
    </slot>
  </div>
</template>

<script>
import { Waterfall } from 'vant';
import Vue from 'vue';
import OrderItem from './item';
Waterfall.install(Vue);

export default {
  name: 'cap-order-list',
  components: {
    'cap-order-item': OrderItem
  },
  props: {
    loadMoreOrder: {
      type: Function,
      validator(value) {
        return typeof value === 'function';
      }
    },
    orders: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    loadMore() {
      this.loadMoreOrder();
    },
    onBtnClick(index, event) {
      this.$emit('btnclick', event.type, event.order, index);
    },
    onItemClick(index, event) {
      this.$emit('itemclick', event.order, index);
    },
    onTimeout(index, event) {
      this.$emit('timeout', event.order, index);
    }
  }
};
</script>

<style lang="postcss">
.cap-order-list {
  overflow: hidden;
}
</style>
