<template>
  <div>
    <p>您还未绑定银行卡</p>
    <jz-button class="action-button" @click="goToPage('my-assets-add-bank')">立即绑卡</jz-button>
  </div>
</template>

<script>
  import Button from '@/components/button';
  import { goToPage } from '@/common/helpers';

  export default {
    name: 'assets-tip',

    components: {
      'jz-button': Button
    },

    data() {
      return {
        goToPage
      };
    }
  };
</script>
<style lang="postcss">
  body {
    background-color: #f7f7f7;
    text-align: center;
  }
  p {
    margin: 27px auto 38px auto;
    text-align: center;
  }
  .action-button {
    color: #fff;
    width: 270px;
    height: 40px;
    padding: 8px 18px;
    font-size: 17px;
    line-height: 24px;
    border: 0;
    border-radius: 5px;
    background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
  }
</style>
