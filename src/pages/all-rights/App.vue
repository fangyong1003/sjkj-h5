<template>
  <div class="all-rights">
    <div class="all-rights_inner" v-for="item in levels">
      <div class="title" :class="{'active': item.levelInnerCode === currentLevelInnerCode}">{{item.levelInnerCode}}{{item.levelName}}<span v-if="item.levelInnerCode === currentLevelInnerCode">（当前我是{{currentLevelInnerCode}}会员）</span></div>
      <ul class="all-rights_detail">
        <li v-for="right in item.rights" @click="selectInfo(right)" :class="right.type">{{rightMap[right.type]}}</li>
      </ul>
    </div>
    <van-popup class="all-rights_info" v-model="showInfo" position="right" :overlay="false">
      <van-nav-bar
        :title="rightMap[intro.type]"
        left-arrow
        @click-left="onClickLeft"
      />
      <div>
        <div class="all-rights_info-main" :class="intro.type">
          <p>{{rightMap[intro.type]}}</p>
          {{intro.name}}
        </div>
        <div class="all-rights_info-intro">
          <div class="title">权益介绍</div>
          <p>{{intro.text}}</p>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script>
  import { goToPage } from '@/common/helpers';
  import { Cell, CellGroup, Popup } from 'vant';
  const rightMap = {
    'CREDIT': '积分',
    'EXCHANGE': '兑换',
    'RED_PACKAGE': '红包'
  }

  export default {
    name: 'all-rights',

    components: {
      'van-popup': Popup,
      'van-cell-group': CellGroup,
      'van-cell': Cell
    },

    props: {
      currentLevelInnerCode: String,
      levels: Array
    },

    computed: {

    },

    data() {
      return {
        showInfo: false,
        goToPage,
        rightMap,
        intro: {
          type: 'CREDIT',
          name: '自己消费和推荐消费均可获得积分奖励',
          text: '自己消费得70%点石金奖励，可获得直推用户30%点石金奖励'
        }
      };
    },

    methods: {
      selectInfo(data) {
        const { type, name, text } = data;
        if(!type) return;
        this.intro = { type, name, text };
        this.showInfo = true;
      },
      onClickLeft() {
        this.showInfo = false;
      }
    }
  };
</script>
<style lang="postcss">
  @import 'mixins';

  body {
    background-color: #fff;
  }
  .all-rights {
    ._inner {
      position: relative;
      &::after {
        @mixin border-retina (bottom);
      }
    }
    .title {
      padding: 10px 15px;
      position: relative;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      &.active {
        color: #E20B20;
      }
      &:before {
        content: '';
        display: block;
        width: 4px;
        height: 20px;
        background: #F23333;
        position: absolute;
        top: 10px;
        left: 0;
        z-index: 10;
      }
      &::after {
        @mixin border-retina (bottom);
      }
    }
    &_detail {
      display: flex;
      align-items: center;
      flex-flow: row nowrap;
      position: relative;
      &::after {
        @mixin border-retina (bottom);
      }
      li {
        width: 33.3%;
        height: 44px;
        padding-top: 80px;
        background-position: center 28px;
        background-repeat: no-repeat;
        text-align: center;
        font-size: 17px;
        color: #333333;
        line-height: 24px;
        position: relative;
        &:not(:last-child) {
          &::after {
            @mixin border-retina (right);
          }
        }
        &.CREDIT {
          background-size: 38px 40px;
          background-image: url('./images/points.png');
        }
        &.EXCHANGE {
          background-size: 33px 40px;
          background-image: url('./images/exchange.png');
        }
        &.RED_PACKAGE {
          background-size: 33px 40px;
          background-image: url('./images/redbag.png');
        }
      }
    }
    &_info {
      width: 100%;
      height: 100%;
      &-main {
        padding: 20px 20px 20px 70px;
        background-position: 15px center;
        background-repeat: no-repeat;
        font-size: 14px;
        color: #666666;
        line-height: 20px;
        position: relative;
        &::after {
          @mixin border-retina (bottom);
        }
        p {
          margin-bottom: 3px;
          line-height: 24px;
          font-size: 17px;
          color: #333333;
        }
        &.CREDIT {
          background-size: 38px 40px;
          background-image: url('./images/points.png');
        }
        &.EXCHANGE {
          background-size: 33px 40px;
          background-image: url('./images/exchange.png');
        }
        &.RED_PACKAGE {
          background-size: 33px 40px;
          background-image: url('./images/redbag.png');
        }
      }
      &-intro {
        font-size: 14px;
        color: #666666;
        line-height: 25px;
        .title {
          &:after {
            content: none;
          }
        }
        p {
          padding: 0 15px;
        }
      }
    }
  }
</style>
