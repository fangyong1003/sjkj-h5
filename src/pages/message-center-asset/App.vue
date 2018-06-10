<template>
  <div class="message-center-asset">
    <van-cell-group
      class="message-center-asset__list"
      v-waterfall-lower="fetchNotice"
      :waterfall-disabled="waterfallDisabled"
      waterfall-offset="50"
    >
        <van-cell v-for="notice in noticeList" @click="gotoDetail(notice)">
        <h5>{{notice.noticeTitle}}<span v-if="notice.viewFlag === '-1'" class="noRead"></span></h5>
        <span>{{notice.noticeTime.split(' ')[0]}}</span>
        </van-cell>
    </van-cell-group>
    <!-- 空列表 -->
    <div class="message-center-asset__list-empty" v-if="isEmptyList">
      <span class="message-center-asset__list-empty-text">暂无信息</span>
    </div>
  </div>
</template>
<script>
  import { Cell, CellGroup, Waterfall } from 'vant';
  import { goToPage } from '@/common/helpers';
  import { getNotice, hasRead  } from './api';

  export default {
    name: 'message-center-asset',
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
            this.noticeList = this.noticeList.concat(noticeList);
          }
        });
      },
      gotoDetail(data) {
        const { viewFlag, noticeId, noticeSecondType } = data;
        if (viewFlag === '-1') {
          hasRead({ noticeId }).then(data => {
            console.log('成功')
          }).catch(e => {
            console.log('报错==》', e)
          });
        };
        goToPage('message-center-asset-detail', {
          noticeSecondType,
          noticeId
        });
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
  .message-center-asset {
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
  .message-center-asset__list {
    max-height: calc(100vh - 24px);
    overflow: scroll;
    h5 {
      line-height: 24px;
      font-size: 17px;
      color: #333333;
      margin-bottom: 8px;
    }
    span {
      line-height: 20px;
      font-size: 14px;
      color: #666666;
    }
    .noRead {
      display: inline-block;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: #FF0000;
      vertical-align: middle;
      margin-left: 12px;
    }
  }
</style>
