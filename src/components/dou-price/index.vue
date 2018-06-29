<template>
  <div class="dou-price">
    <img src="./images/dou.png" class="douPic">
    <span class="dou">食间豆</span>
    <template v-if="totalData.ruleType === 0 && totalData.mainValues.length">
      <span
        v-for="(mainValue, index) in totalData.mainValues"
        :key="index"
        :class="`price-num price-num--${mainValue.key}`"
      >
        <span class="price-num__value">{{ mainValue.value | cent2yuan }}</span>
      </span>
    </template>
    <p v-else style="float:right" class="price-num">{{totalData.totalPrice}}</p>
  </div>
</template>

<script>
import { cent2yuan } from '@/common/utils/money';

export default {
  name: 'dou-price',

  props: {
    totalData: Object
  },

  filters: {
    cent2yuan
  }
}
</script>

<style scoped>
.douPic{
  width:14px;
  margin-right:5px;
}
.price-num {
  color: #342C2A;
  line-height: 24px;
  font-size: 13px;
  display:inherit;
  > span {
    font-size: 17px;
    vertical-align: middle;
  }

  &--diamond {
    line-height:25px;
    float:right;
    .price-num__prefix {
    font-size: 13px;
    color: #363636;
    display:none;
    }
    .price-num__value {
    font-size: 17px;
    color: #342C2A;
    font-family: PingFangSC-Medium;
    }
    .price-num__suffix{
      display:none;
    }
  }
  &--cash{
    display:none;
  }
}
</style>
