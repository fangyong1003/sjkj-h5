<template>
  <div class="my-assets-jzb-balance">
    <div class="balance">
      <h5>您目前可转数额</h5>
      <p>{{ enabledProperty }}</p>
    </div>
    <div class="my-assets-jzb-balance_input" style="margin-top: 12px;">
      <van-field
        v-model="withdraw"
        label="¥"
        placeholder="输入要转余额"
      />
    </div>
    <jz-button class="action-button-done" @click.prevent.stop.native="goSubmit" >确认转换</jz-button>
  </div>
</template>
<script>
  import Button from '@/components/button';
  import { Field, Toast } from 'vant';
  import { goToPage } from '@/common/helpers';
  import { onWithdraw } from './api';

  export default {
    name: 'my-assets-jzb-balance',

    components: {
      'van-field': Field,
      'jz-button': Button
    },

    props: {
      enabledProperty: String
    },

    computed: {
    },

    data() {
      return {
        withdraw: ''
      };
    },

    methods: {

      goSubmit() {
        if (!this.withdraw && +this.withdraw > +this.enabledProperty) {
          Toast('请输入正确提现金额');
          return;
        }
        onWithdraw(this.withdraw).then((resp) => {
          // 新用户跳转绑定邀请人
          if (resp.success) {
            Toast('申请成功');
            goToPage('my-assets-balance');
          } else {
            Toast('申请失败');
          }
        });
      }
    }
  };
</script>
<style lang="postcss">
  body {
    background-color: #f7f7f7;
  }
  .my-assets-jzb-balance {
    .tip {
      padding: 8px 12px;
      line-height: 20px;
      font-size: 14px;
      color: #FF0F0F;
    }
    .balance {
      text-align: center;
      background-color: #fff;
      padding: 33px 0;
      h5 {
        font-size: 17px;
        line-height: 24px;
        color: #333333;
        margin-bottom: 10px;
      }
      p {
        font-size: 36px;
        color: #333333;
        line-height: 42px;
      }
    }
    &_input {
      .van-cell {
        padding: 30px 26px;
      }
      .van-field .van-cell__title {
        width: 70px;
        font-size: 64px;
        color: #333333;
      }
      input {
        color: #999999;
      }
    }
  }
  .action-button-done {
    display: block;
    margin: 40px auto 0 auto;
    width: 270px;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
    border-radius: 100px;
  }
</style>
