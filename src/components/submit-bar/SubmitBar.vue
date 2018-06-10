<template>
  <div class="van-submit-bar">
    <div class="van-submit-bar__tip" v-show="tip || $slots.tip">
      {{ tip }}<slot name="tip" />
    </div>
    <div class="van-submit-bar__bar">
      <slot />
      <van-button :type="buttonType" :disabled="disabled" :loading="loading" @click="onSubmit">
        {{ loading ? '' : buttonText }}
      </van-button>
    </div>
  </div>
</template>

<script>
import { Button } from 'vant';

export default {
  name: 'submit-bar',

  components: {
    'van-button': Button
  },

  props: {
    tip: String,
    type: Number,
    price: String,
    label: String,
    loading: Boolean,
    disabled: Boolean,
    buttonText: String,
    buttonType: {
      type: String,
      default: 'danger'
    }
  },

  methods: {
    onSubmit() {
      if (!this.disabled && !this.loading) {
        this.$emit('submit');
      }
    }
  }
};
</script>
