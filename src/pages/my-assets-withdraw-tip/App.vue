<template>
  <div>
    <img src="./images/success.png"/>
    <h5>提现申请已提交！</h5>
    <p>款项会在2个工作日之内到账</p>
    <p>请耐心等待</p>
  </div>
</template>
<script>
  export default {
    name: 'my-assets-withdraw-tip'
  }
</script>
<style lang="postcss">
  body {
    background-color: #f7f7f7;
    text-align: center;
  }
  img {
    width: 66px;
    height: 65px;
    margin: 40px 0 20px 0;
  }
  h5 {
    font-size: 20px;
    color: #333333;
    line-height: 28px;
    margin-bottom: 9px;
  }
  p {
    font-size: 17px;
    color: #666666;
    line-height: 24px;
  }
</style>
