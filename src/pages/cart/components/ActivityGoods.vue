<template>
  <div class="activity-goods" v-if="activityInfo.goodsList.length > 0">
    <div class="info">
      <div class="text-wrap">
        <div class="activity-tag" v-for="tag in activityInfo.activity_tags">{{tag}}</div>
        {{activityInfo.activity_desc}}
      </div>
      <div class="activity-tips">
        <span
          v-if="activityInfo.is_meet && activityInfo.activity_type === 'packageBuy'"
          class="tip-content">
          已满足
        </span>
        <span
          v-if="activityInfo.is_meet && activityInfo.activity_type === 'meetReduce'"
          class="tip-content">
          <a :href="activityInfo.activity_url" class="arrow-right">
            <span class="item-text">去逛逛</span><i class="icon-arrow"></i>
          </a>
        </span>
        <span v-if="!activityInfo.is_meet" class="tip-content">
          <a :href="activityInfo.activity_url" class="arrow-right">
            <span class="item-text">去凑单</span><i class="icon-arrow"></i>
          </a>
        </span>
      </div>
    </div>
    <goods
      v-for="(goods, index) in activityInfo.goodsList"
      :isInvalid="false"
      :isActivity="true"
      :goods="goods"
      :key="index"
      :shopId="shopId"
    ></goods>
  </div>
</template>

<script>
  import Goods from './Goods';

  export default {
    props: {
      activityInfo: Object,
      shopId: Number
    },

    components: {
      goods: Goods
    }
  };
</script>

<style>
  @import "../common.pcss";
  @import "mixins";

  .activity-goods {
    padding-bottom: 10px;
    margin-bottom: 10px;
    position: relative;

    &::after {
      @mixin border-retina (bottom);
    }

    .info {
      height: 42px;
      box-sizing: border-box;
      padding: 10px;
      font-size: 12px;
      line-height: 22px;
    }

    .activity-tag {
      display: inline-block;
      color: #f00;
      border: 1px solid #f00;
      padding: 0 5px;
      height: 16px;
      line-height: 16px;
      border-radius: 3px;
      margin-right: 5px;
      vertical-align: top;
      margin-top: 2px;
    }

    .text-wrap {
      float: left;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      word-break: keep-all;
      display: inline-block;
    }

    .activity-tips {
      display: inline-block;
      float: right;

      a {
        color: #333;
      }
    }

    .tip-content {
      height: 22px;
      display: inline-block;

      a {
        height: 22px;
        display: inline-block;
      }
    }

    .item-text {
      display: inline-block;
      height: 22px;
      vertical-align: top;
    }

    .icon-arrow {
      width: 6px;
      height: 22px;
      display: inline-block;
      background-size: 6px 10px;
      background-position: center center;
      margin-left: 5px;
      background-repeat: no-repeat;
    }
  }

  .no-gap {
    margin-bottom: 0;

    &::after {
      display: none;
    }
  }

  @media screen and (max-width: 320px) {

    .text-wrap {
      width: 250px;
    }
  }

  @media screen and (min-width: 321px) and (max-width: 375px) {

    .text-wrap {
      width: 290px;
    }
  }

  @media screen and (min-width: 378px) {
    /* 买家版的width有点奇怪 */

    .text-wrap {
      width: 340px;
    }
  }
</style>
