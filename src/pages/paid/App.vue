<template>
  <div id="app">
    <vm-paid-status :orderData="order"></vm-paid-status>
    <vm-action :orderData="order"></vm-action>
  </div>
</template>

<script>
import Args from '@/common/utils/args';
import PaidStatus from './components/paid-status';
import Action from './components/action';

export default {
  components: {
    'vm-paid-status': PaidStatus,
    'vm-action': Action
  },

  data() {
    const orderIds = Args.get('orderIds').split(',');
    const returnedCredits = Args.get('returnedCreditsString');
    const returnedProperty = Args.get('returnedPropertyString');
    const payCredits = Args.get('payCredits');
    const status = Args.get('status').split(',');
    return {
      order: {
        orderIds,
        returnedCredits,
        returnedProperty,
        payCredits,
        status
      }
    };
  }
};
</script>

<style>
</style>
