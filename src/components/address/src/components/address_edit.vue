<template>
  <div class="cap-address-edit">
    <van-cell-group>
      <template v-if="!hideSimpleField">
        <van-field
          :label="addressText + '人'"
          placeholder="请输入"
          v-model="currentInfo.receiver"
          maxlength="15"
          :error="errorInfo.receiver"
          @focus="handleInputFocus('receiver')">
        </van-field>
        <van-field
          type="text"
          maxlength="11"
          label="手机号码"
          placeholder="请输入"
          v-model="currentInfo.mobile"
          :error="errorInfo.mobile"
          @focus="handleInputFocus('mobile')">
        </van-field>
      </template>
      <van-cell class="cap-address-edit__area" title="所在地区" @click="handleAreaSelect">
        <span v-if="currentInfo.province">
          {{ currentInfo.province }}
          {{ currentInfo.city }}
          {{ currentInfo.county }}
        </span>
        <span v-else class="cap-address-edit__area-placeholder">请选择</span>
      </van-cell>
      <edit-detail-field
        v-model="currentInfo.address"
        :isError="errorInfo.address"
        :needSearch="needSearch"
        :searchLocation="searchLocationFunc"
        @focus="handleInputFocus('address')"
        @blur="handleDetailBlur">
      </edit-detail-field>
      <!-- <template v-if="!hideAllField">
        <van-cell title="设为默认收货地址" class="cap-address-edit__default">
          <van-switch v-model="isDefault"></van-switch>
        </van-cell>
      </template> -->
    </van-cell-group>
    <template v-if="!hideAllField">
      <!-- <div class="cap-address-edit__buttons"> -->
        <!-- <van-button type="primary" block :loading="isSaving" @click="handleSaveAddress">保存</van-button> -->
        <!-- <van-button block :loading="isDeleting" @click="handleDeleteAddress" v-if="isEdit">删除{{ addressText }}地址</van-button> -->
      <!-- </div> -->
      <van-submit-bar
        class="cap-address-edit__buttons"
        button-text="确定"
        :loading="isSaving"
        @submit="handleSaveAddress"
      >
        <van-checkbox v-model="isDefault">设为默认地址</van-checkbox>
      </van-submit-bar>
      <van-popup class="cap-address-edit__popup" v-model="showAreaSelect" position="bottom">
        <cap-area :value="currentInfo.countyCode" :initCodes="initCodes" :url="areaUrl" @confirm="handleAreaConfirm" @cancel="handleAreaCancel"></cap-area>
      </van-popup>
    </template>
  </div>
</template>

<script>
import { Field, Cell, CellGroup, Checkbox, Switch, Button, Popup, Toast, SubmitBar } from 'vant';
import Area from '@/components/area';
import EditDetailField from './edit-detail-field';

export default {
  name: 'cap-address-edit',

  components: {
    'van-field': Field,
    'van-checkbox': Checkbox,
    'van-cell': Cell,
    'van-cell-group': CellGroup,
    'van-switch': Switch,
    'van-button': Button,
    'van-popup': Popup,
    'van-submit-bar': SubmitBar,
    'cap-area': Area,
    'edit-detail-field': EditDetailField
  },

  props: {
    value: {},
    saveUrl: String,
    updateUrl: String,
    deleteUrl: String,
    defaultSet: Boolean,
    addressText: {
      type: String,
      default: '收货'
    },
    addressInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    requestAddEditAddress: Function,
    requestDeleteAddress: Function,
    needSearch: Boolean,
    searchLocation: Function,
    needLocation: Boolean,
    getLocation: Function,
    showPostal: Boolean,
    areaUrl: String
  },

  data() {
    return {
      initCodes: ['000000'],
      showAreaSelect: false,
      currentInfo: this.addressInfo,
      isEdit: !!this.addressInfo.addressId,
      detailFocused: false,
      detailSearching: false,
      // 地址是否在保存中
      isSaving: false,
      // 地址是否在删除中
      isDeleting: false,
      errorInfo: {
        receiver: false,
        mobile: false,
        address: false
      },
      isDefault: this.addressInfo.defaultFlag === '1'
    };
  },

  watch: {
    isDefault(val) {
      this.currentInfo.defaultFlag = (val ? '1' : '-1');
    },
    addressInfo(val) {
      this.currentInfo = val;
      this.isEdit = !!val.addressId;

      const initCodes = ['000000'];
      if (val.provinceCode) {
        initCodes.push(val.provinceCode);
      }
      if (val.cityCode) {
        initCodes.push(val.cityCode);
      }
      this.initCodes = initCodes;
    }
  },

  computed: {
    // 当地址输入框开启了搜索，并且开始搜索后，隐藏所有地址详情以外的输入框
    hideAllField() {
      return this.needSearch && this.detailSearching;
    },
    // 当地址输入框开启了搜索，并且聚焦后，隐藏地址详情以上的输入框
    hideSimpleField() {
      return this.hideAllField || (this.needSearch && this.detailFocused);
    }
  },

  methods: {
    handleInputFocus(key) {
      this.errorInfo[key] = false;
      if (key === 'address') {
        this.detailFocused = true;
      }
    },
    handleDetailBlur() {
      this.detailSearching = false;
      this.detailFocused = false;
    },
    /**
     * 地址详情搜索方法包装
     */
    searchLocationFunc(keyword) {
      this.detailSearching = true;
      return this.searchLocation(keyword, this.currentInfo.city, this.currentInfo);
    },
    /**
     * 省市县选择点击弹出area picker
     */
    handleAreaSelect() {
      this.showAreaSelect = true;
    },

    /**
     * 省市县确认
     */
    handleAreaConfirm(values) {
      values = values || [];
      // 全部选中才允许确认
      if (values.length !== 3 || +values[0].code === -1 || +values[1].code === -1 || +values[2].code === -1) {
        Toast('请选择正确的收货地区');
        return;
      }
      this.currentInfo.provinceCode = values[0].code;
      this.currentInfo.province = values[0].name;
      this.currentInfo.cityCode = values[1].code;
      this.currentInfo.city = values[1].name;
      this.currentInfo.countyCode = values[2].code;
      this.currentInfo.county = values[2].name;
      this.showAreaSelect = false;
    },

    /**
     * 省市县取消
     */
    handleAreaCancel() {
      this.showAreaSelect = false;
    },

    /**
     * 保存地址
     */
    handleSaveAddress() {
      const userNameMessage = this.getErrorMessageByKey('receiver');
      if (userNameMessage.length !== 0) {
        Toast(userNameMessage);
        return;
      }

      const mobileMessage = this.getErrorMessageByKey('mobile');
      if (mobileMessage.length !== 0) {
        Toast(mobileMessage);
        return;
      }

      const areaCodeMessage = this.getErrorMessageByKey('countyCode');
      if (areaCodeMessage.length !== 0) {
        Toast(areaCodeMessage);
        return;
      }

      const addressDetailMessage = this.getErrorMessageByKey('address');
      if (addressDetailMessage.length !== 0) {
        Toast(addressDetailMessage);
        return;
      }

      // 如果在保存中，就先返回
      if (this.isSaving) {
        return;
      }

      // 获取了定位信息以后再保存
      this.getGeoLocation()
        .then(geoData => {
          this.currentInfo.lat = geoData.lat;
          this.currentInfo.lon = geoData.lon;

          this.isSaving = true;
          const url = this.isEdit ? this.updateUrl : this.saveUrl;

          this.requestAddEditAddress(url, this.currentInfo)
            .then((data) => {
              console.log(data, 'save address');
              this.isSaving = false;

              if (!this.currentInfo.addressId) {
                // 新增地址补上id
                this.currentInfo.addressId = data.result;
              }
              this.showAreaSelect = false;
              this.$emit('save', this.currentInfo, this.isEdit);
              this.isEdit = true;
            }).catch((res = {}) => {
              this.isSaving = false;
              Toast(res.msg || '地址保存失败，请稍后重试');
              this.$emit('error:save');
            });
        });
    },

    /**
     * 根据`key`计算返回错误信息
     */
    getErrorMessageByKey(key) {
      const currentInfo = this.currentInfo;
      let message = '';

      if (key === 'receiver') {
        if (!currentInfo.receiver) {
          message = '请填写名字';
        }

        // 名字过长
        if (currentInfo.receiver && currentInfo.receiver.length > 15) {
          message = '名字过长，请重新输入';
        }
      } else if (key === 'mobile' && !/^((\+86)|(86))?(1)\d{10}$/.test(currentInfo.mobile)) {
        message = '请填写正确的手机号码';
      } else if (key === 'countyCode') {
        if (!currentInfo.countyCode) {
          message = '请选择收货地区';
        }

        if (+currentInfo.countyCode === -1) {
          message = '请选择正确的收货地区';
        }
      } else if (key === 'address') {
        if (!currentInfo.address) {
          message = '请填写详细地址';
        }

        if (currentInfo.address && currentInfo.address.length > 200) {
          message = '详细地址不能超过200个字符';
        }
      }

      if (message.length !== 0) {
        this.errorInfo[key] = true;
      }

      return message;
    },

    getGeoLocation() {
      return new window.Promise((resolve, reject) => {
        if (!this.needLocation) {
          resolve({
            lat: '',
            lon: ''
          });
          return;
        }

        // 根据是否是promise来处理
        const locationRes = this.getLocation(this.currentInfo.address, this.currentInfo);
        if (locationRes.then) {
          locationRes.then(res => resolve(res));
        } else {
          resolve(locationRes);
        }
      });
    }
  }
};
</script>

<style lang="postcss">
.cap-address-edit {
  .van-field__control {
    text-align: right;
  }

  &__buttons {
    .van-submit-bar__bar {
      padding-left: 15px;
    }
    .van-checkbox {
      flex: 1;
    }

    .van-checkbox--checked {
      border-color: #FE0533;
      background-image: linear-gradient(-176deg, #F0019E 0%, #FE0533 100%);
    }

    .van-checkbox__label {
      font-size: 14px;
      color: #999;
    }
  }

  &__default {
    .van-cell__title {
      line-height: 31px;
    }

    .van-cell__value {
      height: 31px;
    }
  }

  &__area {
    overflow: hidden;

    .van-cell__title {
      width: 90px;
      float: left;
    }

    .van-cell__value {
      text-align: right;
    }
  }

  &__area-placeholder {
    color: #999;
  }

  .van-button {
    margin-bottom: 10px;
  }
}
</style>
