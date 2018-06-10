<template>
  <div class="my-assets-bank-list">
    <p class="tip">*为了您的资金安全每人只可绑定一张银行卡</p>
    <ul>
      <li>
        <img :src="bankLogo" />
        <div class="ban-info">
          <p>{{bankName}}</p>
          <p>****  ****  ****  {{bankCard.slice(-4)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'my-assets-bank-list',

    components: {
    },

    computed: {
    },

    props: {
      bankCard: String,
      bankName: String,
      bankLogo: String
    }
  };
</script>
<style lang="postcss">
  body {
    background-color: #f7f7f7;
  }
  .my-assets-bank-list {
    .tip {
      padding: 8px 12px;
      line-height: 20px;
      font-size: 14px;
      color: #FF0F0F;
    }
    ul {
      margin: 0;
      padding: 9px 12px;
      color: #fff;
      font-size: 17px;
      line-height: 24px;
      li {
        padding: 24px;
        border-radius: 5px;
        background: #F05F5F;
      }
      img, .ban-info {
        display: inline-block;
        vertical-align: middle;
      }
      img {
        width: 64px;
        height: 64px;
        background: #fff;
        border-radius: 50%;
        border: 1px solid #fff;
        margin-right: 22px;
      }
    }
  }
</style>
