<template>
  <div class="vip-center">
    <div class="vip-center_levels" :class="currentLevelInnerCode">
      <div class="logo"></div>
      <div class="steps">
        <div v-for="(item, index) in getSteps">
          <div :class="getLevel(item, index)"></div>
          <div v-if="index < 3" class="next" :class="{'active' : item.next}"></div>
        </div>
      </div>
      <div class="upgrade" :class="{'active': canUpgrade}" @click="goUpgrade"></div>
    </div>
    <van-cell-group>
      <van-cell is-link title="我的权益" value="全部权益" @click="goToPage('all-rights')"/>
      <van-cell style="padding: 25px 15px 30px 15px;" v-for="item in rights">
        <div class="rights" :class="item.type"></div>
        <dl>
          <dd>{{rightMap[item.type]}}</dd>
          <dd>{{item.name}}</dd>
        </dl>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { goToPage } from '@/common/helpers';
import { Cell, CellGroup, Toast } from 'vant';
import { upgrade } from './api';

const rightMap = {
  'CREDIT': '积分',
  'EXCHANGE': '兑换',
  'RED_PACKAGE': '红包'
}

export default {
  name: 'vip-center',

  components: {
    'van-cell-group': CellGroup,
    'van-cell': Cell
  },

  props: {
    canUpgrade: Boolean,
    currentLevelInnerCode: String,
    levels: Array,
    rights: Array
  },

  computed: {
    getSteps() {
      let getIndex = 0;
      this.steps.forEach((item, index) => {
        if (item.name === this.currentLevelInnerCode) {
          getIndex = index;
        }
      });
      return this.steps.map((item, index) => {
        if (index < getIndex) {
          item.active = true;
          item.next = true;
        } else if (index === getIndex) {
          item.active = true;
          item.next = this.canUpgrade ? true : false;
        }
        return item;
      });
    }
  },

  data() {
    return {
      rightMap,
      goToPage,
      steps: [
        {
          name: 'V1',
          active: false,
          next: false
        },
        {
          name: 'V2',
          active: false,
          next: false
        },
        {
          name: 'V3',
          active: false,
          next: false
        },
        {
          name: 'V4',
          active: false,
          next: false
        }
      ]
    };
  },

  methods: {
    getLevel(level, index) {
      return level.active ? `level level${index + 1} active` : `level level${index + 1}`;
    },
    goUpgrade() {
      if (this.canUpgrade) {
        upgrade().then(res => {
          if (res.success) {
            goToPage('vip-center');
          }
        });
      } else {
        goToPage('vip-intro');
      }
    }
  }
};
</script>
<style lang="postcss">
  body {
    background-color: #f7f7f7;
  }
  .vip-center {
    &_levels {
      padding: 24px 0 14px 0;
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
      .steps {
        width: 230px;
        margin: 20px auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-flow: row wrap;
        .level, .next {
          display: inline-block;
          vertical-align: middle;
        }
        .level {
          width: 16px;
          height: 16px;
          background-size: contain;
          background-repeat: no-repeat;
          &1{
            background-image: url('./images/l1.png');
            &.active {
              background-image: url('./images/l1_a.png');
            }
          }
          &2{
            background-image: url('./images/l2.png');
            &.active {
              background-image: url('./images/l2_a.png');
            }
          }
          &3{
            background-image: url('./images/l3.png');
            &.active {
              background-image: url('./images/l3_a.png');
            }
          }
          &4{
            background-image: url('./images/l4.png');
            &.active {
              background-image: url('./images/l4_a.png');
            }
          }
        }
        .next {
          width: 30px;
          height: 4px;
          margin: 0 10px;
          opacity: 0.5;
          background: #FFFFFF;
          &.active {
            opacity: 1;
          }
        }
      }
      .upgrade {
        width: 180px;
        height: 36px;
        margin: 0 auto;
        background-size: cover;
        background-repeat: no-repeat;
        background-image: url('./images/upgrade.png');
        &.active {
          background-image: url('./images/upgrade_a.png');
        }
      }
    }
    .van-cell-group {
      position: relative;
      &:before {
        content: '';
        display: block;
        width: 4px;
        height: 20px;
        background: #F23333;
        position: absolute;
        top: 12px;
        left: 0;
        z-index: 10;
      }
    }
    .rights, dl {
      display: inline-block;
      vertical-align: top;
    }
    dl, dd {
      margin: 0;
    }
    dl {
      width: calc(100% - 70px);
    }
    .rights {
      width: 38px;
      height: 40px;
      margin-right: 20px;
      background-size: contain;
      background-repeat: no-repeat;
      &.CREDIT {
        background-image: url('./images/points.png');
      }
      &.EXCHANGE {
        background-image: url('./images/exchange.png');
      }
      &.RED_PACKAGE {
        background-image: url('./images/redbag.png');
      }
    }
  }
</style>
