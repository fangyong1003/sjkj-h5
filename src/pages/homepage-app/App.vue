<template>
  <div class="homepage-app">
    <home-content :homeData="homeData" :homeBanner="homeBanner" />
  </div>
</template>


<script>
import HomeContent from '@/components/home-content';

export default {
  name: 'homepage-app',

  components: {
    HomeContent
  },

  props: {
    homeData: Array,
    homeBanner: Array
  }
};
</script>
