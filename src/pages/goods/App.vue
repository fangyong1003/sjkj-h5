<template>
  <div class="goods">
    <goods-brief
      :price="price.sellPrice"
      :originPrice="price.originPrice"
      :diamond="price.diamondYuan"
      :sales="sales"
      :title="title"
      :photos="photos"
      :extraText="extraRuleText"
      @buy="handleSelectSku()">
    </goods-brief>
    <goods-detail
      :desc="detail.description"
      :photos="detail.photos"
    ></goods-detail>
    <goods-action
      :cartNum="cartNum"
      :collected="collected"
      @collect="handleCollect"
      @add-cart="handleAddCart"
      @buy="handleBuy"></goods-action>
    <sku
      v-model="showSku"
      :sku="formatedSku"
      :goods="goods"
      :goodsId="goodsId"
      :disableStepperInput="true"
      :showAddCartBtn="false"
      buyText="确定"
      @buy-clicked="handleConfirm"
      @sku-close="handleSkuClose"
    />
  </div>
</template>

<script>
import { Toast } from 'vant';
import Sku from '@/components/sku';
import { checkLogin } from '@/common/helpers';
import GoodsBrief from './components/goods-brief';
import GoodsDetail from './components/goods-detail';
import GoodsAction from './components/goods-action';
import * as api from './api';
import { formatSku } from './util';

const SKU_TYPE = {
  CART: 0,
  BUY: 1,
  SELECT: 2
};

export default {
  name: 'goods',

  components: {
    GoodsBrief,
    GoodsDetail,
    GoodsAction,
    Sku
  },

  props: {
    goodsData: Object,
    exhibitionId: Number
  },

  data() {
    const {
      price, detail, title,
      photos, skus, specs, sales,
      vendorId, shopId, id: goodsId
    } = this.goodsData;
    const formatedSku = formatSku(skus, specs);
    const goods = {
      picture: photos[0]
    };
    return {
      vendorId,
      shopId,
      goodsId,
      goods,
      title,
      photos,
      sales,
      price,
      detail,
      formatedSku,
      cartNum: 0,
      skuType: SKU_TYPE.BUY,
      showSku: false,
      collected: false,
      collectAjaxing: false,
      skuData: null,
      extraRuleText: ''
    };
  },

  methods: {
    handleCollect() {
      if (!checkLogin()) return;
      if (this.collectAjaxing) return;

      this.collectAjaxing = true;
      const action = this.collected ? 'delete' : 'post';
      api[`${action}FavGoods`](this.goodsId).then(() => {
        this.collectAjaxing = false;
        this.collected = !this.collected;
      }).catch((err) => {
        this.collectAjaxing = false;
        Toast(err);
      });
    },
    handleAddCart() {
      if (this.skuData) {
        this.addToCart(this.skuData);
        return;
      }
      this.skuType = SKU_TYPE.CART;
      this.showSku = true;
    },
    handleSelectSku() {
      this.skuType = SKU_TYPE.SELECT;
      this.showSku = true;
    },
    handleBuy() {
      if (this.skuData) {
        const { buyGoodsData, orderData } = this.getConfirmData(this.skuData);
        api.goToConfirm(buyGoodsData, orderData);
        return;
      }
      this.skuType = SKU_TYPE.BUY;
      this.showSku = true;
    },
    handleSkuClose(data) {
      if (this.skuType === SKU_TYPE.SELECT && !data.selectedSkuComb) {
        this.skuData = null;
      }
      if (data.selectedSkuComb && data.selectedSkuComb.sellPriceRule) {
        // this.extraRuleText = getSellRuleText(data.selectedSkuComb.sellPriceRule);
      }
    },
    handleConfirm(data) {
      if (!checkLogin()) return;

      if (this.skuType === SKU_TYPE.SELECT) {
        this.showSku = false;
        this.skuData = data;
        return;
      }

      if (this.skuType === SKU_TYPE.BUY) {
        const { buyGoodsData, orderData } = this.getConfirmData(data);
        api.goToConfirm(buyGoodsData, orderData);
      } else if (this.skuType === SKU_TYPE.CART) {
        this.addToCart(data);
      }
    },
    addToCart(data) {
      const {
        goodsId: itemId,
        selectedNum: quantity,
        selectedSkuComb: {
          id: skuId
        }
      } = data;
      api.addToCart({
        itemId, quantity,
        skuId, exhibitionId: this.exhibitionId
      }).then(() => {
        Toast('加入购物车成功');
        this.refreshCartNum();
        this.showSku = false;
      }).catch(err => {
        Toast(err);
      });
    },
    getConfirmData(skuData) {
      const {
        goodsId: itemId,
        selectedNum: quantity,
        selectedSkuComb: {
          id: skuId,
          price,
          sellPriceRule,
          skuValues,
          diamondYuan
        }
      } = skuData;
      const buyGoodsData = [{
        itemId,
        sellPriceRule,
        sku: {
          sellPriceRule,
          diamondYuan
        },
        goodsCreditsString: diamondYuan,
        image: this.goods.picture,
        goodsNumber: quantity,
        sellPriceString: price,
        goodsAmountString: (price * quantity).toFixed(2),
        goodsTitle: this.title,
        goodsSpecs: skuValues.map(item => item.name).join('，')
      }];
      const orderData = [{
        itemId,
        exhibitionId: this.exhibitionId,
        vendorId: this.vendorId,
        itemSkuId: skuId,
        goodsNumber: quantity,
        shopId: this.shopId
      }];

      return {
        buyGoodsData,
        orderData
      };
    },
    refreshCartNum() {
      api.getCartCount().then((resp) => {
        this.cartNum = resp.result;
      });
    }
  },

  created() {
    api.getFavGoods(this.goodsId).then((resp) => {
      this.collected = resp.result;
    });
    this.refreshCartNum();
  }
};
</script>

<style lang="postcss">
body {
  background-color: #f7f7f7;
}
</style>
