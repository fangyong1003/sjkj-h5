<template>
  <div class="total-price">
    <template v-if="totalData.ruleType === 0 && totalData.mainValues.length">
      <span
        v-for="(mainValue, index) in totalData.mainValues"
        :key="index"
        :class="`price-num price-num--${mainValue.key}`"
      >
        <span class="price-num__prefix">{{ mainValue.prefix }}</span>
        <span class="price-num__value">{{ mainValue.value | cent2yuan }}</span>
        <span class="price-num__suffix">{{ mainValue.suffix }}</span>
      </span>
    </template>
    <p v-else class="price-num">{{totalData.totalPrice}}</p>
  </div>
</template>

<script>
import { cent2yuan } from '@/common/utils/money';

export default {
  name: 'total-price',

  props: {
    totalData: Object
  },

  filters: {
    cent2yuan
  }
}
</script>

<style>
.price-num {
  color: #C4D52F;
  line-height: 24px;
  font-size: 17px;
  display:inherit;
  > span {
    font-size: 17px;
    vertical-align: middle;
  }

  &--diamond {
    line-height:25px;
    .price-num__prefix {
    font-size: 13px;
    color: #363636;
    }
    .price-num__value {
    font-size: 17px;
    color: #342C2A;
    font-family: PingFangSC-Medium;
    }
  }
  &--cash{
    font-size:15px;
    font-family: PingFangSC-Medium;
    color: #C4D52F;
  }
}
</style>
