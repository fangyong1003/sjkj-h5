<template>
  <div class="all-rights">
    <div class="all-rights_inner" v-for="item in levels">
      <div class="title" :class="{'active': item.levelInnerCode === currentLevelInnerCode}">{{item.levelName}}<span style="color:#363636" v-if="item.levelInnerCode === currentLevelInnerCode">（当前我是{{currentLevelInnerCode}}会员）</span></div>
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
          text: '自己消费得70%食间豆奖励，可获得直推用户30%食间豆奖励'
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
    background-color: #f4f4f4;
    min-height:100%;
  }
  .all-rights_inner{
    width:90%;
    margin-left:5%;
    border:1px solid #e5e5e5;
    border-radius:8px;
    margin-top:10px;
    background:#fff;
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
        color: #C4D52F;
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
        width: 50%;
        height: 44px;
        padding-top: 60px;
        background-position: center 10px;
        background-repeat: no-repeat;
        text-align: center;
        font-size: 17px;
        color: #333333;
        line-height: 24px;
        position: relative;
        display:none;
        &.CREDIT {
          background-size: 40px 40px;
          background-image: url('./images/points.png');
          display:block;
        }
        &.EXCHANGE {
          background-size: 40px 40px;
          background-image: url('./images/exchange.png');
          display:block;
        }
        &.RED_PACKAGE {
          background-size: 33px 40px;
          background-image: url('./images/redbag.png');
          display:none;
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
          background-size: 40px 40px;
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
