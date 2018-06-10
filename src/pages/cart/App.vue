<template>
  <div class="shop-cart">
    <empty-list v-if="!someShopHasGoods && !isLoadingData && !(invalidGoodsList.length)"></empty-list>
    <shop
      v-for="(shopInfo, index) in allShopInfo"
      :shop-info="shopInfo"
      :key="index">
    </shop>
    <invalid-goods v-if="invalidGoodsList.length"></invalid-goods>
    <cart-bottom v-if="someShopHasGoods"></cart-bottom>
    <nav-bar active="cart"></nav-bar>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import NavBar from '@/components/nav-bar';
  import EmptyList from './components/EmptyList';
  import CartBottom from './components/CartBottom';
  import InvalidGoods from './components/InvalidGoods';
  import Shop from './components/Shop';
  import { IS_CROSS_SHOP_CART } from './constant';
  import YZLocalStorage from '@/common/utils/local_storage';
  import some from 'lodash/some';

  export default {
    components: {
      NavBar,
      'empty-list': EmptyList,
      'cart-bottom': CartBottom,
      'shop': Shop,
      'invalid-goods': InvalidGoods
    },

    data() {
      return {
        isCrossShopCart: IS_CROSS_SHOP_CART
      };
    },

    computed: {
      ...mapState(['allShopInfo', 'isLoadingData', 'invalidGoodsList']),
      shouldShowLoginTips() {
        // 展示登录提示: 购物车中有商品，但是没有登录， 且一天之内没有取消
        // 拿不到时返回的是null
        const lastTime = +YZLocalStorage.getItem('close-tip-time');
        const interval = (new Date()).getTime() - lastTime;
        const oneDayMicroSeconds = 24 * 60 * 60 * 1000;
        return interval > oneDayMicroSeconds;
      },
      someShopHasGoods() {
        return some(this.allShopInfo, shop => {
          return shop.goodsList.length > 0;
        });
      }
    },

    methods: {
      ...mapActions(['getCartDataAction'])
    },

    created() {
      this.getCartDataAction();
    }
  };
</script>

<style>
  body {
    background-color: #f8f8f8;
  }

  .shop-cart {
    padding-bottom: 50px;
  }

  .van-dialog {
    width: 270px;
  }

  .van-dialog__confirm {
    color: #f00;
  }

  .van-toast--text {
    min-width: 120px;
  }

  .no-footer {
    padding-bottom: 80px;
  }
</style>
