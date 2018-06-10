<template>
  <div class="action-buttons">
    <slot>
      <template v-for="btn in actionBtns">
        <jz-button v-if="btn == 'topay'" size="small" type="primary" class="action-button" @click.prevent.stop="onBtnClick('topay')">付款{{ ' ' + countdownText }}</jz-button>
        <jz-button v-if="btn == 'transport'" size="small" class="action-button" @click.prevent.stop="onBtnClick('transport')">物流追踪</jz-button>
        <jz-button v-if="btn == 'remind'" size="small" type="primary" class="action-button" @click.prevent.stop="onBtnClick('remind')">提醒发货</jz-button>
        <jz-button v-if="btn == 'delete'" size="small" class="action-button" @click.prevent.stop="onBtnClick('delete')">删除订单</jz-button>
        <jz-button v-if="btn == 'confirm'" size="small" class="action-button" @click.prevent.stop="onBtnClick('confirm')">确认收货</jz-button>
        <jz-button v-if="btn == 'cancel'" size="small" class="action-button" @click.prevent.stop="onBtnClick('cancel')">取消订单</jz-button>
      </template>
    </slot>
  </div>
</template>

<script>
import Button from '@/components/button';
export default {
  name: 'cap-order-list-btns',

  components: {
    'jz-button': Button
  },

  props: {
    actionBtns: {
      type: Array,
      default() {
        return [];
      },
      validator(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
      }
    },
    expiredSeconds: Number
  },

  data() {
    return {
      countdown: this.expiredSeconds,
      countdownText: ''
    };
  },

  methods: {
    onBtnClick(type) {
      this.$emit('click', type);
    },

    getCountdown() {
      if (this.countdown === 0) {
        this.countdownText = this.getCountdownText(0);
        this.$emit('timeout');
        return;
      } else {
        this.countdownText = this.getCountdownText(this.countdown);
        this.countdown -= 1;
      }

      setTimeout(this.getCountdown, 1000);
    },

    getCountdownText(time) {
      const seconds = time % 60;
      const minutes = Math.floor(time / 60);
      return this.pad(minutes) + ':' + this.pad(seconds);
    },

    pad: function pad(number) {
      return number < 10 ? '0' + number : '' + number;
    }
  },

  created() {
    if (this.countdown) {
      this.getCountdown();
    }
  }
};
</script>

<style lang="postcss">
.cap-order-item {
  .action-buttons {
    padding: 10px 15px;
    text-align: right;
  }

  .action-button {
    min-width: 78px;
  }

  .action-button + .action-button {
    margin-left: 5px;
  }
}
</style>
