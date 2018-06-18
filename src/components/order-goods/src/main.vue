<template>
  <van-cell-group class="cap-order-goods">
    <cap-order-goods-header
      :title="shopName"
      :link="shopLink"
      :icon="headerIcon"
      :badge="headerBadge"
    />
    <slot name="top"></slot>
    <cap-order-goods-empty
      v-if="isEmpty"
      :icon="emptyIcon"
      :message="emptyMessage"
      :button-text="emptyButtonText"
    />
    <div class="cap-order-goods-list van-cell van-hairline">
      <cap-order-goods-card
        v-for="(item, index) in itemList"
        :data="item"
        :key="item.goodsTitle + index"
        @card-click="handleCardClick"
      />
    </div>
    <slot></slot>
  <!--  <template v-if="!isEmpty">
      <cap-order-goods-price
        v-if="showTotalPrice"
        :price="price"
        :shopTotalData="shopTotalData"
        :num="totalNum"
      />
    </template>-->
    <slot name="bottom"></slot>
  </van-cell-group>
</template>

<script>
import { CellGroup } from 'vant';
import { goToPage, getOrderTotal } from '@/common/helpers';
import Header from './components/header';
import Empty from './components/empty';
import Price from './components/price';
import Card from './components/card';

export default {
  name: 'cap-order-goods',

  components: {
    [Empty.name]: Empty,
    [Header.name]: Header,
    [Price.name]: Price,
    [Card.name]: Card,
    [CellGroup.name]: CellGroup
  },

  model: {
    prop: 'message'
  },

  props: {
    shopName: String,
    shopLink: String,
    message: String,
    price: [Number, String],
    points: Number,
    headerBadge: String,
    headerIcon: {
      type: String,
      default: 'shop'
    },
    emptyIcon: {
      type: String,
      default: 'https://b.yzcdn.cn/v2/image/wap/trade/new_order/empty@2x.png'
    },
    emptyMessage: {
      type: String,
      default: '哎呀，当前没有可购买的商品，请重新选择～'
    },
    emptyButtonText: {
      type: String,
      default: '返回重新选择'
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    showTotalPrice: {
      type: Boolean,
      default: true
    },
    messageEditable: {
      type: Boolean,
      default: true
    },
    itemList: {
      type: Array,
      default() {
        return [];
      }
    },
    disableCardClick: Boolean
  },

  computed: {
    isEmpty() {
      return this.itemList.length === 0;
    },
    totalNum() {
      const totalNum = this.itemList.reduce((total, item) => {
        const newTotal = total + Number(item.goodsNumber);
        return newTotal;
      }, 0);
      return totalNum;
    },
    shopTotalData() {
      if (!this.itemList[0].sku) return null;
      return getOrderTotal([this.itemList])
    }
  },

  methods: {
    handleCardClick(id) {
      if (this.disableCardClick) return;

      goToPage('goods', {
        id
      });
    }
  }
};
</script>

<style lang="postcss">
.cap-order-goods {
  background-color: #fff;

  &-list {
    padding: 10px 0;
  }

  &::after {
    border-top: 0 none;
  }

  &:last-child::after {
    border-bottom: 0 none;
  }
}
</style>
