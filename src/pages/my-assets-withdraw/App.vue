<template>
  <div class="my-assets-withdraw">
    <div class="balance">
      <h5>余额</h5>
      <p>{{ balance }}</p>
    </div>
    <div class="my-assets-withdraw_input" style="margin-top: 12px;">
      <van-field
        v-model="withdraw"
        label="¥"
        :placeholder="getPlaceholder"
      />
    </div>
    <van-cell-group  style="margin-top: 12px;">
      <van-cell>
        <img-verify-code
          v-model="imgCode"
        />
      </van-cell>
      <van-cell>
        <login-code
          :phone="phone"
          :img-code="imgCode"
          @input="onVerifyCodeInput"
        />
      </van-cell>
      <van-cell>{{bankName}}(尾号{{bankAccount}})</van-cell>
    </van-cell-group>
    <p class="tip">每笔提现收取手续费为提现金额的{{feeRate * 100}}%</p>
    <jz-button class="action-button-done" @click.prevent.stop.native="goSubmit" >提交申请</jz-button>
  </div>
</template>
<script>
  import { onWithdraw } from './api';
  import Button from '@/components/button';
  import LoginCode from './login-code/index.js';
  import ImgVerifyCode from '@/components/img-verify-code';
  import { Cell, CellGroup, Field, Toast } from 'vant';
  import { goToPage } from '@/common/helpers';
  import cookie from '@/common/utils/cookie';

  export default {
    name: 'my-assets-withdraw',

    components: {
      'van-field': Field,
      'van-cell': Cell,
      'van-cell-group': CellGroup,
      LoginCode,
      'jz-button': Button,
      ImgVerifyCode
    },

    props: {
      balance: String,
      minWithdrawValue: Number,
      bankId: Number,
      feeRate: Number,
      bankName: String,
      bankAccount: String
    },

    computed: {
      getPlaceholder() {
        return `输入金额，最低${this.minWithdrawValue}元`;
      }
    },

    data() {
      return {
        withdraw: '',
        phone: JSON.parse(cookie('user')).mobile || '',
        code: '',
        imgCode: ''
      };
    },

    methods: {
      onVerifyCodeInput(value) {
        this.code = value;
      },

      goSubmit() {
        if (!this.withdraw && +this.withdraw >= +this.minWithdrawValue) {
          Toast('请输入正确提现金额');
          return;
        }
        if (this.code === '') {
          Toast('请输入验证码');
          return;
        }
        onWithdraw({
          money: this.withdraw,
          verifyCode: this.code,
          bankId: this.bankId
        }).then((resp) => {
          // 新用户跳转绑定邀请人
          if (resp.success) {
            Toast('提现申请成功');
            goToPage('my-assets-withdraw-tip');
          } else {
            Toast('提现申请失败');
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
  .my-assets-withdraw {
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
        font-size: 17px;
      }
    }
  }
  .login__code-cell {
    background: none !important;
    padding: 0;
    .van-cell__value {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &::after {
      display: none;
    }
    .login__verify-code {
      position: relative;
      display: inline-block;
      border: 1px solid #0088EE;
      border-radius: 100px;
      width: 90px;
      line-height: 30px;
      font-size: 14px;
      color: #0088EE;
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
