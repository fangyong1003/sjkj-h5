<template>
  <section class="top-bar">
    <img class="top-bar__message-icon" src="./images/message.png" @click="onMessageClicked" />
    <div class="top-bar__search" @click="onSearchClicked">
      <img class="top-bar__search-icon" src="./images/search.png" />
      <p class="top-bar__search-text">搜一下就出来了</p>
    </div>
    <div class="top-bar__yuanbao" @click="onDiamondClicked">
      <!-- <p class="">{{ diamond }}</p> -->
      <img class="top-bar__yuanbao-icon" src="./images/yuanbao.png" />
    </div>
  </section>
</template>

<script>
import { goToPage } from '@/common/helpers';

export default {
  name: 'top-bar',

  components: {
  },

  props: {
    diamond: [Number, String]
  },

  data() {
    return {
    };
  },

  computed: {
  },

  methods: {
    onSearchClicked() {
      goToPage('search');
    },
    onDiamondClicked() {
      goToPage('my-assets-gold');
    },
    onMessageClicked() {
      goToPage('message-center');
    }
  }
};
</script>

<style lang="css">
body {
  padding-top: 52px;
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 10px 52px;
  background:#372C2A;
  color: #fff;
  z-index: 10;

  &__message-icon {
    position: absolute;
    top: 14px;
    left: 15px;
    width: 24px;
    height: 24px;
  }

  &__search {
    position: relative;
    padding-left: 44px;
    height: 32px;
    line-height: 32px;
    background: rgba(255,255,255,0.50);
    border-radius: 30px;
    font-size: 14px;
  }

  &__search-icon {
    position: absolute;
    top: 8px;
    left: 17px;
    width: 14px;
    height: 14px;
  }

  &__yuanbao {
    position: absolute;
    right: 0;
    top: 18px;
    width: 52px;
    height: 30px;
    line-height: 17px;
    font-size: 12px;
    text-align: center;
  }

  &__yuanbao-icon {
    width: 24px;
    height: 15px;
  }
}
</style>
