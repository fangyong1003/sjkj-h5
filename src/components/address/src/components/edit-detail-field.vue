<template>
  <div>
    <van-field
      class="van-hairline--bottom"
      label="详细地址"
      placeholder="如街道、楼层、门牌号等"
      maxlength="200"
      type="textarea"
      autosize
      :value="value"
      :error="isError"
      :class="detailClass"
      :onIconClick="onIconClick"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      >
      <template slot="icon">
        <template v-if="value && isFocused">
          <span v-if="isAndroid" class="cap-address-detail__finish-edit">完成</span>
          <van-icon v-else name="clear"></van-icon>
        </template>
      </template>
    </van-field>
  </div>
</template>

<script>
import { Field, Icon, Cell, CellGroup } from 'vant';
import UA from '@/common/utils/ua_browser';

export default {
  components: {
    'van-field': Field,
    'van-icon': Icon,
    'van-cell-group': CellGroup,
    'van-cell': Cell
  },
  props: {
    value: {},
    isError: Boolean,
    needSearch: Boolean,
    searchLocation: Function
  },
  data() {
    return {
      suggestList: [],
      isAndroid: UA.isAndroid(),
      isSearching: false,
      isFocused: false
    };
  },
  computed: {
    showSearchList() {
      return this.needSearch && this.isFocused && this.isSearching && this.suggestList.length > 0;
    },
    detailClass() {
      return this.showSearchList ? 'cap-address-detail--no-border' : '';
    }
  },
  methods: {
    handleFocus(e) {
      this.isFocused = true;
      this.$emit('focus', e);
    },
    handleBlur(e) {
      // 等待其他地方点击事件完了以后，再触发
      setTimeout(() => {
        this.isSearching = false;
        this.isFocused = false;
        this.$emit('blur', e);
      }, 100);
    },
    handleInput(e) {
      this.$emit('input', e);

      if (!this.isFocused || !e) {
        return;
      }
      this.searchSuggestLocation();
    },
    onIconClick() {
      // 安卓直接完成，不触发清除
      if (this.isAndroid) {
        return;
      }
      this.$emit('input', '');
    },
    onSuggestSelect(express) {
      this.$emit('input', `${express.address} ${express.name}`);
    },
    searchSuggestLocation() {
      const searchRes = this.searchLocation(this.value);
      this.isSearching = true;
      if (searchRes.then) {
        searchRes.then((res) => {
          this.suggestList = res;
        });
      } else {
        this.suggestList = searchRes;
      }
    }
  }
};
</script>

<style lang="postcss">

.cap-address-detail {
  &--no-border:after {
    border-bottom: none;
  }

  &__finish-edit {
    color: #38f;
    font-size: 12px;
  }

  &__suggest-list {
    margin-left: -15px;
  }

  &__location {
    float: left;
    font-size: 18px;
    color: #666;
  }

  &__item-info {
    margin-left: 26px;
    line-height: 1.6;
  }

  &__title {
    font-size: 14px;
    margin-bottom: 4px;
  }

  &__subtitle {
    font-size: 12px;
    color: #666;
  }
}
</style>
