<template>
  <div class="activity-banner">
    <div v-for="banner in banners"
      class="activity-banner__banner-link"
      :style="bannerLinkStyle"
      @click=handleBannerClick(banner.id)>
      <div class="activity-banner__banner-wrap" :style="bannerWrapStyle">
        <img class="activity-banner__banner-image" :src="banner.navigatePhoto" />
      </div>
    </div>
  </div>
</template>

<script>
import { goToPage } from '@/common/helpers';

const ratioConfig = {
  1: '40%',
  2: '80%',
  3: '104.35%'
};

export default {
  name: 'activity-banner',

  components: {
  },

  props: {
    banners: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    bannerLinkStyle() {
      const len = this.banners.length;
      const width = `${(100 / len).toFixed(2)}%`;
      return {
        width
      };
    },
    bannerWrapStyle() {
      const len = this.banners.length;
      const paddingTop = ratioConfig[len] || '100%';
      return {
        paddingTop
      };
    }
  },

  methods: {
    handleBannerClick(id) {
      goToPage('group', {
        type: 'exhibitionId',
        id
      });
    }
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.activity-banner {
  margin: 0 -3px;

  @mixin clearfix;

  &__banner-link {
    float: left;
    padding: 0 3px;
    box-sizing: border-box;
  }

  &__banner-wrap {
    position: relative;
    height: 0;
    border-radius: 5px;
    overflow: hidden;
  }

  &__banner-image {
    @mixin abs-center;

    max-width: 100%;
    max-height: 100%;
  }
}
</style>
