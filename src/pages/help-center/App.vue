<template>
  <div class="help-center">
    <van-nav-bar title="帮助中心" left-arrow @click-left="onClickLeft">
      <a :href="telStr" class="phone" slot="right"/>
    </van-nav-bar>
    <div class="problems" v-for="q in problems" @click="selectInfo(q)">{{q.name}}</div>
    <van-popup class="help-center_info" v-model="showInfo" position="right" :overlay="false">
      <van-nav-bar title="帮助中心" left-arrow @click-left="onBackClick">
        <a :href="telStr" class="phone" slot="right"/>
      </van-nav-bar>
      <div class="name">{{intro.name}}</div>
      <p>{{intro.text}}</p>
    </van-popup>
  </div>
</template>
<script>
  import { goToPage } from '@/common/helpers';
  import { Popup } from 'vant';
  import problems from './problems';
  
  export default {
    name: 'help-center',

    components: {
      'van-popup': Popup
    },

    props: {
      
    },

    computed: {
      telStr() {
        return `tel:${this.sellerPhone}`
      }
    },

    data() {
      return {
        showInfo: false,
        goToPage,
        problems,
        sellerPhone: '',
        intro: {
          name: '',
          text: ''
        }
      };
    },

    methods: {
      selectInfo(data) {
        const { name, text } = data;
        this.intro = { name, text };
        this.showInfo = true;
      },
      onBackClick() {
        this.showInfo = false;
      },
      onClickLeft() {
        goToPage('user-center');
      }
    }
  };
</script>
<style lang="postcss">
  @import 'mixins';
  body {
    background-color: #fff;
  }
  .help-center {
    .phone {
      display: inline-block;
      width: 16px;
      height: 16px;
      background-image: url('./images/phone.png');
      background-size: 16px;
      background-repeat: no-repeat;
      vertical-align: middle;
    }
    .problems {
      font-size: 17px;
      color: #333333;
      line-height: 30px;
      padding: 12px;
      position: relative;
      &::after {
        @mixin border-retina (bottom);
      }
    }
    &_info {
      width: 100%;
      height: 100%;
      .name {
        line-height: 30px;
        padding: 12px;
        position: relative;
        &::after {
          @mixin border-retina (bottom);
        }
      }
      p {
        padding: 12px;
        line-height: 30px !important;
        font-size: 14px;
        color: #333333;
        line-height: 31px;
      }
    }
  }
</style>

