<template>
  <div class="my-assets-jzb">
    <div class="my-assets-jzb__banner">
      <h5>食间豆红包<span>（可用于返现）</span></h5>
      <p>{{enabledProperty}}<jz-button class="action-button" @click.prevent.stop.native="checkJzb">转入食间豆账户</jz-button></p>
    </div>
    <van-tabs
      :active="active"
      @click="switchTab"
      class="my-assets-jzb__tabs">
      <van-tab title="到账记录"></van-tab>
      <van-tab title="返现记录"></van-tab>
    </van-tabs>
    <ul
      v-show="active === 0"
      class="my-assets-jzb__list"
      v-waterfall-lower="fetchHistory"
      :waterfall-disabled="waterfallDisabled"
      waterfall-offset="50"
    >
      <li v-for="assets in getParseHistory">
        <span>{{assets.createTime}}</span>
        <van-cell-group>
          <van-cell v-for="item in assets.list">
            <dl>
              <dt>{{item.flowRemark}}</dt>
              <dd>{{item.createTime.split(' ')[1]}}</dd>
            </dl>
            <span class="my-assets-jzb__money">{{+item.flowAmount > 0 ? '+' : ''}}{{item.flowAmount}}</span>
          </van-cell>
        </van-cell-group>
      </li>
    </ul>
    <ul
      v-show="active === 1"
      class="my-assets-jzb__list"
      v-waterfall-lower="fetchExHistory"
      :waterfall-disabled="waterfallEXDisabled"
      style="margin-top: 24px;"
      waterfall-offset="50"
    >
      <li class="no_after" v-for="assets in getParseExHistory">
        <van-cell-group>
          <div v-for="item in assets.list" class="border-bottom" style="padding: 14px;">
            <div class="my-assets-jzb__name">已返现</div>
            <div class="my-assets-jzb__flex">
              <div>
                <p>{{item.createTime.split(' ')[0]}}</p>
                <p>{{item.createTime.split(' ')[1]}}</p>
              </div>
              <div>
                <p class="my-assets-jzb__gray">{{item.flowRemark}}</p>
                <p>{{item.flowAmount}}</p>
              </div>
              <div>
                <p class="my-assets-jzb__gray">余额</p>
                <p>{{+item.flowAmount < 0 ? '+' : ''}}{{(item.flowAmount * -1)}}</p>
              </div>
            </div>
          </div>
        </van-cell-group>
      </li>
    </ul>
    <!-- 空列表 -->
    <div class="my-assets-jzb__list-empty" v-if="isEmptyList">
      <span class="my-assets-jzb__list-empty-text">暂无信息</span>
    </div>
    <van-dialog
      v-model="showDialog"
      show-cancel-button
      @confirm="onConfirm"
      @cancel="onCancel"
      confirm-button-text="确认"
      cancel-button-text="取消"
    >
      <!-- <div>可转入的食间豆红包<span></span></div> -->
      <input type="text" v-model="checkNum">
      <p>说明：食间豆红包转入食间豆将只可用于消费，转入成功后不可撤回。</p>
    </van-dialog>
  </div>
</template>

<script>
  import Button from '@/components/button';
  import { Tab, Tabs, Cell, CellGroup, Waterfall, Toast } from 'vant';
  import filter from 'lodash/filter';
  import { goToPage } from '@/common/helpers';
  import { getJzb, getJzbRule, exchangeJZB } from './api';

  function parseHistory(history) {
    let result = [];
    let filterDate = [];
    /*
      [{createTime: '2018-01-20', list: [...]}]
    */
    history.forEach(item => {
      let { createTime } = item;
      let index = filterDate.indexOf(createTime.split(' ')[0]);
      if (index === -1) {
        // 不存在的
        filterDate.push(createTime.split(' ')[0]);
      }
    });
    filterDate.forEach(item => {
      let timeArr = filter(history, data => {
        let { createTime } = data;
        return item === createTime.split(' ')[0];
      });
      result.push({
        createTime: item,
        list: timeArr
      })
    });
    return result;
  }

  export default {
    name: 'assets-jzb',
    directives: {
      WaterfallLower: Waterfall('lower')
    },
    components: {
      'jz-button': Button,
      [Tab.name]: Tab,
      [Tabs.name]: Tabs,
      'van-cell-group': CellGroup,
      'van-cell': Cell
    },
    data() {
      return {
        goToPage,
        active: 0,
        checkNum: '',
        enabledProperty: 0,
        handsPerDay: 0,
        showDialog: false,
        isEmptyList: false,
        exstatus: 'empty',
        exhistory: [],
        expage: 1,
        status: 'empty',
        history: [],
        page: 1
      };
    },

    created() {
      getJzbRule().then(data => {
        const { success, totalProperty, enabledProperty } = data;
        if (success) {
          this.enabledProperty = enabledProperty;
        }
      });
      this.fetchHistory();
    },

    computed: {
      waterfallEXDisabled() {
        return this.exstatus === 'finished' || this.exstatus === 'loading';
      },
      waterfallDisabled() {
        return this.status === 'finished' || this.status === 'loading';
      },
      getParseHistory() {
        return parseHistory(this.history);
      },
      getParseExHistory() {
        return parseHistory(this.exhistory);
      }
    },

    methods: {
      initData() {
        this.exstatus = '';
        this.status = '';
        this.page = 1;
        this.expage = 1;
        this.history = [];
        this.exhistory = [];
      },
      checkJzb() {
        this.showDialog = true;
      },
      onConfirm() {
        exchangeJZB(this.checkNum).then(data => {
          const { success, totalProperty, enabledProperty } = data;
            if (success) {
              Toast('交换成功，正在刷新数据~');
              this.totalProperty = totalProperty;
              this.enabledProperty = enabledProperty;
              this.initData();
              if (!this.active) {
                this.fetchHistory();
              } else {
                this.fetchExHistory();
              }
            }
        });
      },
      onCancel() {
        this.showDialog = false;
      },

      switchTab(index) {
        this.active = index;
        this.initData();
        if (!index) {
          this.fetchHistory();
        } else {
          this.fetchExHistory();
        }
      },

      fetchHistory() {
        console.log('hist => trigger')

        if (this.status === 'loading' || this.status === 'finished' || this.waterfallDisabled) {
          return;
        }
        this.status = 'loading';


        getJzb({
          url: '/api/asset/property/history',
          page: this.page
        }).then(data => {
          const { isLastPage, history, totalCount } = data;
          this.isEmptyList = !totalCount;
          if (!isLastPage) {
            this.status = '';
            this.page++;
          } else {
            this.status = 'finished';
          }
          if (history && history.length) {
            this.history = this.history.concat(history);
          }
        });
      },

      fetchExHistory() {
        console.log('exchange => trigger')

        if (this.exstatus === 'loading' || this.exstatus === 'finished' || this.waterfallEXDisabled) {
          return;
        }
        this.exstatus = 'loading';

        getJzb({
          url: '/api/asset/property/refund_cash/history',
          page: this.expage
        }).then(data => {
          const { isLastPage, history, totalCount } = data;
          this.isEmptyList = !totalCount;
          if (!isLastPage) {
            this.exstatus = '';
            this.expage++;
          } else {
            this.exstatus = 'finished';
          }
          if (history && history.length) {
            this.exhistory = this.exhistory.concat(history);
          }
        });
      }
    }

  };
</script>

<style lang="postcss">
@import 'mixins';
body {
  background-color: #f7f7f7;
}
.my-assets-jzb {
  &__banner {
    box-sizing: border-box;
    height: 100px;
    padding: 16px 24px 12px 24px;
    background-image: url('./images/blue.png');
    background-size: cover;
    background-repeat: no-repeat;
    font-size: 14px;
    color: #FFFFFF;
    text-align: left;
    h5 {
      margin-bottom: 6px;
      line-height: 24px;
      font-size: 17px;
      span {
        font-size: 14px;
        line-height: 20px;
      }
    }
    p {
      font-size: 30px;
      line-height: 42px;
    }
    .action-button {
      width: 112px;
      padding: 7px;
      font-size: 14px;
      line-height: 20px;
      border: 0;
      border-radius: 5px;
      color: #448EF1;
      float: right;
      box-sizing: border-box;
      height: auto;
    }
  }
  &__tabs {
    .van-tab--active {
      color: #448EF1;
    }
    .van-tabs__nav-bar {
      width: 50px !important;
      height: 2px;
      left: 25%;
      margin-left: -25px;
      background: #448EF1;
    }
  }
  &__list {
    max-height: calc(100vh - 145px);
    overflow: scroll;
    li {
      > span {
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        padding: 1px 12px;
      }
    }
    .no_after {
      content: none;
    }
    .border-bottom {
      position: relative;
      &::after {
        @mixin border-retina (bottom);
      }
    }
    .van-cell {
      padding: 10px 12px 7px 12px;
      &:not(:last-child)::after {
        left: 0;
      }
    }
    .van-cell__value {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    dl, dd {
      margin: 0;
    }
    dt {
      line-height: 24px;
      font-size: 17px;
      color: #333333;
      span {
        padding-left: 13px;
        font-size: 12px;
        line-height: 17px;
      }
    }
    dd {
      line-height: 20px;
      color: #999999;
      font-size: 14px;
    }

  }
  &__flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 14px;
      color: #333333;
      line-height: 24px;
    }
  }
  &__gray {
    color: #999999 !important;
  }
  &__name {
    font-size: 14px;
    color: #999999;
    line-height: 20px;
  }
  &__state {
    color: #41AB84;
    &.active {
      color: #666666;
    }
  }
  &__money {
    font-size: 17px;
  }
  &__list-empty {
    position: relative;
    text-align: center;
    line-height: 156px;
    &::before {
      content: '';
      position: absolute;
      left: 30px;
      right: 30px;
      top: 156px;
      height: 1px;
      background: #CCC;
    }
  }
  &__list-empty-text {
    position: relative;
    z-index: 1;
    background: #f8f8f8;
    padding: 0 10px;
    color: #999;
  }
  .van-dialog__content {
    padding: 20px 30px;
    text-align: center;
    > div {
      font-size: 17px;
      color: #333333;
      line-height: 24px;
      span {
        color: #00A3EE;
      }
    }
    input {
      margin-top: 20px;
      border: 1px solid #D8D8D8;
      border-radius: 5px;
      padding: 8px 12px;
      font-size: 14px;
      color: #999999;
    }
    p {
      font-size: 12px;
      color: #FF0000;
      line-height: 17px;
      margin-top: 8px;
    }
  }
  .van-dialog__confirm, .van-dialog__confirm:active {
    color: #00A3EE;
  }
}
</style>
