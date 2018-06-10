import Vue from 'vue';
import App from './App';
import { getAssets, getWithdraw } from './api';
import { goToPage } from '@/common/helpers';

/* eslint-disable no-new */
const { Promise } = window;
Promise.all([getAssets, getWithdraw]).then(([asset, rule]) => {
  if(!rule.bankId) {
    goToPage('my-assets-tip-bank')
  }
  new Vue({
    el: '#app',
    render: (h) => h(App, {
      props: {
        balance: asset.enabledBalance,
        feeRate: rule.feeRate,
        minWithdrawValue: rule.minWithdrawValue,
        bankId: rule.bankId,
        bankName: rule.bankName,
        bankAccount: rule.bankAccount
      }
    })
  });
});
