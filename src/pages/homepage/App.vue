<template>
  <div class="homepage">
    <top-bar :diamond="diamond" />
    <home-content :homeData="homeData" :homeBanner="homeBanner" />
    <nav-bar active="home"></nav-bar>
  </div>
</template>

<script>
import TopBar from '@/components/top-bar';
import HomeContent from '@/components/home-content';
import NavBar from '@/components/nav-bar';
import { getAssets } from '../my-assets/api';

export default {
  name: 'homepage',

  components: {
    TopBar,
    HomeContent,
    NavBar
  },

  props: {
    homeData: Array,
    homeBanner: Array
  },

  data() {
    return {
      diamond: 0
    };
  },

  created() {
    getAssets().then(data => {
      this.diamond = data.totalCredit;
    })
  }
};
</script>

<style lang="postcss">

</style>
