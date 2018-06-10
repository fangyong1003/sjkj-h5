<template>
  <van-popup v-model="show" v-if="!isSkuEmpty" position="bottom" lockOnScroll preventScroll>
    <div class="van-sku-container">
      <div class="van-sku-layout">
        <slot name="sku-header" :skuEventBus="skuEventBus" :selectedSku="selectedSku" :selectedSkuComb="selectedSkuComb">
          <van-sku-header
            :skuEventBus="skuEventBus"
            :selectedSku="selectedSku"
            :selectedSkuComb="selectedSkuComb"
            :selectedNum="selectedNum"
            :goods="goods"
            :sku="sku">
          </van-sku-header>
        </slot>
        <div class="van-sku-body scroller" :style="bodyStyle">
          <slot name="sku-group" :selectedSku="selectedSku" :skuEventBus="skuEventBus">
            <div v-if="hasSku" class="van-sku-group-container">
              <div v-for="(skuTreeItem, index) in skuTree"
                class="van-sku-row-group"
                :key="index">
                <van-sku-row
                  :skuEventBus="skuEventBus"
                  :skuRow="skuTreeItem">
                  <van-sku-row-item
                    v-for="(skuValue, index) in skuTreeItem.v"
                    :key="index"
                    :skuKeyStr="skuTreeItem.k_s"
                    :skuValue="skuValue"
                    :skuEventBus="skuEventBus"
                    :selectedSku="selectedSku"
                    :skuList="sku.list">
                  </van-sku-row-item>
                </van-sku-row>
              </div>
            </div>
          </slot>
          <slot name="extra-sku-group" :skuEventBus="skuEventBus"></slot>
          <slot name="sku-stepper" :skuEventBus="skuEventBus" :selectedSku="selectedSku" :selectedSkuComb="selectedSkuComb" :selectedNum="selectedNum">
            <van-sku-stepper
              ref="skuStepper"
              :skuEventBus="skuEventBus"
              :selectedSku="selectedSku"
              :selectedSkuComb="selectedSkuComb"
              :selectedNum="selectedNum"
              :stepperTitle="stepperTitle"
              :skuStockNum="sku.stock_num"
              :quota="quota"
              :quotaUsed="quotaUsed"
              :disableStepperInput="disableStepperInput"
              :hideStock="hideStock">
            </van-sku-stepper>
          </slot>
        </div>
        <slot name="sku-actions" :skuEventBus="skuEventBus">
          <van-sku-actions
            :skuEventBus="skuEventBus"
            :buyText="buyText"
            :showAddCartBtn="showAddCartBtn">
          </van-sku-actions>
        </slot>
      </div>
    </div>
  </van-popup>
</template>

<script>
import Vue from 'vue';
import { Popup, Toast } from 'vant';
import { getSellRuleMain } from '@/common/helpers';
import SkuHeader from '../components/SkuHeader';
import SkuRow from '../components/SkuRow';
import SkuRowItem from '../components/SkuRowItem';
import SkuStepper from '../components/SkuStepper';
import SkuActions from '../components/SkuActions';
import { isAllSelected, getSkuComb, getSelectedSkuValues } from '../utils/skuHelper';
import { LIMIT_TYPE, DEFAULT_STEPPER_TITLE } from '../constants';

const { QUOTA_LIMIT } = LIMIT_TYPE;

export default {
  name: 'van-sku',

  components: {
    [Popup.name]: Popup,
    [SkuHeader.name]: SkuHeader,
    [SkuRow.name]: SkuRow,
    [SkuRowItem.name]: SkuRowItem,
    [SkuStepper.name]: SkuStepper,
    [SkuActions.name]: SkuActions
  },

  props: {
    goods: Object,
    goodsId: [Number, String],
    initialSku: {
      type: Object,
      default() {
        return {};
      }
    },
    sku: Object,
    quota: {
      type: Number,
      default: 0
    },
    quotaUsed: {
      type: Number,
      default: 0
    },
    hideStock: Boolean,
    showAddCartBtn: {
      type: Boolean,
      default: true
    },
    buyText: String,
    stepperTitle: {
      type: String,
      default: DEFAULT_STEPPER_TITLE
    },
    bodyOffsetTop: {
      type: Number,
      default: 200
    },
    resetStepperOnHide: Boolean,
    disableStepperInput: Boolean,
    value: Boolean
  },

  data() {
    return {
      selectedSku: {},
      selectedNum: 1,
      show: this.value
    };
  },

  watch: {
    show(val) {
      this.$emit('input', val);
      if (!val) {
        const selectedSkuValues = getSelectedSkuValues(this.sku.tree, this.selectedSku);

        this.$emit('sku-close', {
          selectedSkuValues,
          selectedNum: this.selectedNum,
          selectedSkuComb: this.selectedSkuComb
        });

        if (this.resetStepperOnHide) {
          this.$refs.skuStepper && this.$refs.skuStepper.setCurrentNum(1);
        }
      }
    },
    value(val) {
      this.show = val;
    },
    skuTree(val) {
      this.resetSelectedSku(val);
    }
  },

  computed: {
    bodyStyle() {
      const windowHeight = window.innerHeight;
      // header高度82px, sku actions高度50px，如果改动了样式自己传下bodyOffsetTop调整下
      const maxHeight = windowHeight - this.bodyOffsetTop;

      return {
        maxHeight: `${maxHeight}px`
      };
    },
    isSkuCombSelected() {
      return isAllSelected(this.sku.tree, this.selectedSku);
    },
    // sku数据不存在时不渲染模板
    isSkuEmpty() {
      for (const key in this.sku) {
        if (Object.prototype.hasOwnProperty.call(this.sku, key)) return false;
      }
      return true;
    },
    hasSku() {
      return !this.sku.none_sku;
    },
    selectedSkuComb() {
      if (!this.hasSku) {
        return {
          id: this.sku.collection_id,
          price: Math.round(this.sku.price * 100),
          'stock_num': this.sku.stock_num // eslint-disable-line
        };
      } else if (this.isSkuCombSelected) {
        const comb = getSkuComb(this.sku.list, this.selectedSku);
        let price = comb.price;
        // 计算现金+点石金/余额+点石金情况下的价格
        const mainRuleValue = getSellRuleMain(comb.sellPriceRule);
        if (mainRuleValue) {
          price = mainRuleValue;
        }

        return {
          ...comb,
          skuValues: getSelectedSkuValues(this.sku.tree, this.selectedSku),
          price
        };
      }
      return null;
    },
    skuTree() {
      return this.sku.tree || [];
    }
  },

  created() {
    const skuEventBus = new Vue();
    this.skuEventBus = skuEventBus;

    skuEventBus.$on('sku:close', this.handleCloseClicked);
    skuEventBus.$on('sku:select', this.handleSkuSelected);
    skuEventBus.$on('sku:numChange', this.handleNumChange);
    skuEventBus.$on('sku:overLimit', this.handleOverLimit);
    skuEventBus.$on('sku:addCart', this.handleAddCartClicked);
    skuEventBus.$on('sku:buy', this.handleBuyClicked);

    this.resetSelectedSku(this.skuTree);
    // 组件初始化后的钩子，抛出skuEventBus
    this.$emit('after-sku-create', skuEventBus);
  },

  methods: {
    resetSelectedSku(skuTree) {
      this.selectedSku = {};
      skuTree.forEach((item) => {
        // 只有一个sku规格值时默认选中
        if (item.v.length === 1) {
          this.selectedSku[item.k_s] = item.v[0].id;
        } else {
          this.selectedSku[item.k_s] = this.initialSku[item.k_s] || '';
        }
      });
    },
    validateSku() {
      if (this.selectedNum === 0) {
        return '商品已经无法购买啦';
      }

      if (!this.isSkuCombSelected) {
        return '请选择完整的规格';
      }

      return '';
    },
    handleCloseClicked() {
      this.show = false;
    },
    handleSkuSelected(skuValue) {
      // 点击已选中的sku时则取消选中
      this.selectedSku = this.selectedSku[skuValue.skuKeyStr] === skuValue.id
        ? { ...this.selectedSku, [skuValue.skuKeyStr]: '' }
        : { ...this.selectedSku, [skuValue.skuKeyStr]: skuValue.id };

      this.$emit('sku-selected', {
        skuValue,
        selectedSku: this.selectedSku,
        selectedSkuComb: this.selectedSkuComb
      });
    },
    handleNumChange(num) {
      this.selectedNum = num;
    },
    handleOverLimit({ action, limitType, quota, quotaUsed }) {
      if (action === 'minus') {
        Toast('至少选择一件');
      } else if (action === 'plus') {
        if (limitType === QUOTA_LIMIT) {
          let msg = `限购${quota}件`;
          if (quotaUsed > 0) msg += `，您已购买${quotaUsed}件`;
          Toast(msg);
        } else {
          Toast('库存不足');
        }
      }
    },
    handleAddCartClicked() {
      this.handleBuyOrAddCart('add-cart');
    },
    handleBuyClicked() {
      this.handleBuyOrAddCart('buy-clicked');
    },
    handleBuyOrAddCart(type) {
      const error = this.validateSku();
      if (error) {
        Toast(error);
        return;
      }
      this.$emit(type, {
        goodsId: this.goodsId,
        selectedNum: this.selectedNum,
        selectedSkuComb: this.selectedSkuComb
      });
    }
  }
};
</script>

<style lang="postcss">

.van-sku {
  &-container {
    background: #fff;
  }

  &-layout {
    background: #fff;
  }

  &-body {
    max-height: 350px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &-group-container {
    margin-left: 20px;
    padding: 6px 0 2px;
  }

  &-row-group {
    margin: 0 15px 10px 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* sku header */
  &-header {
    margin-left: 20px;

    &__img-wrap {
      position: relative;
      float: left;
      margin-top: -10px;
      width: 100px;
      height: 100px;
      background: #fff;
      border-radius: 5px;
      overflow: hidden;

      .van-sku__goods-img {
        position: absolute;
        margin: auto;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        max-width: 100%;
        max-height: 100%;
      }
    }

    &__goods-info {
      padding: 12px 10px 10px 10px;
      min-height: 100px;
      overflow: hidden;
      box-sizing: border-box;
    }

    &__goods-price {
      line-height: 25px;
      color: #f00;
    }

    &__selected,
    &__stock {
      line-height: 25px;
    }
  }

  &__header-label {
    margin-right: 9px;
    color: #666;
    font-size: 14px;
  }

  &__goods-name {
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__price-symbol {
    margin-left: -2px;
    font-size: 14px;
    vertical-align: baseline;
  }

  &__price-num {
    font-size: 14px;
    vertical-align: baseline;
  }

  &__rule-text {
    line-height: 20px;
    font-size: 14px;
    color: #999;
    vertical-align: baseline;
  }

  &__selected-names {
    font-size: 14px;
    color: #333;
  }

  &__close-icon {
    position: absolute;
    top: -35px;
    right: 0px;
    width: 36px;
    height: 36px;
    background: #fff;

    &::after {
      content: '';
      display: block;
      width: 36px;
      height: 36px;
      background: url('../images/close.png');
      background-size: 36px 36px;
      background-repeat: no-repeat;
    }
  }

  /* sku row */
  &-row {
    &__title {
      padding-bottom: 16px;
      line-height: 24px;
      font-size: 17px;
      color: #333;
    }

    &__item {
      display: inline-block;
      padding: 5px 19px;
      margin: 0 20px 10px 0;
      height: 28px;
      min-width: 52px;
      line-height: 16px;
      font-size: 14px;
      color: $text-color;
      text-align: center;
      border: 1px solid #979797;
      border-radius: 21px;
      box-sizing: border-box;

      &.van-sku-row__item--active {
        color: #f00;
        border-color: #f00;
      }

      &.van-sku-row__item--disabled {
        background: #e8e8e8;
        border-color: #e5e5e5;
        color: #c9c9c9;
      }
    }
  }

  /* sku stepper */
  &-stepper {
    &-stock {
      padding: 20px 0;
      margin-left: 20px;
    }

    &-container {
      height: 36px;
      margin-right: 23px;
    }
  }

  &__stepper {
    top: 7px;
    left: 4px;
    float: right;

    &-title {
      float: left;
      line-height: 36px;
      font-size: 14px;
    }

    .van-stepper__input {
      width: 50px;
      border: 0 none;
      font-size: 20px;
      opacity: 1;
    }

    .van-stepper__stepper {
      width: 50px;
      height: 36px;
      border: 0 none;
      &::before {
        width: 18px;
        height: 4px;
        background-color: #d8d8d8;
      }
      &::after {
        width: 4px;
        height: 18px;
        background-color: #d8d8d8;
      }
    }
  }

  &__stock {
    display: inline-block;
    margin-right: 10px;
    color: #999;
    font-size: 12px;
  }

  &__quota {
    display: inline-block;
    color: #f00;
    font-size: 12px;
  }

  /* sku actions */
  &-actions {
    padding: 0 52px;
    margin-bottom: 20px;
    font-size: 0;
  }

  &__add-cart-btn {
    width: 50%;
    height: 50px;
    padding: 0;
    border: 0;
    background: #f85;
    color: #fff;
    font-size: 16px;
    line-height: 50px;
    text-align: center;

    & + .van-sku__buy-btn {
      width: 50%;
    }
  }

  &__buy-btn {
    width: 100%;
    height: 44px;
    padding: 0;
    border: 0;
    background: #f00;
    color: #fff;
    font-size: 20px;
    line-height: 44px;
    text-align: center;
    background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
    border-radius: 100px;
    letter-spacing: .8px;
  }
}
</style>
