<template>
  <div class="my-assets-members">
    <p>团队总成员（{{memberTotalCount}}人）</p>
    <div class="level">{{level === 1 ? '一' : (level === 2 ? '二' : '三')}}级团队成员（{{count}}人）</div>
    <van-cell-group
      class="my-assets-members__list"
      v-waterfall-lower="fetchMember"
      :waterfall-disabled="waterfallDisabled"
      waterfall-offset="50"
    >
      <van-cell v-for="member in members">
        <img v-if="member.userImage" :src="member.userImage" alt=""/>
        <img v-else src="./images/default.png" alt=""/>
        <span>{{member.nickName}}</span>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
  import IndexList from '@/components/index-list';
  import IndexSection from '@/components/index-section';
  import { Cell, CellGroup, Waterfall } from 'vant';
  import { getMembers } from './api';

  export default {
    name: 'my-assets-members',

    components: {
      'van-cell-group': CellGroup,
      'van-cell': Cell
    },

    directives: {
      WaterfallLower: Waterfall('lower')
    },

    props: {

    },

    computed: {
      waterfallDisabled() {
        return this.status === 'finished' || this.status === 'loading';
      }
    },

    data() {
      return {
        count: 0,
        memberTotalCount: 0,
        status: 'empty',
        page: 1,
        level: 1,
        members: []
      };
    },

    methods: {
      fetchMember() {
        console.log('trigger');
        if (this.status === 'loading' || this.status === 'finished' || this.waterfallDisabled) {
          return;
        }

        this.status = 'loading';
        getMembers({
          page: this.page
        }).then(data => {
          const { success, memberTotalCount, level, members, isLastPage, totalCount } = data;
          const count = `level${level}Count`;
          this.count = data[count];
          this.memberTotalCount = memberTotalCount;
          this.level = level;

          if (!isLastPage) {
            this.status = '';
            this.page++;
          } else {
            this.status = 'finished';
          }
          if (members && members.length) {
            this.members = this.members.concat(members);
          }
        });
      }
    },

    created() {
      this.fetchMember();
    }
  };
</script>
<style lang="postcss">
  @import 'mixins';

  body, .van-cell-group, .van-cell {
    background-color: #f7f7f7;
  }
  .my-assets-members {
    &__list {
      max-height: calc(100vh - 99px);
      overflow: scroll;
    }
    > p {
      padding: 16px 0;
      text-align: center;
      font-family: PingFangSC-Regular;
      font-size: 17px;
      color: #333333;
      position: relative;
      &::after {
        @mixin border-retina (bottom);
      }
    }
    .level {
      padding: 12px;
      font-size: 17px;
      color: #333333;
      line-height: 24px;
    }
    .van-cell {
      font-size: 17px;
      color: #333333;
      line-height: 24px;
      img, span {
        vertical-align: middle;
      }
      img {
        border-radius: 50%;
        width: 30px;
        height: 30px;
        margin-right: 30px;
      }
    }
  }
</style>
