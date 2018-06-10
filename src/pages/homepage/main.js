import Vue from 'vue';
import { Lazyload } from 'vant';
import App from './App';
import { getExhibition, getSwiperBanner } from './api';

Vue.use(Lazyload);

window.Promise.all([
  getExhibition({ type: 1 }),
  getSwiperBanner()
]).then(([exhibitions, banners]) => {
  console.log(exhibitions, banners)
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render: (h) => h(App, {
      props: {
        homeData: exhibitions.result,
        homeBanner: banners.banners
      }
    })
  });
});
