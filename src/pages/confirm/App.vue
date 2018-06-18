<template>
  <div id="app" class="order-container">
    <!-- 地址展示区 -->
    <cap-logistics
      @click="addressData.show=true"
      :address="address"
      :editable="!orderNo">
    </cap-logistics>

    <!-- 店铺结算 -->
    <cap-order-goods
      v-for="(shop, index) in order"
      :key="index"
      shop-name=""
      :item-list="shop.goodsData"
      class="order-goods"
      disableCardClick>
    </cap-order-goods>

  <vm-price
      :orderTotalData="orderTotalData"
      :expressTotalPrice="expressTotalPrice"
    >
    </vm-price>

    <!-- 下单操作区 -->
    <van-submit-bar
      :loading="showOrderLoading"
      button-text="提交订单"
      @submit="handleSubmit"
    >
      <div class="order-submit-bar__info">
        <total-price :total-data="orderTotalData" />
        <p class="order-submit-bar__bonus">{{ orderTotalDesc }}</p>
      </div>
    </van-submit-bar>

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
      @change="handleAddressChange">
    </cap-address>
  </div>
</template>

<script>
import { Toast, Cell, SubmitBar } from 'vant';
import find from 'lodash/find';
import Address from '@/components/address';
import Logistics from '@/components/logistics';
import OrderGoods from '@/components/order-goods';
import TotalPrice from '@/components/total-price';
// import SubmitBar from '@/components/submit-bar';
import { cent2yuan } from '@/common/utils/money';
import LocalStroage from '@/common/utils/local_storage';
import { goToPage, getOrderTotal } from '@/common/helpers';
import PriceInfo from './components/price-info';
import api from './api/index';
import urlConfig from './config/url';
// import orderData from './mock';

export default {
  name: 'order-confirm',

  components: {
    TotalPrice,
    [Cell.name]: Cell,
    [SubmitBar.name]: SubmitBar,
    [Address.name]: Address,
    [OrderGoods.name]: OrderGoods,
    [Logistics.name]: Logistics,
    'vm-price': PriceInfo
  },

  props: {
    addressList: Array
  },

  data() {
    return {
      orderNo: '',
      // 是否在下单中
      showOrderLoading: false,
      // 地址组件数据
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
      },
      // 服务器端获取的订单信息
      order: [],
      userSelectAddress: {}
    };
  },

  filters: {
    cent2yuan
  },

  computed: {
    // 从order里解析的地址信息
    address() {
      if (this.userSelectAddress.addressId) {
        return this.userSelectAddress;
      }

      return {};
    },
    // order 中的运费
    expressTotalPrice() {
      return this.order.express_fee || 0;
    },
    orderTotalData() {
      const order = this.order.map(shop => shop.goodsData);
      return getOrderTotal(order);
    },
    orderTotalDesc() {
      const diamond = this.orderTotalData.totalDiamond;
      let desc = `购买可获得${diamond}点石金`;
      if (this.orderTotalData.ruleType === 0 && +diamond > 0) {
        desc = `现金或余额支付可获得${diamond}点石金`;
      }
      return desc;
    }
  },
  methods: {
    handleAddressChange(data) {
      // 地址改变 向订单传递地址改变
      this.userSelectAddress = data;
    },
    handleSubmit() {
      const addressId = this.address.addressId;
      // 数据校验
      if (!addressId) {
        Toast('请选择地址');
        return;
      }

      this.showOrderLoading = true;
      const orderData = this.order.reduce((result, item) => {
        return result.concat(item.orderData);
      }, []);
      orderData.forEach((data) => {
        data.addressId = addressId;
      });
      // 提交订单
      api.submitOrder(orderData).then((resp) => {
        console.log('create order: ', resp)
        this.showOrderLoading = false;
        const orderIds = resp.orders.map(order => order.orderId);

        goToPage('pay-way', {
          orderIds: orderIds.join(',')
        });
      }).catch((res) => {
        this.showOrderLoading = false;
        Toast(res.msg || '订单生成失败，请稍候');
      });
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

    this.order = (JSON.parse(LocalStroage.getItem('goods')));

    // 默认地址
    if (this.addressList.length) {
      const defaultAddress = find(this.addressList, (address) => {
        return +address.defaultFlag === 1;
      });
      if (defaultAddress) {
        this.userSelectAddress = defaultAddress;
      }
    }
    console.log(this.order)
  }
};
</script>

<style lang="postcss">
body {
  background-color: #f7f7f7;
}

.order-container {
  padding-bottom: 50px;

  .van-submit-bar {
    .van-button--danger {
      font-size: 17px;
      background: #342C2A;
      border:1px solid #342C2A;
    }

    &__bar {
      line-height: initial;
    }

    &__price {
      display: none;
    }
    .price-num--diamond{
      display:none;
    }
  }

  .order-submit-bar {
    &__info {
      padding: 4px 15px;
      flex: 1;
    }

    &__price {
      line-height: 24px;
      font-size: 17px;
      color: #f00;
    }

    &__bonus {
      line-height: 17px;
      font-size: 12px;
      color: #999;
    }
  }
}
.order-goods {
  margin-top: 12px;
}
</style>
