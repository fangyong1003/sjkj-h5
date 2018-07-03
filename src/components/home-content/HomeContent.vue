<template>
  <section class="home-content">
    <!-- 轮播广告 -->
    <van-swipe v-if="homeBanner.length" :autoplay="3000" class="home-content__swipe">
      <van-swipe-item
        v-for="(item, index) in homeBanner"
        :key="index"
      >
        <div class="home-content__swipe-img-wrap">
          <img class="home-content__swipe-img" :src="item.imgUrl" @click="goToBannerUrl(item)">
        </div>
      </van-swipe-item>
    </van-swipe>

    <!-- 两行活动banner -->
    <div class="home-content__activity-banner">
      <activity-banner :banners="exhibitions"></activity-banner>
      <activity-banner :banners="activities"></activity-banner>
    </div>

    <!-- 单品推荐 -->
    <template v-for="(recommend, index) in recommends">
      <div class="home-content__recommend-group">
        <img class="home-content__recommend-image"
          :src="recommend.exhibition.mainPhoto"
          @click="goToExhibition(recommend)">
      <!--  <goods-list class="home-content__recommend-goods"  :layout="3"  :list="recommend.items"></goods-list>-->
      </div>
    </template>
  </section>
</template>

<script>
import { Swipe, SwipeItem } from 'vant';
import { goToPage } from '@/common/helpers';
import ActivityBanner from '../activity-banner';
import GoodsList from '../goods-list';
import { banner1, banner2, goodsList } from './mock';

const TYPE_MAP = {
  EXHIBITION: 1,
  ACTIVITY: 2,
  RECOMMENDS: 3
};

export default {
  name: 'home-content',

  components: {
    ActivityBanner,
    GoodsList,
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
  },

  props: {
    homeData: Array,
    homeBanner: Array
  },

  data() {
    return {
      banner1,
      banner2,
      goodsList
    };
  },

  computed: {
    exhibitions() {
      const results = this.homeData.filter(item => item.exhibition.type === TYPE_MAP.EXHIBITION)
                                    .map(item => item.exhibition);
      return results;
    },
    activities() {
      const results = this.homeData.filter(item => item.exhibition.type === TYPE_MAP.ACTIVITY)
                                    .map(item => item.exhibition);
      return results;
    },
    recommends() {
      const results = this.homeData.filter(item => item.exhibition.type === TYPE_MAP.RECOMMENDS);
      return results;
    }
  },

  methods: {
    goToBannerUrl(banner) {
      const [type, id] = banner.url.split('&');
      const typeValue = type.split('=')[1];
      const idValue = id.split('=')[1];

      switch (typeValue) {
        case 'item':
          goToPage('goods', {
            id: idValue
          });
          break;
        case 'category':
          goToPage('category');
          break;
        case 'exhibition':
          goToPage('group', {
            type: 'exhibitionId',
            id: idValue
          });
          break;
        case 'url':
          location.href = idValue;
          break;
        case 'pic':
          goToPage('picture', {
            url: idValue,
            name: banner.name
          });
          break;
      }
    },
    goToExhibition(recommend) {
      if(recommend.items.length == 1){
            goToPage('goods', {
              id: recommend.items[0].id,
              exhibitionId:recommend.exhibition.id
            });
      }else{
          goToPage('group', {
            type: 'exhibitionId',
            id: recommend.exhibition.id
          });
      }
    }
  }
};
</script>

<style lang="postcss">
@import 'mixins.css';

.home-content {
  &__swipe {
    z-index: 1;
    .van-swipe__indicators {
      left: auto;
      right: 15px;
      transform: none;
    }
  }

  &__swipe-img-wrap {
    position: relative;
    padding-top: 40%;
    height: 0;
  }

  &__swipe-img {
    @mixin abs-center;

    width: 100%;
  }

  &__activity-banner {
    padding: 10px;

    .activity-banner {
      margin-bottom: 5px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  &__recommend-banner {
    line-height: 40px;
    background: #f7f7f7;
    text-align: center;
  }

  &__recommend-banner-image {
    width: 174px;
    height: 17px;
  }

  &__recommend-image {
    width: 100%;
  }

  &__recommend-goods {
    padding: 7px;
  }
}
</style>
