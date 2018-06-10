<template>
  <div class="message-center-activity">
    <van-cell-group
      class="message-center-activity__list"
      v-waterfall-lower="fetchNotice"
      :waterfall-disabled="waterfallDisabled"
      waterfall-offset="50"
    >
        <van-cell v-for="notice in noticeList"  @click="gotoDetail(notice)">
          <img :src="notice.exhibitionContent.bannerUrl" alt=""/>
          <div class="exhibitionContent">{{notice.exhibitionContent.exhibitionDesc}}<span>{{notice.exhibitionContent.beginDate.split(' ')[0]}}~{{notice.exhibitionContent.endDate.split(' ')[0]}}</span></div>
        </van-cell>
    </van-cell-group>
    <!-- 空列表 -->
    <div class="message-center-activity__list-empty" v-if="isEmptyList">
      <span class="message-center-activity__list-empty-text">暂无信息</span>
    </div>
  </div>
</template>
<script>
  import { Cell, CellGroup, Waterfall } from 'vant';
  import { goToPage } from '@/common/helpers';
  import { getActivity, hasRead } from './api';

  export default {
    name: 'message-center-activity',
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
        getActivity({
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
        const { viewFlag, noticeId, exhibitionContent } = data;
        if (viewFlag === '-1') {
          hasRead({ noticeId });
        };
        goToPage('group', {
          type: 'exhibitionId',
          id: exhibitionContent.exhibitionId
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
    overflow: hidden;
  }
  .message-center-activity {
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
  .message-center-activity__list {
    max-height: calc(100vh - 145px);
    overflow: scroll;
    img {
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 150px;
    }
    .exhibitionContent {
      font-size: 14px;
      color: #333333;
      line-height: 20px;
      margin-top: 150px;
      span {
        line-height: 17px;
        font-size: 12px;
        color: #999999;
        float: right;
      }
    }
  }
  .van-hairline--top-bottom::after {
    border: 0;
  }
</style>
