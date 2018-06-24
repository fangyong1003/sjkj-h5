<template>
  <div class="vip-intro">
    <van-cell-group>
      <van-cell v-for="item in levels">
        <div class="levels" :class="item.levelInnerCode"></div>
        <dl>
          <dd :class="{'active': item.levelInnerCode === currentLevelInnerCode }">{{item.levelName}}<span v-if="item.levelInnerCode === currentLevelInnerCode">（当前我是{{currentLevelInnerCode}}会员）</span></dd>
          <dd class="intro">升级条件：<p>{{item.levelRuleText}}</p></dd>
          <dd class="intro">会员权益：
            <ul>
              <li v-for="(benifit, index) in item.privileges">{{index + 1}}. {{benifit.privilegeText}}</li>
            </ul>
          </dd>
        </dl>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup, Toast } from 'vant';

export default {
  name: 'vip-intro',

  components: {
    'van-cell-group': CellGroup,
    'van-cell': Cell
  },

  props: {
    currentLevelInnerCode: String,
    levels: Array
  },

  data() {
    return {

    };
  },

  methods: {

  }
};
</script>

<style lang="postcss">

  body {
    background-color: #fff;
    padding-top: 40px;
  }
  .van-cell-group::after, .van-cell::after {
    content: none;
  }

  .levels {
    vertical-align: top;
    display: inline-block;
    width: 28px;
    height: 28px;
    background-repeat: no-repeat;
    background-size: 28px 28px;
    margin-right: 15px;
    &.V1 {
      background-image: url('./images/V1.png');
    }
    &.V2 {
      background-image: url('./images/V2.png');
    }
    &.V3 {
      background-image: url('./images/V3.png');
    }
    &.V4 {
      background-image: url('./images/V4.png');
    }
  }
  dl, dd {
    margin: 0;
  }
  .van-cell {
    padding: 0 15px;
    margin-bottom: 8px;
    dl {
      width: calc(100% - 50px);
      vertical-align: top;
      display: inline-block;
      font-size: 14px;
      line-height: 20px;
    }
    .active {
      color: #F23333;
    }
    .intro {
      font-size: 12px;
      color: #666666;
      line-height: 22px;
    }
    p, ul {
      display: inline-block;
      vertical-align: top;
      width: calc(100% - 65px);
    }
  }

</style>
