<template>
  <div class="transport">
    <div class="express" style="margin-bottom: 12px;">
      <img src="" alt=""/>
      <div class="status">
        <div>{{transport.expressStatus}}</div>
        <p>{{transport.expressName}}快递：{{transport.expressNo}}</p>
      </div>
      <div class="orderNo">订单号：{{transport.orderNo}}</div>
    </div>
    <div class="receiver" style="margin-bottom: 12px;">
      <div>{{transport.receiver}}<span>{{transport.mobile}}</span></div>
      <p>{{transport.address}}</p>
    </div>
    <ul class="trace">
      <li v-for="(item, index) in transport.trace" :class="{'active': index === 0}">
        <div class="time">
          <p>{{item.ftime.split(' ')[0]}}</p>
          <span>{{item.time.split(' ')[1]}}</span>
        </div>
        <div class="info">
          <van-icon v-if="index === 0" name="passed"></van-icon>
          <img v-else src="./images/cc-arrow-up-circle.png" />
          <p>{{item.context}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from 'vant';
export default {
  name: "transport",

  props: {
    transport: {
      type: Object,
      default: () => {
        return {
          expressName: '',
          expressStatus: '',
          expressNo: '',
          orderNo: '',
          receiver: '',
          mobile: '',
          address: '',
          trace: []
        };
      }
    }
  },

  components: {
    'van-icon': Icon
  },

  computed: {},

  data() {
    return {};
  },

  methods: {
  },

  created() {}
};
</script>
<style>
  @import 'mixins';
  body {
    background-color: #f7f7f7;
  }
  .express {
    padding: 23px 25px 28px 25px;
    background-color: #fff;
    img {
      display: inline-block;
      width: 64px;
      height: 64px;
      vertical-align: middle;
    }
    .status {
      vertical-align: middle;
      display: inline-block;
      div {
        line-height: 24px;
        font-size: 17px;
        color: #FF0000;
        margin-bottom: 6px;
      }
      p {
        line-height: 20px;
        font-size: 14px;
        color: #666666;
      }
    }
    .orderNo {
      margin-top: 10px;
      line-height: 20px;
      font-size: 14px;
      color: #666666;
    }
  }
  .receiver {
    padding: 10px 12px;
    background-color: #fff;
    div {
      font-size: 17px;
      color: #333333;
      line-height: 24px;
      margin-bottom: 3px;
      span {
        margin-left: 26px;
      }
    }
    p {
      line-height: 20px;
      font-size: 14px;
      color: #999999;
    }
  }
  .trace {
    background-color: #fff;
    li {
      color: #666666;
      position: relative;
      display: flex;
      flex-flow: row;
      align-items: center;
      font-size: 17px;
      line-height: 24px;
      &::after {
        @mixin border-retina (top);
      }
      &.active {
        color: #1976d2;
      }
    }
    .time {
      width: 75px;
      text-align: center;
      p {
        transform: scale(0.7);
        font-size: 10px;
      }
      span {
        font-size: 14px;
      }
    }
    .info {
      flex:1;
      padding: 15px 20px;
      position: relative;
      justify-content: center;
      align-items: center;
      display: flex;
      img, i {
        position: absolute;
        left: -8px;
        z-index: 10;
      }
      img {
        display: inline-block;
        width: 17px;
        height: 17px;
      }
      .van-icon&::before {
        background: #fff;
      }
      &::after {
        @mixin border-retina (left);
      }
    }
  }
</style>
