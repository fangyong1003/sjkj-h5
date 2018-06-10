<template>
  <div>
    <cell-group>
      <cell title="地址管理" isLink @click="handleAddressManage" />
      <cell title="意见反馈" isLink @click="goToPage('feedback')" />
    </cell-group>

    <div class="logout-btn" @click="handleLogout">退出登录</div>

    <!-- 地址选择 -->
    <cap-address
      v-model="addressData.show"
      add-text="添加收货地址"
      :save-url="addressData.saveUrl"
      :delete-url="addressData.deleteUrl"
      :update-url="addressData.updateUrl"
      :set-default-url="addressData.setDefaultUrl"
      :url="addressData.listUrl"
      :area-url="addressData.areaUrl"
    />
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant';
import Address from '@/components/address';
import { goToPage } from '@/common/helpers';
import cookie from '@/common/utils/cookie';
import YZLocalStorage from '@/common/utils/local_storage';
import urlConfig from '../confirm/config/url';

export default {
  name: 'setting',

  components: {
    Cell,
    CellGroup,
    'cap-address': Address
  },

  data() {
    return {
      goToPage,
      addressData: {
        // 是否显示地址选择组件
        show: false,
        // 保存地址url
        saveUrl: '',
        // 删除地址url
        deleteUrl: '',
        // 获取所有区域的url
        areaUrl: '',
        // 获取地址库列表
        listUrl: ''
      }
    };
  },

  methods: {
    handleLogout() {
      cookie('token', {
        expires: -1
      });

      YZLocalStorage.clear();

      goToPage('homepage');
    },

    handleAddressManage() {
      this.addressData.show = true;
    }
  },

  created() {
    // 地址相关信息初始化
    this.addressData.saveUrl = urlConfig.addressSaveUrl;
    this.addressData.updateUrl = urlConfig.addressUpdateUrl;
    this.addressData.deleteUrl = urlConfig.addressDeleteUrl;
    this.addressData.areaUrl = urlConfig.addressAreaUrl;
    this.addressData.listUrl = urlConfig.addressList;
    this.addressData.setDefaultUrl = urlConfig.addressSetDefault;
  }
};
</script>

<style lang="postcss">
body {
  background: #f7f7f7;
}

.van-cell {
  line-height: 30px;
  font-size: 17px;
}
.logout-btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 17px;
  text-align: center;
  color: #f00;
  background: #fff;
}
</style>
