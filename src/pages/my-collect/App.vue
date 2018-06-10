<template>
  <div>
    <div class="fav-goods-list"
      v-waterfall-lower="fetchGoods"
      :waterfall-disabled="waterfallDisabled"
    >
      <goods-card
        v-for="(favGoods, index) in favGoodsList"
        :key="index"
        :data="favGoods"
      />
    </div>
    <div class="fav-goods__recommend" v-if="recommendList.length">
      <img src="../cart/images/recommend.png" width="174">
      <goods-list
        layout="2"
        :list="recommendList"
        showOrigin
        showTags
      />
    </div>
  </div>
</template>

<script>
import { Toast, Waterfall } from 'vant';
import GoodsList from '@/components/goods-list';
import GoodsCard from '@/components/goods-card';
import recommendApi from '@/common-api/recommend';
import api from './api';

export default {
  name: 'my-collect',

  components: {
    GoodsList,
    GoodsCard
  },

  directives: {
    WaterfallLower: Waterfall('lower')
  },

  data() {
    return {
      recommendList: [],
      favGoodsList: [],
      status: 'empty',
      pageNo: 1
    };
  },

  computed: {
    waterfallDisabled() {
      return this.status === 'finished' || this.status === 'loading';
    }
  },

  methods: {
    fetchGoods() {
      if (this.status === 'loading' || this.status === 'finished' || this.waterfallDisabled) {
        return;
      }

      this.status = 'loading';

      api.getFavGoods({
        pageNo: this.pageNo
      }).then((res) => {
        const { data, total } = res.result;
        if (data.length + this.favGoodsList.length >= total) {
          this.status = 'finished';
        } else {
          this.status = '';
          this.pageNo++;
        }
        this.favGoodsList = this.favGoodsList.concat(this.formatGoodsList(data));
      }).catch(err => {
        Toast(err);
        this.status = '';
      });
    },

    formatGoodsList(goodsList) {
      return goodsList.map(goods => {
        const item = goods.item;
        return {
          id: goods.itemId,
          sellPriceString: item.price.sellPriceYuan,
          goodsSpecs: '',
          title: item.title,
          image: item.photos[0]
        };
      });
    }
  },

  created() {
    recommendApi.getRecommendList().then((resp) => {
      this.recommendList = resp.result.data;
    });
  }
};
</script>

<style lang="postcss">
.fav-goods__recommend {
  margin-top: 10px;
  text-align: center;

  .goods-list {
    margin-top: 10px;
  }
}
</style>
