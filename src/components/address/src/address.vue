<template>
  <div class="cap-address">
    <van-popup class="cap-address__list" v-model="showAddressList" :position="popupPosition" :overlay="false">
      <cap-address-list
        :address-list="curAddressList"
        v-model="curAddressId"
        :add-text="addText"
        @change="handleAddressChange"
        @edit="handleAddEdit"
        @delete="handleDelete"
      >
      </cap-address-list>
    </van-popup>
    <van-popup class="cap-address__edit" v-model="showAddressEdit" :position="popupPosition" :overlay="false">
      <cap-address-edit
        :address-list="addressList"
        :address-info="currentAddressInfo"
        :save-url="saveUrl"
        :update-url="updateUrl"
        :delete-url="deleteUrl"
        :needSearch="needSearch"
        :searchLocation="searchLocation"
        :needLocation="needLocation"
        :getLocation="getLocation"
        :area-url="areaUrl"
        :request-delete-address="requestDeleteAddress"
        :request-add-edit-address="requestAddEditAddress"
        @save="handleAddressSave">
      </cap-address-edit>
    </van-popup>
  </div>
</template>

<script>
import { Popup, Cell, Dialog, Toast } from 'vant';
import Api from './api/address';
import AddressList from './components/address_list';
import AddressEdit from './components/address_edit';

const ADDRESS_LIST_HASH = 'address-list';

export default {
  name: 'cap-address',

  components: {
    'van-popup': Popup,
    [Cell.name]: Cell,
    'cap-address-list': AddressList,
    'cap-address-edit': AddressEdit
  },

  props: {
    value: {},
    url: String,
    addText: String,
    saveUrl: String,
    updateUrl: String,
    areaUrl: String,
    deleteUrl: String,
    needSearch: Boolean,
    needLocation: Boolean,
    addressId: [Number, String],
    addressList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    searchLocation: {
      type: Function,
      default: () => []
    },
    getLocation: {
      type: Function,
      default: () => ({ lat: '', lon: '' })
    },
    popupPosition: {
      type: String,
      default: 'right'
    },
    requestDeleteAddress: {
      type: Function,
      default: Api.requestDeleteAddress
    },
    requestAddEditAddress: {
      type: Function,
      default: Api.requestAddEditAddress
    }
  },

  data() {
    return {
      curAddressId: this.addressId,
      showAddressList: this.value,
      showAddressEdit: false,
      currentAddressInfo: {},
      curAddressList: this.addressList,
      isDeleting: false
    };
  },

  watch: {
    addressId(val) {
      this.curAddressId = val;
    },
    curAddressId(val) {
      this.$emit('update:addressId', val);
    },
    addressList(val) {
      this.curAddressList = val;
    },
    value(val) {
      this.showAddressList = val;
      const curAddressList = this.curAddressList;

      if (val && (curAddressList && curAddressList.length === 0)) {
        this.getAddressList();
      }
    },
    showAddressList(val) {
      if (val) {
        this.replaceHash(ADDRESS_LIST_HASH);
      }
      this.$emit('input', val);
    }
  },

  mounted() {
    const hashArr = location.hash.split('#');

    if (hashArr.indexOf(ADDRESS_LIST_HASH) !== -1) {
      hashArr.pop();
      location.hash = hashArr.join('#');
    }

    this.handleHashChange = this.handleHashChange.bind(this);
    window.addEventListener('hashchange', this.handleHashChange);
  },

  methods: {
    getAddressList() {
      Api.requestAddressList(this.url)
        .then(data => {
          this.curAddressList = data.addresses;
        });
    },
    replaceHash(hash) {
      location.hash += ('#' + hash);
    },
    handleHashChange(event) {
      const oldURL = event.oldURL;
      const newURL = event.newURL;

      const listHash = '#' + ADDRESS_LIST_HASH;
      if (oldURL.indexOf(listHash) !== -1 && newURL.indexOf(listHash) === -1) {
        this.showAddressList = false;
        this.showAddressEdit = false;
      }
    },
    /**
     * 地址切换时
     *
     * @param {Object} info 单个地址项的数据
     */
    handleAddressChange(info, changeHistory = true) {
      console.log(info)
      this.showAddressList = false;
      changeHistory && history.go(-1);

      this.$emit('change', info);
      this.$emit('update:addressId', info.addressId);
      YZLocalStorage.setItem('recently_used_address', JSON.stringify(info));
    },

    /**
     * 处理添加或编辑
     *
     * @param {Object} info 单个地址项的数据
     */
    handleAddEdit(info) {
      this.showAddressEdit = true;

      info = info || {};
      this.currentAddressInfo = info;
    },

    /**
     * 处理地址保存
     *
     * @param {Object} info 单个地址项的数据
     * @param {boolean} isEdit 是否为编辑（编辑/新增）
     */
    handleAddressSave(info, isEdit) {
      const curAddressList = this.curAddressList;
      if (isEdit) {
        const index = this.findAddressById(info.addressId);
        const oldInfo = curAddressList[index];
        curAddressList[index] = Object.assign(oldInfo, info);
        this.$emit('address-edit', index, info);
      } else {
        curAddressList.unshift(info);
      }

      this.curAddressList = curAddressList;
      this.showAddressEdit = false;
    },

    /**
     * 处理地址删除
     *
     * @param {Object} address 单个地址项的数据
     */
    handleDelete(address) {
      const addressId = address.addressId;

      if (this.isDeleting) {
        return;
      }

      Dialog.confirm({
        message: `确定要删除这个收货地址吗？`
      }).then((action) => {
        if (action === 'confirm') {
          this.isDeleting = true;
          this.requestDeleteAddress(this.deleteUrl, {
            addressId
          }).then(() => {
            this.isDeleting = false;
            const index = this.findAddressById(addressId);
            this.curAddressList.splice(index, 1);
          }).catch((res = {}) => {
            this.isDeleting = false;
            Toast(res.msg || '地址删除失败，请稍后重试');
          });
        }
      }).catch(() => {});
    },

    /**
     * 根据ID获取地址在列表中的索引
     *
     * @param {number} id 地址id
     * @return {number} index 在列表中的索引
     */
    findAddressById(addressId) {
      const curAddressList = this.curAddressList;

      for (let i = 0; i < curAddressList.length; i++) {
        if (+curAddressList[i].addressId === +addressId) {
          return i;
        }
      }
    }
  },

  destroyed() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }
};
</script>

<style lang="postcss">
.cap-address {
  &__list {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-bottom: 44px;
    overflow: auto;
    background-color: #eee;
  }

  &__edit {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }

  .popup-slide-right-enter,
  .popup-slide-right-leave-active {
    left: 100%;

    .cap-address-list__add {
      left: 100%;
    }
  }
}
</style>
