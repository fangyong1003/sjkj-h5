<template>
  <div class="empty-list">
    <img class="empty-list__empty-img" src="../images/empty-cart.png" width="120">
    <h2>购物车还是空的，去添加点什么吧</h2>
    <template v-if="recommendList.length">
      <div class="tit">推荐好物</div>
      <goods-list
        layout="2"
        :list="recommendList"
        showOrigin
        showTags
      />
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import GoodsList from '@/components/goods-list';

export default {
  name: 'empty-list',

  components: {
    GoodsList
  },

  data() {
    return {
      recommendList: []
    };
  },

  methods: {
    ...mapActions(['getRecommendList'])
  },

  created() {
    this.getRecommendList().then((list) => {
      this.recommendList = list;
    });
  }
};
</script>

<style scoped>
  .empty-list {
    padding-top: 30px;
    text-align: center;
    .tit{
      line-height:40px;
      padding-left:15px;
      text-align:left;
      background:#fff;
    }
    h2 {
      margin: 31px 0 18px;
      font-size: 17px;
      line-height: 24px;
      color: #333;
    }

    .desc {
      font-size: 14px;
      color: #999;
    }

    .go-homepage-btn {
      box-sizing: border-box;
      width: 104px;
      height: 36px;
      line-height: 18px;
      padding: 8px 30px;
      font-size: 14px;
      margin: 0 auto;
      border: 1px solid #f60;
      margin-top: 30px;
      color: #f60;
      border-radius: 3px;

      a {
        display: block;
        color: #f60;
      }
    }

  }
</style>
