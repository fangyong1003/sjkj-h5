<template>
  <div class="recommend">
    <img v-for="nav in list" :src="nav.banner" alt="" />
  </div>
</template>
<script>
  import { getRecommendCategory } from '../api';

  export default {
    name: 'recommend',

    data() {
      return {
        list: []
      };
    },

    components: {
    },

    methods: {
      fetchInfo() {
        getRecommendCategory().then(data => {
          this.list = data;
        });
      }
    },

    created() {
      this.fetchInfo();
    }
  };
</script>
<style lang="postcss">
  .recommend {
    padding: 16px 18px;
    background: #fff;
    > img {
      height: 90px;
      width: 100%;
      margin-bottom: 16px;
    }
  }
</style>
