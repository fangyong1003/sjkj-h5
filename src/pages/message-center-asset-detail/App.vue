<template>
  <div class="message-center-asset-detail">
    <van-cell-group>
      <van-cell class="asset-info">
        <p>{{mainTitle}}：<span :class="[{ 'money': assetType !== 'CREDIT' }]">{{ assetType !== 'CREDIT' ? '￥' : '' }}{{amount}}</span></p>
        <p v-if="subTitle">{{subTitle}}：<span>{{property}}</span></p>
        <p>{{timeTitle}}：<span>{{arriveTime}}</span></p>
        <p>来源方式：<span>{{moneyFrom}}</span></p>
      </van-cell>
    </van-cell-group>

    <div
      v-for="(goods, index) in goodsItems"
      :key="index"
      class="goods-card"
    >
      <div class="goods-img-wrap">
        <img
          class="goods-img"
          :src="goods.imageUrl"
        >
      </div>
      <div class="desc-wrap">
        <div class="goods-name">{{ goods.goodsName }}</div>
        <div class="sku-str">{{ goods.specsString }}</div>
        <div class="total-price">
          <span class="price-num__value">{{ goods.price }}</span>
          <span v-if="goods.ruleText" class="price-num__rule-text">{{ goods.ruleText }}</span>
          <span class="num">x {{ goods.goodsNumber }}</span>
        </div>
        <div class="order-time">购买时间：{{ goods.buyTime }}</div>
        <div v-if="goods.buyer" class="buyer">购买人：{{ goods.buyer }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import Args from '@/common/utils/args';
  import { Cell, CellGroup } from 'vant';
  import { goToPage } from '@/common/helpers';
  import { PAYMENT_TYPE } from '@/common/constants';
  import { getDetail } from './api';

  export default {
    name: 'message-center-asset-detail',

    components: {
      'van-cell-group': CellGroup,
      'van-cell': Cell
    },

    data() {
      return {
        goToPage,
        mainTitle: '',
        subTitle: '',
        timeTitle: '',
        amount: '',
        property: '',
        arriveTime: '',
        moneyFrom: '',
        assetType: Args.get('noticeSecondType').toUpperCase(),
        goodsItems: []
      };
    },

    created() {
      this.fetchDetail();
    },

    methods: {
      parseWithdraw(data) {
        console.log('data', data)
        const { assetBonusContent, createDatetime } = data.result[0];
        const { arrivalAmount, arriveTime } = assetBonusContent;
        this.amount = arrivalAmount;
        this.arriveTime = arriveTime;
        this.property = createDatetime;
      },
      parseFix(data) {
        console.log('data', data)
        const { assetFixContent = {} } = data.result[0];
        const { arrivalAmount = 0, arriveTime } = assetFixContent;
        this.amount = arrivalAmount;
        this.arriveTime = arriveTime;
      },
      parseBonus(data) {
        console.log('data', data)
        const { assetBonusContent } = data.result[0];
        const { arrivalAmount, arriveTime, goodsItems = [] } = assetBonusContent;
        this.amount = arrivalAmount;
        this.arriveTime = arriveTime;
        this.goodsItems = goodsItems.map(this.formatPaidString);
      },
      parseCredit(data) {
        console.log('data', data)
        const { assetCreditContent } = data.result[0];
        const { creditString, propertyString, arriveTime, goodsItems } = assetCreditContent;
        this.amount = creditString;
        this.property = propertyString;
        this.arriveTime = arriveTime;
        this.goodsItems = goodsItems.map(this.formatPaidString);
      },
      fetchDetail() {
        let url = '';
        switch (this.assetType) {
          case 'WITHDRAW':
            // 提现
            url = '/api/message/asset/withdraw';
            break;
          case 'FIX':
            // 定返
            url = '/api/message/asset/fix';
            break;
          case 'BONUS':
            // 奖励
            url = '/api/message/asset/bonus';
            break;
          case 'CREDIT':
            // 食间豆
            url = '/api/message/asset/credit';
            break;
        };

        getDetail({
          url,
          noticeId: Args.get('noticeId')
        }).then(data => {
          switch (this.assetType) {
            case 'WITHDRAW':
              // 提现
              this.mainTitle = '余额提现';
              this.subTitle = '提交时间';
              this.timeTitle = '通过时间';
              this.moneyFrom = '余额提现';
              this.parseWithdraw(data);
              break;
            case 'FIX':
              // 定返
              this.mainTitle = '定返到账';
              this.subTitle = '';
              this.timeTitle = '到账时间';
              this.moneyFrom = '食间豆红包定返余额';
              this.parseFix(data);
              break;
            case 'BONUS':
              // 奖励
              this.mainTitle = '到账余额';
              this.subTitle = '';
              this.timeTitle = '到账时间';
              this.moneyFrom = '推荐奖励';
              this.parseBonus(data);
              break;
            case 'CREDIT':
              // 食间豆
              this.mainTitle = '食间豆';
              this.subTitle = '食间豆红包';
              this.timeTitle = '到账时间';
              this.moneyFrom = '购物';
              this.parseCredit(data);
              break;
          }
        });
      },
      formatPaidString(goods) {
        // 计算展示价格
        switch (goods.paymentType) {
          case PAYMENT_TYPE.CASH:
            goods.price = `¥${goods.paidCashString}`;
            break;
          case PAYMENT_TYPE.CREDIT:
            goods.price = `食间豆${goods.paidCreditsString}`;
            break;
          case PAYMENT_TYPE.BALANCE:
            goods.price = `余额${goods.paidBalanceString}`;
            break;
          case PAYMENT_TYPE.CASH_CREDIT:
            goods.price = `¥${goods.paidCashString}`;
            goods.ruleText = `+食间豆${goods.paidCreditsString}`;
            break;
          case PAYMENT_TYPE.BALANCE_CREDIT:
            goods.price = `余额${goods.paidBalanceString}`;
            goods.ruleText = `+食间豆${goods.paidCreditsString}`;
            break;
          case PAYMENT_TYPE.CASH_ONLY:
            price = `￥${goods.paidCashString}`;
            break;
        }

        return goods;
      }
    }
  };
</script>

<style lang="postcss">
  body {
    background-color: #f7f7f7;
  }
  .asset-info {
    p {
      margin-bottom: 7px;
      line-height: 33px;
    }
    .money {
      line-height: 33px;
      font-size: 24px;
      color: #FF0000;
    }
    span {
      margin-left: 8px;
      vertical-align: middle;
    }
  }

  .goods-card {
    box-sizing: border-box;
    min-height: 112px;
    padding: 12px;
    margin-top: 10px;
    background: #fff;

    a {
      display: block;
    }

    .goods-img-wrap {
      width: 114px;
      height: 114px;
      float: left;
      position: relative;
      margin-left: auto;
      margin-right: auto;
      overflow: hidden;
      background-size: cover;
    }

    .goods-img {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }

    .goods-name {
      color: #333;
      font-size: 14px;
      line-height: 20px;
      max-height: 40px;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .desc-wrap {
      position: relative;
      overflow: hidden;
      padding-left: 14px;
    }

    .sku-str {
      margin: 5px 0;
      height: 20px;
      line-height: 20px;
      font-size: 14px;
      color: #999;
      word-break: keep-all;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .total-price {
      font-size: 14px;
      color: #f00;
      height: 20px;
      line-height: 20px;
      display: inline-block;
    }

    .price-num__sufix {
      font-size: 12px;
    }

    .desc {
      color: #333;
      font-size: 12px;
    }

    .num {
      margin-left: 8px;
      font-size: 14px;
      color: #666;
      line-height: 20px;
    }

    .order-time,
    .buyer {
      line-height: 20px;
      font-size: 13px;
      color: #999;
    }

    .order-time {
      margin: 6px 0;
    }
  }
</style>
