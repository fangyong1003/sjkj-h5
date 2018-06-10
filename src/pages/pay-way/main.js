import Vue from 'vue';
import App from './App';
import api from './api';

api.payPreview().then(data => {
  new Vue({
    el: '#app',
    render: h => h(App, {
      props: {
        payData: data
      }
    })
  });
});
