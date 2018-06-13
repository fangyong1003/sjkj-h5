<template>
  <div class="captaglist">
    <!-- <img :src="category.banner" alt="" /> -->
    <!-- <div v-if="isSecondNav" class="captaglist-list">
      <span class="right"></span>
      {{name}}
      <span class="left"></span>
    </div>-->
    <slot name="banner"></slot>
    <goods-list
      :layout="1"
      :list="goodsList"
      v-waterfall-lower="fetchGoods"
      :waterfall-disabled="waterfallDisabled"
    />
  </div>
</template>
<script>
  import { Toast, Waterfall, Loading } from 'vant';
  import { getCategory } from '../api';
  import GoodsList from '@/components/goods-list';

  const tagCache = {};

  export default {
    name: 'captaglist',

    data() {
      return {
        name: '',
        goodsList: [],
        status: 'empty',
        // isSecondNav: true,
        categoryId: 0,
        pageNo: 1
      };
    },

    computed: {
      waterfallDisabled() {
        return this.status === 'finished' || this.status === 'loading';
      }
    },

    directives: {
      WaterfallLower: Waterfall('upper')
    },

    watch: {
      '$route.query'(query) {
        this.name = query.name;
      },
      '$route.params'(params) {
        const cache = tagCache[params.type] || {};
        this.categoryId = params.type;
        this.goodsList = cache.goodsList || [];
        this.status = cache.status || '';
        this.pageNo = cache.pageNo || 1;
        this.fetchGoods();
      }
    },

    components: {
      'goods-list': GoodsList,
      [Loading.name]: Loading
    },

    methods: {
      fetchGoods() {
        console.log('this.waterfallDisabled', this.waterfallDisabled)
        if (this.status === 'loading' || this.status === 'finished' || this.waterfallDisabled) {
          return;
        }

        this.status = 'loading';
        console.log('jinlai')
        getCategory({
          pageNo: this.pageNo,
          categoryId: +this.categoryId
        }).then((res) => {
          const { data, total } = res.result;
          console.log('res ===>', res)
          if (data.length + this.goodsList.length >= total) {
            this.status = 'finished';
          } else {
            this.status = '';
            this.pageNo++;
          }
          this.goodsList = this.goodsList.concat(data);
          tagCache[this.categoryId] = {
            goodsList: this.goodsList,
            status: this.status,
            pageNo: this.pageNo
          };
        }).catch(err => {
          console.log('err', err)
          Toast(err);
          this.status = '';
        });
      }
    },

    created() {
      const { query, params } = this.$route;
      this.name = query.name;
      this.categoryId = params.type;
      this.fetchGoods();
    }
  };
</script>
<style lang="postcss">
  @import "mixins";

  .captaglist {
    padding: 16px 18px;
    background: #fff;

    .goods-list {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .goods-list-item {
      width: 100% !important;

      .goods-list__title {
        height: 20px;
        color: #666;
      }

      .goods-list__price {
        text-align: left;
      }
    }
  }

  /* .captaglist {
    padding: 16px 18px;
    background: #fff;
    > img {
      height: 90px;
      width: 100%;
    }
    &-list {
      padding-top: 15px;
      text-align: center;
      color: #FF3132;
      letter-spacing: 1.4px;
      line-height: 18px;
      font-size: 18px;
      margin-bottom: 30px;
      span {
        vertical-align: middle;
        display: inline-block;
        width: 40px;
        height: 2px;
        &.left {
          background-image: linear-gradient(-90deg, rgba(255,255,255,0.00) 0%, #FF0000 97%);
        }
        &.right {
          background-image: linear-gradient(-270deg, rgba(255,255,255,0.00) 3%, #FF0000 100%);
        }
      }
    }
    ul {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-flow: row wrap;
      li {
        height: 100px;
        text-align: center;
        margin-bottom: 20px;
        font-size: 14px;
        color: #666666;
        letter-spacing: 1.09px;
      }
      img {
        display: block;
        width: 66px;
        height: 66px;
        margin-bottom: 13px;
        position: relative;
        &::after {
          @mixin border-retina ();
        }
      }
    }
  } */
</style>
