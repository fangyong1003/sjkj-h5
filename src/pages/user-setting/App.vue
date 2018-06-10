<template>
  <div class="user-setting">
    <van-nav-bar
      title="个人信息"
      right-text="保存"
      left-arrow
      @click-left="onClickLeft"
      @click-right="goSubmit"
    />
    <van-cell-group>
      <van-cell title="头像" isLink>
        <ImgUploader :maxAmount="1" @upload="upload">
          <template slot="trigger-upload">
            <img :src="avatar" />
          </template>
        </ImgUploader>
      </van-cell>
      <van-cell title="昵称" isLink>
        <van-field
          v-model="nickName"
          placeholder="请输入昵称"
        />
      </van-cell>
      <van-cell title="账号" isLink>
        <van-field
          v-model="account"
          placeholder="请输入账号"
        />
      </van-cell>
      <van-cell title="生日" :value="birthday" isLink @click.prevent.stop.native="selectBir">
      </van-cell>
      <van-cell title="性别" :value="getSex" isLink @click.prevent.stop.native="selectSex">
      </van-cell>
      <van-popup v-model="showBir" position="bottom">
        <van-datetime-picker
          :value="birthday"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @confirm="confirmTime"
        />
      </van-popup>
      <van-popup v-model="showSex" position="bottom">
        <van-picker
          :columns=columns
          @change="onSexChange"
        />
      </van-popup>
    </van-cell-group>
  </div>
</template>
<script>
import { Cell, CellGroup, Field, Popup, Picker, DatetimePicker, Toast } from 'vant';
import ImgUploader from './component/ImgUploader';
import { goToPage } from '@/common/helpers';

export default {
    name: 'my-assets-add-bank',

    components: {
      'van-popup': Popup,
      'van-field': Field,
      'van-picker': Picker,
      'van-cell': Cell,
      'van-cell-group': CellGroup,
      'van-datetime-picker': DatetimePicker,
      ImgUploader
    },

    computed: {
      getSex() {
        return this.sex === 0 ? '男' : '女';
      }
    },

    data() {
      return {
        columns: ['男','女'],
        goToPage,
        showBir: false,
        showSex: false,
        avatar: '',
        nickName: '',
        account: '',
        birthday: '',
        minDate: new Date(1900, 1, 1),
        maxDate: new Date(2100, 12, 12),
        sex: 0
      };
    },

    methods: {
      selectBir() {
        this.showBir = true;
      },
      selectSex() {
        this.showSex = true;
      },
      onSexChange(picker, value, index) {
        this.sex = value === '男' ? 0 : 1;
        this.showSex = false;
      },
      confirmTime(time) {
        const timeDate = new Date(time);
        const timeStr = `${timeDate.getFullYear()}-${timeDate.getMonth() + 1}-${timeDate.getDate()}`;
        this.birthday = timeStr;
        this.showBir = false;
      },
      upload(file) {
        const { attachment_file } = file[0]
        console.log('file ==>', file);
      },
      goSubmit() {
        if (this.nickName === '') {
          Toast('请输入昵称');
          return;
        }
        if (this.account === '') {
          Toast('请输入昵称');
          return;
        }
        if (!this.birthday) {
          Toast('请选择生日');
          return;
        }
        saveUser({
          nick_name: this.nickName,
          head_img_url: this.avatar,
          birthday: this.birthday,
          sex: this.sex,
          account: this.account
        }).then((resp) => {
          const { success } = resp;
          // 添加成功
          if (success) {
            Toast('添加成功');
          }
        });
      },
      onClickLeft() {
        goToPage('user-center');
      }
    }
  };
</script>
<style lang="postcss">
  .van-field {
    padding: 0;
    .van-field__control {
      text-align: right;
    }
  }
</style>
