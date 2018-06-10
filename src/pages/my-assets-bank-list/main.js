import Vue from 'vue';
import App from './App';
import find from 'lodash/find';
import { getBankList, getMyBankList } from './api';
import { goToPage, checkLogin } from '@/common/helpers';

/* eslint-disable no-new */
const { Promise } = window;
if (checkLogin()) {
  Promise.all([getBankList, getMyBankList]).then(([list, my]) => {
    if (!my.banks.length) {
      goToPage('my-assets-tip-bank')
    }
    const { bankCard, bankName, bankCategory } = my.banks && my.banks[0];
    const bankInfo = find(list.banks, item => { return item.bankCode === bankCategory });
    new Vue({
      el: '#app',
      render: (h) => h(App, {
        props: {
          bankCard,
          bankName,
          bankLogo: bankInfo.bankLogo
        }
      })
    });
  });
}