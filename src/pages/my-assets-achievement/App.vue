<template>
  <div class="my-assets-achievement">
    <div class="vip-center_levels" :class="currentLevelInnerCode">
    <dl class="photoBox" >
      <img v-if="user.user_image" :src="user.user_image" alt=""/>
      <img v-else src="./images/default.png" alt=""/>
    </dl>
    <dl class="nickBox">
      <dd>
        <div class="user-center__nick">{{user.nick_name}}</div>
        <div class="user-center__vips" >{{user.membershipName}}</div>
      </dd>
    </dl>
      <dl class="logo"></dl>
    </div>
    <div class="sum" v-if="!performance && currentLevelInnerCode !== 'V1'" style="margin-bottom: 12px;">
      <h5>累计业绩</h5>
      <span>（{{initStart }} 至 今日）</span>
      <p style="color:#C4D52F">{{ achievement }}</p>
    </div>
    <div class="search" v-if="currentLevelInnerCode !== 'V1'">
      <h5>查询团队业绩</h5>
      <jz-button class="action-button-time" @click.prevent.stop.native="selectStart" >{{startTime}}</jz-button>
      <jz-button class="action-button-time" @click.prevent.stop.native="selectEnd" >{{endTime}}</jz-button>
      <div class="result" v-if="performance">查询结果</div>
      <p v-if="performance">{{performance}}</p>
      <jz-button v-if="performance" class="action-button-done" @click.prevent.stop.native="goDefault" >重置</jz-button>
      <jz-button v-else class="action-button-done" @click.prevent.stop.native="goSubmit" >查询</jz-button>
    </div>
    <div v-else style="font-size: 17px;color: #666666;text-align: center;padding-top: 125px;">您当前级别没有团队业绩</div>
    <van-popup v-model="show" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="confirmTime"
      />
    </van-popup>
  </div>
</template>
<script>
  import { getAchievement } from './api';
  import Button from '@/components/button';
  import { Toast, Popup, DatetimePicker } from 'vant';
  import { goToPage } from '@/common/helpers';
  import YZLocalStorage from '@/common/utils/local_storage';

  export default {
    name: 'my-assets-achievement',

    components: {
      'jz-button': Button,
      'van-popup': Popup,
      'van-datetime-picker': DatetimePicker
    },

    props: {
      currentLevelInnerCode: String
    },

    computed: {
    },

    data() {
      return {
        initStart: '2018-1-1',
        isStartTime: true,
        show: false,
        achievement: '',
        performance: '',
        startTime: '设置开始时间',
        endTime: '设置结束时间',
        minDate: new Date(1992, 12, 12),
        maxDate: new Date(2100, 12, 12),
        currentDate: new Date(),
        user: {},
      };
    },

    methods: {
      selectStart() {
        this.isStartTime = true;
        this.show = true;
      },

      selectEnd() {
        this.isStartTime = false;
        this.show = true;
      },

      goDefault() {
        this.startTime = '设置开始时间';
        this.endTime = '设置结束时间';
        this.performance = '';
      },

      goSubmit() {
        if (this.startTime === '设置开始时间') {
          Toast('请选择开始时间');
          return;
        }
        if (this.endTime === '设置结束时间') {
          Toast('请选择结束时间');
          return;
        }
        this.fetchAchievement(this.startTime, this.endTime).then((resp) => {
          const { success, performance } = resp;
          if (success) {
            this.performance = performance;
          }
        });
      },
      fetchAchievement(startTime, endTime) {
        return getAchievement({
          startTime,
          endTime
        })
      },

      confirmTime(time) {
        const timeDate = new Date(time);
        const timeStr = `${timeDate.getFullYear()}-${timeDate.getMonth() + 1}-${timeDate.getDate()}`;
        if (this.isStartTime) {
          this.startTime = timeStr;
        } else {
          this.endTime = timeStr;
        }
        this.show = false;
      }
    },

    created() {
      this.fetchAchievement(this.initStart, `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`).then((resp) => {
        const { success, performance } = resp;
        if (success) {
          this.achievement = performance;
        }
      });
        this.user = JSON.parse(YZLocalStorage.getItem('user'));
    }
  };
</script>
<style lang="postcss">
  body {
    background-color: #f7f7f7;
  }
  .vip-center {
    &_levels {
      padding: 35px 0;
      background-image: linear-gradient(-135deg, #342C2A 0%, #504E4D 100%);
      dl{
       display:inline-block;
       color:#fff;
       dd{
        margin-left:10px;
       }
      }
      .nickBox{
       margin:0px;
      }
      .photoBox{
        margin-left:15px;
        img{
         width:44px;
         border-radius:100px;
        }
      }
      .user-center__vips{
        font-size:12px;
        border:1px solid #e5e5e5;
        width:28px;
        padding:5px 10px;
        border-radius:3px;
      }
      .user-center__nick{
       line-height:30px;
      }
      .logo {
        width: 40px;
        height: 75px;
        margin: 0 auto;
        background-size: contain;
        background-repeat: no-repeat;
        float:right;
        margin:20px;
        margin-top:0px;
      }
      &.V1 {
        .logo {
          background-image: url('./images/level1.png');
        }
      }
      &.V2 {
        .logo {
          background-image: url('./images/level2.png');
        }
      }
      &.V3 {
        .logo {
          background-image: url('./images/level3.png');
        }
      }
      &.V4 {
        .logo {
          background-image: url('./images/level4.png');
        }
      }
    }
  }
  .my-assets-achievement {
    .sum {
      text-align: center;
      background-color: #fff;
      padding: 21px 0;
      color: #333333;
      h5 {
        font-size: 17px;
        line-height: 24px;
        margin-bottom: 4px;
      }
      p {
        font-size: 36px;
        line-height: 42px;
      }
      span {
        font-size: 14px;
        line-height: 20px;
      }
    }
    .search {
      padding: 20px 0 30px 0;
      background-color: #fff;
      color: #333333;
      text-align: center;
      h5 {
        font-size: 17px;
        line-height: 24px;
        margin-bottom: 20px;
      }
      .result {
        text-align: center;
        font-size: 17px;
        color: #333333;
        line-height: 24px;
        margin-bottom: 10px;
      }
      p {
        text-align: center;
        font-size: 24px;
        color: #EE4F4F;
        line-height: 33px;
        margin-bottom: 18px;
      }
    }
  }
  .action-button-time, .action-button-done {
    display: block;
    width: 270px;
    height: 40px;
    line-height: 40px;
    font-size: 17px;
    border-radius: 100px;
  }
  .action-button-time {
    color: #333333;
    margin: 0 auto 24px auto;
  }
  .action-button-done {
    color: #fff;
    margin: 0 auto;
    background: #342C2A;
  }
</style>
