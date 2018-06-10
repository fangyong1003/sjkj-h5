<template>
  <div class="message-center-system">
    <van-cell-group
      class="message-center-system__list"
      v-waterfall-lower="fetchNotice"
      :waterfall-disabled="waterfallDisabled"
      waterfall-offset="50"
    >
        <van-cell v-for="notice in noticeList">
          <h5>{{notice.noticeTitle}}</h5>
          <div class="html-content" v-html="notice.noticeContent"></div>
          <span>{{notice.noticeTime.split(' ')[0]}}</span>
        </van-cell>
    </van-cell-group>
    <!-- 空列表 -->
    <div class="message-center-system__list-empty" v-if="isEmptyList">
      <span class="message-center-system__list-empty-text">暂无信息</span>
    </div>
  </div>
</template>
<script>
  import { Cell, CellGroup, Waterfall } from 'vant';
  import { goToPage } from '@/common/helpers';
  import { getNotice, hasRead  } from './api';

  export default {
    name: 'message-center-system',
    directives: {
      WaterfallLower: Waterfall('lower')
    },
    components: {
      'van-cell-group': CellGroup,
      'van-cell': Cell
    },

    data() {
      return {
        goToPage,
        status: 'empty',
        noticeList: [],
        isEmptyList: false,
        page: 1
      };
    },

    created() {
      this.fetchNotice();
    },

    computed: {
      waterfallDisabled() {
        return this.status === 'finished' || this.status === 'loading';
      }
    },

    methods: {
      fetchNotice() {
        console.log('trigger');
        if (this.status === 'loading' || this.status === 'finished' || this.waterfallDisabled) {
          return;
        }

        this.status = 'loading';
        getNotice({
          page: this.page
        }).then(data => {
          const { isLastPage, noticeList, totalCount } = data.result;
          console.log('noticeList', noticeList)
          !totalCount ? this.isEmptyList = true : this.isEmptyList = false;
          if (!isLastPage) {
            this.status = '';
            this.page++;
          } else {
            this.status = 'finished';
          }
          if (noticeList && noticeList.length) {
            this.readNotice(noticeList)
            this.noticeList = this.noticeList.concat(noticeList);
          }
        });
      },
      readNotice(list) {
        let hasReadArr = [];
        list.forEach(item => {
          if (item.viewFlag === '-1') {
            hasReadArr.push(item.noticeId);
          };
        });
        if (hasReadArr.length) {
          hasRead(hasReadArr);
        }
      }
    }

  };
</script>
<style lang="postcss">
  body {
    background-color: #f7f7f7;
  }
  .van-cell-group {
      background-color: transparent;
  }
  .van-cell {
    border-radius: 10px;
    margin-bottom: 10px;
  }
  .message-center-system {
    padding: 12px;
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
  .message-center-system__list {
    max-height: calc(100vh - 99px);
    overflow: scroll;
    h5 {
      line-height: 24px;
      font-size: 17px;
      color: #333333;
      margin-bottom: 8px;
    }
    .html-content {
      font-size: 14px;
      color: #666666;
      line-height: 25px;
      margin-bottom: 8px;
    }
    span {
      line-height: 20px;
      font-size: 14px;
      color: #666666;
    }
  }
</style>
