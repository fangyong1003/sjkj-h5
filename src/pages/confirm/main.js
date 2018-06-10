import Vue from 'vue';
import App from './App';
import api from './api';

api.getAddressList().then((resp) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: h => h(App, {
      props: {
        addressList: resp.addresses
      }
    })
  });
});

