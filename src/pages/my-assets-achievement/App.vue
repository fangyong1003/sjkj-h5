<template>
  <div class="my-assets-achievement">
    <div class="vip-center_levels" :class="currentLevelInnerCode">
      <div class="logo"></div>
    </div>
    <div class="sum" v-if="!performance && currentLevelInnerCode !== 'V1'" style="margin-bottom: 12px;">
      <p>{{ achievement }}</p>
      <h5>累计业绩</h5>
      <span>（{{initStart }} 至 今日）</span>
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
        currentDate: new Date()
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
    }
  };
</script>
<style lang="postcss">
  body {
    background-color: #f7f7f7;
  }
  .vip-center {
    &_levels {
      padding: 24px 0;
      background-size: 375px 250px;
      background-position: center -43px;
      background-repeat: no-repeat;
      .logo {
        width: 120px;
        height: 74px;
        margin: 0 auto;
        background-size: contain;
        background-repeat: no-repeat;
      }
      &.V1 {
        background-image: url('./images/v1.png');
        .logo {
          background-image: url('./images/level1.png');
        }
      }
      &.V2 {
        background-image: url('./images/v2.png');
        .logo {
          background-image: url('./images/level2.png');
        }
      }
      &.V3 {
        background-image: url('./images/v3.png');
        .logo {
          background-image: url('./images/level3.png');
        }
      }
      &.V4 {
        background-image: url('./images/v4.png');
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
    background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
  }
</style>
