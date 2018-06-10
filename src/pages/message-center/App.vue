<template>
  <div class="message-center">
    <van-cell-group>
      <van-cell isLink @click="goToPage('message-center-system')">
        <img src="./images/system.png" alt=""/>
        <span v-if="system">{{system}}</span>
        <div>系统消息</div>
      </van-cell>
      <van-cell isLink @click="goToPage('message-center-activity')">
        <img src="./images/activity.png" alt=""/>
        <span v-if="activity">{{activity}}</span>
        <div>活动推送</div>
      </van-cell>
      <van-cell isLink @click="goToPage('message-center-asset')">
        <img src="./images/asset.png" alt=""/>
        <span v-if="asset">{{asset}}</span>
        <div>资产到账提醒</div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant';
import { goToPage } from '@/common/helpers';

export default {
  name: 'message-center',

  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup
  },

  props: {
    system: Number,
    activity: Number,
    asset: Number
  },

  data() {
    return {
      goToPage
    };
  }
}
</script>
<style lang="postcss">
  body {
    background-color: #f7f7f7;
  }
  .message-center {
    img {
      width: 48px;
      heigth: 48px;
    }
    .van-cell__value {
      position: relative;
      > img, div {
        display: inline-block;
        vertical-align: middle;
      }
      > div {
        margin-left: 15px;
      }
      span {
        position: absolute;
        top: 2px;
        left: 37px;
        color: #fff;
        font-size: 10px;
        font-weight: normal;
        transform: scale(0.8);
        text-align: center;
        box-sizing: border-box;
        padding: 0 10px;
        min-width: 18px;
        line-height: 18px;
        border-radius: 9px;
        background-color: #f44
      }
    }
  }
</style>
