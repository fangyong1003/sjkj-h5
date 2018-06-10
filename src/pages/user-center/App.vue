<template>
  <div class="user-center">
    <div class="user-center__header">
      <div class="user-center__flex">
        <span class="user-center__msg" @click="goToPage('message-center')"></span>
        <span class="user-center__setting" @click="goToSetting"></span>
      </div>
      <img v-if="user.user_image" :src="user.user_image" alt=""/>
      <img v-else src="./images/default.png" alt=""/>
      <dl>
        <dt v-if="!isLogin" @click="onLoginClicked"><span>登录</span> / <span>注册</span></dt>
        <dd v-else>
          <div class="user-center__nick">{{user.nick_name}}</div>
          <div class="user-center__vip" :class="levelStr">{{user.membershipName}}</div>
        </dd>
      </dl>
    </div>
    <van-cell-group>
      <van-cell title="我的订单" is-link value="查看全部" @click="goToList('order-list')" />
      <van-cell class="user-center__order-tabwrap">
        <div class="user-center__order-tab">
          <div class="user-center__order-unpay" @click="goToList('topay')">
            <span v-if="unpay">{{unpay}}</span>
            待付款
          </div>
          <div class="user-center__order-unpost" @click="goToList('tosend')">
            <span v-if="unpost">{{unpost}}</span>
            待发货
          </div>
          <div class="user-center__order-unreceived" @click="goToList('toaccept')">
            <span v-if="unreceived">{{unreceived}}</span>
            待收货
          </div>
          <div class="user-center__order-done" @click="goToList('complete')">
            <span v-if="done">{{done}}</span>
            交易成功
          </div>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group class="user-center-link" style="margin-top: 12px;">
      <van-cell title="我的资产" is-link @click="goToPage('my-assets')">
        <span slot="icon" class="user-center__icon assets"></span>
      </van-cell>
      <van-cell title="我的银行卡" is-link @click="goToPage('my-assets-bank-list')">
        <span slot="icon" class="user-center__icon bank"></span>
      </van-cell>
      <van-cell title="会员中心" is-link :value="user.membershipName" @click="goToPage('vip-center')">
        <span slot="icon" class="user-center__icon member"></span>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="user-center-link" style="margin-top: 12px;">
      <van-cell title="我的收藏" is-link @click="goToPage('my-collect')">
        <span slot="icon" class="user-center__icon collect"></span>
      </van-cell>
      <van-cell title="帮助中心" is-link @click="goToPage('help-center')">
        <span slot="icon" class="user-center__icon help"></span>
      </van-cell>
    </van-cell-group>

    <nav-bar active="usercenter"></nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/nav-bar';
import { goToPage } from '@/common/helpers';
import { Cell, CellGroup, Toast } from 'vant';
import cookie from '@/common/utils/cookie';
import YZLocalStorage from '@/common/utils/local_storage';
// import { myOrderList } from './api';
// import size from 'lodash/size';

export default {
  name: 'user-center',

  components: {
    NavBar,
    'van-cell': Cell,
    'van-cell-group': CellGroup
  },

  computed: {
    levelStr() {
      return `vip-level ${this.user.membership}`;
    }
  },

  data() {
    return {
      goToPage,
      isLogin: false,
      user: {},
      unpay: '',
      unpost: '',
      unreceived: '',
      done: ''
    };
  },

  methods: {
    onLoginClicked() {
      goToPage('login', {
        redirectUrl: window.location.href
      });
    },
    goToList(type) {
      location.href = `/pages/order-list.html#${type}`;
    },
    fetchOrderList() {
      // 这期不做了
      // myOrderList().then((resp) => {
      //   console.log('resp', resp)
      //   const { orderItems } = resp;
      //   let unpay = [];
      //   let unpost = [];
      //   let unreceived = [];
      //   let done = [];
      //   if (orderItems.length) {
      //     orderItems.forEach(item => {
      //       if (item.orderStatus === 'WAITING_PAY') {
      //         unpay.push(item);
      //       } else if (item.orderStatus === 'WAITING_SHIPPING') {
      //         unpost.push(item);
      //       } else if (item.orderStatus === 'WAIT_RECEIVING') {
      //         unreceived.push(item);
      //       } else if (item.orderStatus === 'ORDER_COMPLETION') {
      //         done.push(item);
      //       }
      //     });
      //     this.unpay = unpay.length ? unpay.length : '';
      //     this.unpost = unpost.length ? unpost.length : '';
      //     this.unreceived = unreceived.length ? unreceived.length : '';
      //     this.done = done.length ? done.length : '';
      //   }
      // });
    },
    goToSetting() {
      if (this.isLogin) {
        goToPage('setting');
      } else {
        Toast('请先登录');
      }
    }
  },

  created() {
    console.log('cookie', cookie('user'))
    if (!cookie('token')) {
      this.isLogin = false;
    } else {
      // 登陆后才能发起订单详情的数据
      this.isLogin = true;
      this.user = JSON.parse(YZLocalStorage.getItem('user'));
      console.log('this.user', this.user)
      this.fetchOrderList();
    }
  }
};
</script>

<style lang="postcss">
  body {
    background-color: #f7f7f7;
  }
  .user-center {
    .van-cell__value {
      overflow: initial;
    }
    &__header {
      padding: 20px 15px 25px 15px;
      background-image: linear-gradient(0deg, #AAA9C9 0%, #6B6A8A 100%);
      img, dl {
        display: inline-block;
        font-size: 0;
        vertical-align: middle;
      }
      img {
        width: 64px;
        height: 64px;
        background: #D8D8D8;
        border: 1px solid #FFFFFF;
        border-radius: 100px;
        margin-right: 22px;
      }
      dl {
        font-size: 16px;
        color: #FFFFFF;
        letter-spacing: 0.8px;
      }
      dd {
        margin-left: 0;
      }
    }
    &__nick {
      font-size: 17px;
      line-height: 24px;
      margin-bottom: 8px;
    }
    &__vip {
      width: 60px;
      height: 24px;
      line-height: 24px;
      padding: 0 12px 0 30px;
      background: #FFFFFF;
      border-radius: 39px;
      font-size: 14px;
      color: #9796B6;
      &.vip-level{
        background-repeat: no-repeat;
        background-size: 16px 16px;
        background-position: 6px center;
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
    }
    &__order-tabwrap {
      padding: 13px 15px;
    }
    &__order-tab {
      display: flex;
      justify-content: space-around;
      align-items: center;
      > div {
        width : 56px;
        padding-top: 38px;
        position: relative;
        text-align: center;
        font-size: 14px;
        color: #666666;
        line-height: 20px;
        background-repeat: no-repeat;
        background-position: center 0;
        span {
          position: absolute;
          display: inline-block;
          border-radius: 50%;
          color: #fff;
          padding: 2px;
          font-size: 12px;
          line-height: 14px;
          min-width: 14px;
          height: 14px;
          top: -8px;
          right: 0;
          background-color: #f44;
        }
      }
    }
    &__order-unpay {
      background-size: 30px 26px;
      background-image: url('./images/unpay.png');
    }
    &__order-unpost {
      background-size: 30px 26px;
      background-image: url('./images/unpost.png');
    }
    &__order-unreceived {
      background-size: 30px 27px;
      background-image: url('./images/unreceived.png');
    }
    &__order-done {
      background-size: 24px 28px;
      background-image: url('./images/done.png');
    }
    &__icon {
      display: inline-block;
      width: 22px;
      height: 22px;
      vertical-align: middle;
      margin-right: 12px;
      background-repeat: no-repeat;
      background-position: center;
      background-size: 22px;
      &.assets {
        background-image: url('./images/assets.png');
      }
      &.bank {
        background-image: url('./images/bank.png');
      }
      &.member {
        background-image: url('./images/member.png');
      }
      &.collect {
        background-image: url('./images/collect.png');
      }
      &.help {
        background-image: url('./images/help.png');
      }
    }
    &__flex {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0;
      margin-bottom: 15px;
    }
    &__msg, &__setting {
      display: inline-block;
      background-size: cover;
      background-repeat: no-repeat;
    }
    &__msg {
      width: 24px;
      height: 24px;
      background-image: url('./images/msg.png');
    }
    &__setting {
      width: 22px;
      height: 22px;
      background-image: url('./images/setting.png');
    }
    &-link {
      .van-cell {
        padding: 17px 15px;
      }
    }
  }
</style>
