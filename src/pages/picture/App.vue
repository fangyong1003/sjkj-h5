<template>
  <img class="image" :src="src">
</template>


<script>
import Args from '@/common/utils/args';

export default {
  name: 'pic',

  data() {
    return {
      src: Args.get('url')
    };
  },

  created() {
    const name = Args.get('name');
    document.title = name;
  }
};
</script>

<style lang="postcss">

.image {
  width: 100%;
}
</style>
