<template>
  <div class="my-assets-add-bank">
    <p class="tip">*姓名与银行卡号必须匹配，否则无法提现</p>
    <van-cell-group>
      <van-field
        v-model="username"
        label="姓名"
        placeholder="请输入姓名"
      />
      <van-field
        v-model="identity"
        label="身份证"
        placeholder="请输入身份证号"
      />
       <van-field
        v-model="bank"
        label="银行"
        readonly
        placeholder="请选择银行卡"
        @click="showBankSelect"
      />
      <van-field
        v-model="bankNum"
        label="卡号"
        placeholder="请输入银行卡号"
      />
    </van-cell-group>
    <jz-button class="action-button-done" @click.prevent.stop.native="goSubmit" >完成</jz-button>
    <van-popup v-model="show" position="bottom">
      <van-picker
        value-key="bankName"
        :columns="columns"
        @change="onBankChange"
      />
    </van-popup>
    <van-dialog
      v-model="showDialog"
      confirm-button-text="好的"
      @confirm="goToPage('my-assets-bank-list')"
    >
      <div class="my-assets-add-bank_success">添加成功</div>
    </van-dialog>
  </div>
</template>
<script>
  import Button from '@/components/button';
  import { Cell, CellGroup, Field, Popup, Picker, Toast } from 'vant';
  import { validateID } from '@/common/utils/validate';
  import { goToPage } from '@/common/helpers';
  import { addBank } from './api';

  export default {
    name: 'my-assets-add-bank',

    components: {
      'jz-button': Button,
      'van-field': Field,
      'van-picker': Picker,
      'van-cell': Cell,
      'van-cell-group': CellGroup,
      'van-popup': Popup
    },

    props: {
      columns: Array
    },

    computed: {
    },

    data() {
      return {
        goToPage,
        show: false,
        showDialog: false,
        username: '',
        identity: '',
        bank: '',
        bankCategory: '',
        bankNum: ''
      };
    },

    methods: {
      showBankSelect() {
        this.show = true;
      },
      onBankChange(picker, value, index) {
        const { bankCode, bankName } = value;
        this.bankCategory = bankCode;
        this.bank = bankName;
      },
      goSubmit() {
        if (this.username === '') {
          Toast('请输入用户名');
          return;
        }
        if (!validateID(this.identity)) {
          Toast('请输入正确的身份证号');
          return;
        }
        if (this.bankCategory === '') {
          Toast('请选择银行卡');
          return;
        }
        if (this.bankNum === '') {
          Toast('请输入银行卡号');
          return;
        }
        addBank({
          bankCategory: this.bankCategory,
          bank: this.bank,
          bankNum: this.bankNum,
          username: this.username,
          identity: this.identity
        }).then((resp) => {
          const { success } = resp;
          // 添加成功
          if (success) {
            goToPage('my-assets-withdraw')
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
  .my-assets {
    &-add-bank {
      .tip {
        padding: 8px 12px;
        line-height: 20px;
        font-size: 14px;
        color: #FF0F0F;
      }
      &_success {
        padding: 110px 0 22px 0;
        background-repeat: no-repeat;
        background-position: center 22px;
        background-size: 66px 65px;
        background-image: url('./images/success.png');
        font-size: 17px;
        line-height: 24px;
        text-align: center;
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
    background: #342C2A;
    border-radius: 100px;
  }
  .van-dialog__confirm, .van-dialog__confirm:active {
    color: #333333;
  }
</style>
