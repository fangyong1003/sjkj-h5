<template>
  <div
    class="cap-logistics"
    @click="handleClick">
    <div
      v-if="hasAddress"
      class="cap-logistics__address">
      <div class="cap-logistics__address-content">
        <div>
          <p class="cap-logistics__address-name">{{ userName }}</p>
          <p class="cap-logistics__address-tel">{{ tel }}</p>
        </div>
        <p class="cap-logistics__address-detail">{{ addressDetail }}</p>
      </div>
    </div>
    <div
      v-else
      class="cap-logistics__empty-address">
      添加收货地址
    </div>
    <van-icon v-show="editable" name="arrow"></van-icon>
  </div>
</template>

<script>
import { Icon, Cell } from 'vant';

export default {
  name: 'cap-logistics',

  components: {
    [Icon.name]: Icon,
    [Cell.name]: Cell
  },

  props: {
    // 地址展示对象
    address: {
      type: Object,
      default() {
        return {};
      }
    },
    // 地址能否修改
    editable: {
      type: Boolean,
      default: true
    },
    // 隐藏完整手机号
    hideRealTel: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    hasAddress() {
      return Object.keys(this.address).length > 0;
    },
    userName() {
      return this.address.receiver || '';
    },
    addressDetail() {
      if (this.hasAddress) {
        if (this.address.addressDetail) return this.address.addressDetail;

        return `${this.address.province}${this.address.city}${this.address
          .county}${this.address.community || ''}${this.address
          .address}`;
      }
      return '';
    },
    tel() {
      if (this.hasAddress) {
        if (this.hideRealTel) {
          return String(this.address.mobile).replace(/\d{4}(\d{4})$/, '****$1');
        } else {
          return this.address.mobile;
        }
      }
      return '';
    }
  },

  methods: {
    handleClick(e) {
      if (this.editable) {
        this.$emit('click', e);
      }
    }
  }
};
</script>

<style lang="postcss">
@import 'mixins';

.cap-logistics {
  position: relative;

  &::after {
    content: '';
    display: block;
    height: 3px;
    background-image: url('../images/address-border.png');
    background-size: 20px 3px;
  }

  .van-icon-arrow {
    position: absolute;
    top: 50%;
    right: 12px;
    margin-top: -20px;
    line-height: 40px;
    font-size: 14px;
    color: #999;
  }

  &__empty-address {
    position: relative;
    padding: 0 12px;
    line-height: 50px;
    font-size: 17px;
    color: #333;
    background-color: #fff;
  }

  &__address {
    position: relative;
    padding: 10px 12px;
    min-height: 22px;
    line-height: 22px;
    background-color: #fff;

    .van-icon-location {
      float: left;
      margin-right: 10px;
    }

    &-content {
      overflow: hidden;
      margin-right: 15px;
      padding-right: 0;

      > div {
        overflow: hidden;
        font-size: 17px;
        line-height: 24px;
      }
    }

    &-name {
      float: left;
      max-width: 160px;
      margin-right: 20px;

      @mixin multi-ellipsis 1;
    }

    &-tel {
      float: left;
    }

    &-detail {
      margin-top: 2px;
      font-size: 14px;
      line-height: 20px;
      color: #999;
      word-break: break-all;
    }
  }
}
</style>
