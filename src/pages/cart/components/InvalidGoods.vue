<template>
  <div class="invalid-goods">
    <div class="title">以下商品暂时无法购买</div>
    <goods
      v-for="(invalidGoods, index) in invalidGoodsList"
      :isInvalid="true"
      :goods="invalidGoods"
      :shopId="-1"
      :key="index">
    </goods>
    <div class="clear-btn-area">
      <div class="clear-btn" @click="clearInvalid">清空失效商品</div>
    </div>
  </div>
</template>

<script>
  import Goods from './Goods';
  import { mapState, mapMutations } from 'vuex';
  import { batchDeleteGoods } from '../api';
  import { Toast } from 'vant';
  import types from '../store/mutation-type';

  export default {
    components: {
      'goods': Goods
    },

    computed: {
      ...mapState(['invalidGoodsList'])
    },

    methods: {
      ...mapMutations({
        clearInvalidGoodsList: types.CLEAR_INVALID_GOODS_LIST
      }),

      clearInvalid() {
        batchDeleteGoods(this.invalidGoodsList).then(resp => {
          if (resp.code !== 0) {
            Toast(resp.msg);
          } else {
            Toast('成功清除失效商品');
            this.clearInvalidGoodsList();
          }
        });
      }
    }
  };
</script>

<style>
  @import "mixins";

  .invalid-goods {
    background: #fff;
    padding-bottom: 10px;
    position: relative;

    /* &::after {
      @mixin border-retina (bottom);
    } */

    .title {
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
      text-align: center;
      background: #fafafa;
      color: #999;
      position: relative;
      font-size: 12px;

      /* &::after {
        @mixin border-retina (top, bottom);
      } */
    }

    .goods {

      .goods-card {
        margin-left: 10px;
      }
    }
  }

  .clear-btn {
    width: 174px;
    height: 35px;
    line-height: 21px;
    box-sizing: border-box;
    padding: 6px 44px;
    border: 1px solid #f60;
    color: #f60;
    font-size: 14px;
    margin: 0 auto;
    border-radius: 4px;
  }
</style>
