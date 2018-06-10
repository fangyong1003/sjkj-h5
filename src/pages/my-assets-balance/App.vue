<template>
  <div class="my-assets-balance">
    <div class="my-assets-balance__banner">
      <h5>余额<span>（可用于提现）</span></h5>
      <p>{{enabledProperty}}<jz-button class="action-button" @click.prevent.stop.native="goToPage('my-assets-withdraw')">提现</jz-button></p>
    </div>
    <div class="my-assets-balance__detail van-hairline--bottom">收支明细</div>
    <ul
      class="my-assets-balance__list"
      v-waterfall-lower="fetchBalance"
      :waterfall-disabled="waterfallDisabled"
    >
      <li v-for="assets in getParseHistory">
        <span>{{assets.createTime}}</span>
        <van-cell-group>
          <van-cell v-for="item in assets.list">
            <dl>
              <dt>{{item.flowRemark}}</dt>
              <dd>{{item.createTime.split(' ')[1]}}</dd>
            </dl>
            <span :class="['my-assets-balance__money', { 'active': item.flowAmount }]">{{ +item.flowAmount > 0 ? '+' : '' }} {{ item.flowAmount }}</span>
          </van-cell>
        </van-cell-group>
      </li>
    </ul>
    <!-- 空列表 -->
    <div class="my-assets-balance__list-empty" v-if="isEmptyList">
      <span class="my-assets-balance__list-empty-text">暂无信息</span>
    </div>
  </div>
</template>

<script>
  import Button from '@/components/button';
  import { Cell, CellGroup, Waterfall } from 'vant';
  import { getAssets, getBalance  } from './api';
  import filter from 'lodash/filter';
  import { goToPage } from '@/common/helpers';

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
    name: 'assets-balance',
    directives: {
      WaterfallLower: Waterfall('lower')
    },
    components: {
      'jz-button': Button,
      'van-cell-group': CellGroup,
      'van-cell': Cell
    },

    data() {
      return {
        goToPage,
        enabledProperty: '',
        status: 'empty',
        history: [],
        isEmptyList: false,
        page: 1
      };
    },

    created() {
      getAssets().then(data => {
        const { success, enabledBalance } = data;
        if (success) {
          this.enabledProperty = enabledBalance;
        }
      });
      this.fetchBalance();
    },

    computed: {
      waterfallDisabled() {
        return this.status === 'finished' || this.status === 'loading';
      },
      getParseHistory() {
        return parseHistory(this.history);
      }
    },

    methods: {
      fetchBalance() {
        console.log('trigger');
        if (this.status === 'loading' || this.status === 'finished' || this.waterfallDisabled) {
          return;
        }

        this.status = 'loading';
        getBalance({
          page: this.page
        }).then(data => {
          const { isLastPage, history, totalCount } = data;
          !totalCount ? this.isEmptyList = true : this.isEmptyList = false;
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
      }
    }

  };
</script>

<style lang="postcss">
body {
  background-color: #f7f7f7;
}
.my-assets-balance {

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
  &__detail {
    line-height: 24px;
    padding: 12px;
    position: relative;
    background-color: #fff;
    &:before {
      content: '';
      display: block;
      width: 4px;
      height: 20px;
      background: #0088EE;
      position: absolute;
      top: 14px;
      left: 0;
    }
  }
  &__list {
    li {
      > span {
        font-size: 14px;
        color: #333333;
        line-height: 20px;
        padding: 1px 12px;
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
}
</style>
