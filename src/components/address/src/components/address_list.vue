<template>
  <div class="cap-address-list">
    <van-radio-group v-model="curValue" class="cap-address-list__group scroller">
      <van-cell-group>
        <van-cell
          v-for="item in addressList"
          :key="item.addressId"
          class="cap-address-list__address-item"
        >
          <div @click="handleAddressItemClick(item)">
            <h4 class="cap-address-list__username">
              {{ item.receiver }}&nbsp;&nbsp;&nbsp;
              {{ item.mobile }}
              <span v-if="item.defaultFlag == '1'"
                class="cap-address-list__default-flag"
              >默认地址</span>
            </h4>
            <p class="cap-address-list__address">收货地址：{{ computeAddressDetail(item) }}</p>
          </div>
          <van-icon name="edit" class="cap-address-list__edit" @click="handleAddEditClick(item)"></van-icon>
          <div v-show="isEdit"
            class="cap-address-list__delete-btn"
            @click="handleDeleteClick(item)"
          >删除</div>
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <div class="cap-address-list__add">
      <jz-button
        class="cap-address-list__add-btn"
        type="primary"
        @click="handleAddEditClick()"
      >
        添加收货地址
      </jz-button>
      <jz-button class="cap-address-list__manage-btn"
        @click="handleManageClick"
      >
        {{ isEdit ? '完成' : '管理收货地址' }}
      </jz-button>
    </div>
  </div>
</template>

<script>
import { RadioGroup, Radio, CellGroup, Cell, Icon } from 'vant';
import JzButton from '@/components/button';

export default {
  name: 'cap-address-list',

  components: {
    'van-radio-group': RadioGroup,
    'van-radio': Radio,
    'van-cell-group': CellGroup,
    'van-cell': Cell,
    'van-icon': Icon,
    JzButton
  },

  props: {
    value: {},
    addressList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    addText: String
  },

  data() {
    return {
      curValue: this.value,
      isEdit: false
    };
  },

  watch: {
    value(val) {
      console.log(val);
      this.curValue = val;
    },

    curValue(val) {
      this.$emit('input', val);
    }
  },

  methods: {
    /**
     * 计算省市县字符串
     *
     * @param {Object} item 地址项对象数据
     */
    computeAddressDetail(item) {
      if (!item) return;

      return item.province + item.city + item.county + item.address;
    },

    /**
     * 某一个地址点击
     *
     * @param {Object} item 地址项对象数据
     */
    handleAddressItemClick(item) {
      this.$emit('change', item);
    },

    /**
     * 新增或编辑地址
     *
     * @param {Object} item 地址项对象数据
     */
    handleAddEditClick(item) {
      this.$emit('edit', item || { address: '', defaultFlag: '-1' });
    },

    handleDeleteClick(item) {
      this.$emit('delete', item);
    },

    handleManageClick() {
      this.isEdit = !this.isEdit;
    }
  }
};
</script>

<style lang="postcss">
.cap-address-list {
  height: 100%;
  .van-cell {
    overflow: visible;
  }

  .van-cell__value {
    padding-right: 34px;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    overflow: visible;
  }

  .van-radio__label {
    padding-left: 32px;
    margin-left: 0;
  }

  .van-radio__input {
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
    left: 0;
  }

  .van-icon-checked {
    color: #3388FF;
  }

  &__group {
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  &__username {
    margin-bottom: 5px;
    font-size: 17px;
    color: #333;
    line-height: 24px;
  }

  &__address {
    font-size: 14px;
    color: #999;
    line-height: 20px;
  }

  &__default-flag {
    display: inline-block;
    position: relative;
    top: -2px;
    margin-left: 15px;
    width: 66px;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
    border-radius: 3px;
    color: #fff;
  }

  &__delete-btn {
    position: absolute;
    right: -15px;
    top: -10px;
    bottom: -10px;
    width: 60px;
    text-align: center;
    background: #FF5C5C;
    color: #fff;
    vertical-align: middle;

    &::before {
      content:'';
      display:inline-block;
      vertical-align:middle;
      height:100%;
    }
  }

  &__edit {
    position: absolute;
    top: 50%;
    font-size: 22px;
    line-height: 1;
    transform: translate(0, -50%);
    right: 4px;
    color: #999;
  }

  &__add {
    display: flex;
    padding: 8px;
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid #f5f5f5;
    line-height: 44px;
    z-index: 9999;
    background-color: #fff;
    color: #333;
    box-sizing: border-box;
    transition: .2s ease-out;

    .jz-button {
      flex: 1;
      margin: 0 8px;
    }

    .cap-address-list__manage-btn {
      color: #fff;
      background-image: linear-gradient(-180deg, #f89a06 0%, #fb9900 100%);
    }
  }
}
</style>
