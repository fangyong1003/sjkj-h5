<template>
  <div class="feedback">
    <div class="user">{{mobile.slice(0,3)}}***{{mobile.slice(-4)}}</div>
    <div class="container">
      <textarea v-model="feedback" placeholder="写下您对我们的建议"></textarea>
      <span>{{feedback.length}}/500字</span>
    </div>
    <van-button class="submit" @click="submitFeedback">提交</van-button>
  </div>
</template>
<script>
  import { Button } from 'vant';
  import { goToPage } from '@/common/helpers';
  import YZLocalStorage from '@/common/utils/local_storage';
  import { feedback } from './api';
  import { Toast } from 'vant';

  const { mobile } = JSON.parse(YZLocalStorage.getItem('user'))

  export default {
    name: 'feedback',

    components: {
      'van-button': Button
    },

    computed: {
      // getCount() {
      //   return feedback.length <= 500 ? feedback.length : 500;
      // }
    },

    data() {
      return {
        goToPage,
        mobile,
        feedback: ''
      };
    },

    methods: {
      submitFeedback() {
        if (feedback.length > 500) {
          Toast('提交字数超额，请限制在500字以内');
          return
        }
        feedback(this.feedback).then(data => {
          Toast('提交成功');
          setTimeout(() => {
            goToPage('setting');
          }, 1000)
        });
      }
    }
  };
</script>
<style lang="postcss">
body {
  background-color: #f7f7f7;
}
.user {
  padding: 12px;
  background-color: #fff;
  margin: 12px 0;
}
.container {
  position: relative;
  textarea {
    width: 100%;
    height: 215px;
    box-sizing: border-box;
    padding: 12px 12px 32px 12px;
    font-size: 17px;
    color: #999999;
  }
  span {
    position: absolute;
    right: 12px;
    bottom: 12px;
    font-size: 14px;
    color: #666666;
  }
}
.submit{
  display: block;
  width: 270px;
  margin: 24px auto 0 auto;
  background-image: linear-gradient(-180deg, #F0019E 0%, #FE0533 100%);
  border-radius: 100px;
  font-size: 18px;
  color: #fff;

  &::after {
    border: 0 none;
  }
}
</style>
