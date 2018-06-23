<template>
  <div
    class="cap-order-item"
    @click="onItemClick"
  >
    <!-- 顶部店铺名显示和订单号显示区域 -->
    <div class="cap-order-item__head">
      {{ order.team_name || '' }}
      <span class="cap-order-item__state">
        {{ getOrderStatusStr(order.orderStatus) }}
      </span>
    </div>

    <!-- 商品信息展示区域 -->
    <div class="cap-order-item__body">
      <div class="cap-order-item__img-list" v-if="order.images.length > 1">
        <img v-for="(image, index) in order.images" :src="image" :key="index">
      </div>
      <van-card v-else :thumb="order.images[0]">
        <div class="van-card__row" slot="title">
          <h4 class="van-card__title">{{ order.goodsTitle }}</h4>
        </div>
        <div class="van-card__row" slot="desc">
          <h4 class="van-card__desc">{{ order.goodsSpecs }}</h4>
          <span class="van-card__num">x {{ order.goodsNumber }}</span>
        </div>
        <div class="van-car__row" slot="tags">
          <span class="van-card__price">{{ paidString }}</span>
        </div>
        <!-- <div class="van-card__row" slot="tags">
          <van-tag v-if="order.order_type_str" type="danger">{{ order.order_type_str }}</van-tag>
        </div> -->
        <div slot="footer"></div>
      </van-card>
    </div>

    <!-- 底部合计信息 按钮信息展示区域 -->
    <div class="cap-order-item__footer">
      <div class="cap-order-item__total-price">
        共<span class="cap-order-item__total-number">{{ order.orderGoodsNumber }}</span>件商品
        合计：<span>{{ orderPaidString }}</span>
      </div>

      <cap-order-btns
        v-if="!$slots.btns && actionBtns.length > 0"
        :actionBtns="actionBtns"
        :orderId="order.orderId"
        :expiredSeconds="order.expiredSeconds"
        @click="onBtnClick"
        @timeout="onTimeout"
      />
      <slot v-else name="btns"></slot>
    </div>
  </div>
</template>

<script>
import { Card, Tag } from 'vant';
import { getPaidString, getOrderPaidString } from '@/common/helpers';
import ActionBtns from '@/components/order-actions';
import { btns, ORDER_STATUS_STR } from './config';

export default {
  name: 'cap-order-list-item',
  props: ['order'],
  components: {
    'van-card': Card,
    'van-tag': Tag,
    'cap-order-btns': ActionBtns
  },

  methods: {
    getOrderStatusStr(status) {
      return ORDER_STATUS_STR[status];
    },
    onBtnClick(event) {
      this.$emit('btnclick', {
        type: event,
        order: Object.assign({}, this.order)
      });
    },
    onItemClick() {
      this.$emit('itemclick', {
        order: Object.assign({}, this.order)
      });
    },
    onTimeout() {
      this.$emit('timeout', {
        order: Object.assign({}, this.order)
      });
    }
  },

  computed: {
    paidString() {
      return getPaidString(this.order);
    },
    orderPaidString() {
      return getOrderPaidString(this.order);
    },
    orderTypeStr() {
      // 如果有btns的slot，就返回，不再需要计算
      if (this.$slots.btns) {
        return;
      }

      const orderTypeStr = this.order.orderStatus;

      return orderTypeStr;
    },
    actionBtns() {
      // 如果有btns的slot，就返回，不再需要计算
      if (this.$slots.btns) {
        return;
      }

      let actionBtns = btns[this.orderTypeStr] || [];
      actionBtns = actionBtns.slice();

      return actionBtns;
    }
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.cap-order-item {
  margin: 10px 0;
  line-height: 1.4;
  font-size: 14px;
  background: #fff;

  .van-card {
    background: #fff;

    &__price {
      color: #C4D52F;
    }
  }

  &__head {
    color: $black;
    padding: 15px 15px 10px;

    @mixin clearfix;
  }

  &__state {
    float: right;
    color: #f00;
  }

  &__body,
  &__footer {
    @mixin clearfix;
  }

  &__img-list {
    padding: 5px 15px;

    img {
      margin-right: 17px;
      width: 90px;
      height: 90px;
    }
  }

  &__total-price {
    position: relative;
    padding: 10px 15px;
    text-align: right;

    span {
      color:#C4D52F;
    }

    &::after {
      @mixin border-retina (bottom);
    }

    &:last-child::after {
      border: 0 none;
    }
  }

  &__order-no {
    font-size: 12px;
    color: $gray-dark;
  }

  &__desc {
    flex-flow: column;
    align-items: flex-start;
  }

  &__more {
    color: $blue;
    position: relative;
    padding: 15px;
    text-align: center;

    &::after {
      @mixin border-retina (bottom);
    }
  }
}
</style>
