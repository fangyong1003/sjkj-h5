<template>
  <div class="help-center">
    <div class="problems" v-for="q in problems" @click="selectInfo(q)">{{q.name}}</div>
    <van-popup class="help-center_info" v-model="showInfo" position="right" :overlay="false">
      <div class="name"><van-icon name="arrow-left" @click="onBackClick" /><span>{{intro.name}}</span></div>
      <p>{{intro.text}}</p>
    </van-popup>
  </div>
</template>
<script>
  import { goToPage } from '@/common/helpers';
  import { Popup, Icon } from 'vant';
  import problems from './problems';

  export default {
    name: 'help-center',

    components: {
      'van-popup': Popup,
      'van-icon': Icon
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
        padding: 12px;
        position: relative;
        &::after {
          @mixin border-retina (bottom);
        }
        span {
          line-height: 30px;
        }
        .van-icon, span {
          vertical-align: baseline;
        }
        .van-icon {
          color: #448EF1;
          margin-right: 5px;
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

