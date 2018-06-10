import Vue from 'vue';
import App from './App';
import VueRouter from 'vue-router';
import { BadgeGroup, Badge, Lazyload } from 'vant';
import { getCategoryNav } from './api';

// import Recommend from './components/Recommend.vue';
import CapTaglist from './components/CapTaglist.vue';

const routes = [
  // { path: '/recommend', component: Recommend },
  { path: '/capTaglist/:type', component: CapTaglist },
  { path: '*', component: CapTaglist }
];

const router = new VueRouter({
  mode: 'hash',
  routes
});

Vue.use(VueRouter);
Vue.use(BadgeGroup);
Vue.use(Badge);
Vue.use(Lazyload);

/* eslint-disable no-new */
getCategoryNav().then((data) => {
  const routerNav = data.result.map(item => {
    return {
      name: item.name,
      type: item.id,
      showBanner: item.showBanner,
      banner: item.banner
    };
  });
  // routerNav.unshift({
  //   name: '推荐',
  //   type: 'recommend'
  // });
  new Vue({
    el: '#app',
    router,
    render: (h) => h(App, {
      props: {
        routerNav
      }
    })
  });
});
