<template>
  <div class="my-assets-jzb-balance">
    <div class="withTitle">提现金额</div>
    <div class="my-assets-jzb-balance_input" >

      <div class="van-cell van-field van-hairline">
          <div class="van-cell__title">
            <img src="./images/yuanbao.png" style="width:20px">
          </div>
          <div class="van-cell__value">
              <input type="text" v-model="withdraw" class="van-field__control">
          </div>
        </div>
    </div>
    <div class="balance">
      <span>可提现{{amount}}</span>
      <span class="allIn" @click="allWitch">全部提现</span>
    </div>
    <jz-button class="action-button-done" @click.prevent.stop.native="goSubmit" >预计几小时到账，确认提现</jz-button>
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
      amount: String
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
        if (!this.withdraw && +this.withdraw > +this.amount) {
          Toast('请输入正确提现金额');
          return;
        }
        onWithdraw(this.withdraw).then((resp) => {
          // 新用户跳转绑定邀请人
          if (resp.success) {
            Toast('申请成功');
            goToPage('my-assets');
          } else {
            Toast('申请失败');
          }
        });
      },
      allWitch(){
          this.withdraw = this.amount;
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
    &_input {
      .van-cell {
        padding: 10px 15px;
        border-bottom:1px solid #e5e5e5;
      }
      .van-field .van-cell__title {
        width: 30px;
        font-size: 16px;
        float:left;
        margin-top:22px;
        color: #C4D52F;
      }
      input {
        font-size:35px;
        margin-top:10px;
        height:40px;
        line-height:40px;
        color: #999999;
        caret-color:#C4D52F;
      }
    }
  }
  .action-button-done {
    display: block;
    margin-top: 40px;
    width: 90%;
    margin-left:5%;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background: #333;
    border-radius: 5px;
  }
  .balance{
    padding : 0 15px;
    color:#6b6b6b;
    line-height:35px;
    background:#fff;
  }
  .allIn{
    float:right;
    color: #C4D52F;
  }
  .withTitle{
    line-height: 35px;
    background: #fff;
    padding-left:  15px;
    color: #6B6B6B;
  }
</style>
