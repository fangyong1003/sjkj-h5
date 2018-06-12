<template>
  <section class="nav-bar">
    <a v-for="(nav, index) in navs"
      :key="index"
      :href="nav.url"
      :class="['nav-item', { 'nav-itme--active': nav.type === active }]">
      <img :src="nav.type === active ? nav.activeImage : nav.image" class="nav-item__icon" />
      <div>{{nav.text}}</div>
    </a>
  </section>
</template>

<script>
import navs from './config';

export default {
  name: 'nav-bar',

  props: {
    active: String
  },

  data() {
    return {
      navs
    };
  }
};
</script>

<style lang="postcss">
@import 'mixins';

body {
  padding-bottom: 55px;
}

.nav-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 55px;
  opacity:0.8;
  font-size:12px;
  line-height: 23px;
  background: #fff;
  text-align:center;
  &::after {
    @mixin border-retina (top);
  }
}

.nav-item {
  float: left;
  width: 25%;
  text-align: center;
  color:#000;
  margin-top:8px;
  &__icon {
    height: 25px;
    vertical-align: middle;
  }
}
</style>
