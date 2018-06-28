<template>
  <div class="van-sku-header">
    <div class="van-sku-header__img-wrap">
      <img class="van-sku__goods-img" :src="goodsImg">
    </div>
    <div class="van-sku-header__goods-info">
      <div class="van-sku-header__goods-price">
        <span class="van-sku__header-label">价格</span>
        <total-price v-if="totalData" :total-data="totalData" />
        <template v-else>
          <span class="van-sku__price-symbol">￥</span><span class="van-sku__price-num">{{ price }}</span>
        </template>
        <!-- <span class="van-sku__rule-text" v-if="ruleText">{{ ruleText }}</span> -->
      </div>
      <div class="van-sku-header__selected">
        <span class="van-sku__header-label">已选</span>
        <span class="van-sku__selected-names">{{ selectedSkuValue }}</span>
      </div>
      <div class="van-sku-header__stock">
        <span class="van-sku__header-label">库存</span>
        <span class="van-sku__selected-names">{{ stock }}件</span>
      </div>
      <span class="van-sku__close-icon" @click="onCloseClicked"></span>
    </div>
  </div>
</template>

<script>
import cloneDeep from 'lodash/cloneDeep';
import { getSelectedSkuValues } from '../utils/skuHelper';
import { getSellRuleText, getSellRuleMain, getOrderTotal } from '@/common/helpers';
import TotalPrice from '@/components/total-price';

/* eslint-disable */
export default {
  name: 'van-sku-header',

  components: {
    TotalPrice
  },

  props: {
    skuEventBus: Object,
    sku: Object,
    selectedSku: Object,
    selectedSkuComb: Object,
    selectedNum: Number,
    goods: Object
  },

  computed: {
    ruleText() {
      if (!this.selectedSkuComb) return '';
      return getSellRuleText(this.selectedSkuComb.sellPriceRule);
    },
    skuTree() {
      return this.sku.tree;
    },
    goodsImg() {
      const s1Id = this.selectedSku.s1;
      const skuImg = this.getSkuImg(s1Id);
      // 优先使用选中sku的图片
      return skuImg || this.goods.picture;
    },
    totalData() {
      let total = null;
      if (this.selectedSkuComb && this.selectedSkuComb.sellPriceRule) {
        const { sellPriceRule, diamondYuan } = this.selectedSkuComb;
        total = getOrderTotal([[{
          quantity: 1,
          sku: {
            sellPriceRule,
            diamondYuan
          }
        }]]);
      } 
      return total;
    },
    price() {
      // sku.price是一个格式化好的价格区间
      let value = this.sku.price;
      if (this.selectedSkuComb) {
        value = this.selectedSkuComb.price;
      }
      return value;
    },
    selectedSkuValue() {
      let result = '';
      const values = getSelectedSkuValues(this.skuTree, this.selectedSku)
                      .map(item => item.name);

      if (values.length) {
        result = values.join('，');
      }
      return result;
    },
    stock() {
      let num = this.sku.stock_num;
      if (this.selectedSkuComb) {
        num = this.selectedSkuComb.stock_num;
      }
      return num;
    }
  },

  methods: {
    onCloseClicked() {
      this.skuEventBus.$emit('sku:close');
    },
    getSkuImg(id) {
      if (!id) return;

      // 目前skuImg都挂载在skuTree中s1那类sku上
      const treeItem = this.skuTree.filter(treeItem => treeItem.k_s === 's1')[0] || {};

      if (!treeItem.v) {
        return;
      }

      const matchedSku = treeItem.v.filter(skuValue => skuValue.id === id)[0];
      if (matchedSku && matchedSku.imgUrl) {
        return matchedSku.imgUrl;
      }
    }
  }
};
</script>

<style lang="postcss">
.van-sku-header {
  .total-price {
    display: inline-block;
  }
  .price-num {
    font-size: 14px;

    > span {
      font-size: 14px;
      vertical-align: baseline;
    }
  }
}
</style>
