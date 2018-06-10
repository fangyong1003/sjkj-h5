<template>
  <div class="my-assets-share">
    <div class="my-assets-share_wrap">
      <img :src="bannerUrl" alt="" class="my-assets-share_bg" />
    </div>
    <jz-button class="action-button-done" @click.prevent.stop.native="goShare" >去邀请</jz-button>
    <div class="my-assets-share_pop" :class="{'active': showInfo}">
      <span class="guide-close" @click="hidePop">×</span>
      <span class="guide-arrow"></span>
      <div class="guide-inner">请点击右上角<br>通过【发送给朋友】功能<br>或【分享到朋友圈】功能<br>把消息告诉小伙伴哟～</div>
    </div>
  </div>
</template>
<script>
  import Button from '@/components/button';
  import cookie from '@/common/utils/cookie';
  import { Popup } from 'vant';

  export default {
    name: 'my-assets-share',

    components: {
      'jz-button': Button,
      'van-popup': Popup
    },

    props: {
      bannerUrl: String
    },

    computed: {

    },

    data() {
      return {
        showInfo: false
      };
    },

    methods: {
      hidePop() {
        this.showInfo = false;
      },
      goShare() {
        this.showInfo = true;
      }
    }
  };
</script>
<style lang="postcss">
  @import 'mixins';
  body {
    background-color: #f7f7f7;
  }
  .my-assets-share {
    font-size: 0;
    &_wrap {
      position: relative;
      &::after {
        @mixin border-retina (bottom);
      }
    }
    &_bg {
      width: 100%;
    }
    &_pop {
      display: none;
      z-index: 2000;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.9);
      font-size: 16px;
      line-height: 35px;
      color: #fff;
      text-align: center;
      &.active {
        display: block;
      }
      .guide-close {
        position: absolute;
        top: 0;
        left: 10px;
        font-size: 40px;
        color: #fff;
        cursor: pointer;
      }
      .guide-arrow {
        position: absolute;
        top: 2px;
        right: 15px;
        background: url('./images/guide_arrow.png') top left no-repeat;
        width: 47px;
        height: 44px;
      }
      .guide-inner {
        padding-top: 48px;
        width: 320px;
        margin: 0 auto;
      }
    }
  }
  .action-button-done {
    display: block;
    margin: 7px auto;
    width: 270px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
    border-radius: 100px;
  }
</style>

