<template>
  <div class="my-assets">
    <div class="myast">
      <div class="douzi">{{diamond}}</div>
      <div style="font-size:13px;line-height:20px">食间豆</div>
      <div  style="font-size:12px">（可用于提现）</div>
    </div>
    <div class="btnBox">
        <div class="btnTi" @click="goToPage('my-assets-dou')">提现</div>
    </div>
  <!--<van-cell-group class="my-assets__list" style="margin-bottom: 12px;">
      <van-cell isLink @click="goToPage('my-assets-gold')">
        <img src="./images/gold.png" alt=""/>
        <dl>
          <dt>食间豆<span>（可用于购物）</span></dt>
          <dd>{{diamond}}</dd>
        </dl>
      </van-cell>
    <van-cell isLink @click="goToPage('my-assets-jzb')">
        <img src="./images/jzb.png" alt=""/>
        <dl>
          <dt>食间豆红包<span>（可用于返现）</span></dt>
          <dd>{{jiuzhou}}</dd>
        </dl>
      </van-cell>
      <van-cell isLink @click="goToPage('my-assets-balance')">
        <img src="./images/balance.png" alt=""/>
        <dl>
          <dt>余额<span>（可用于提现）</span></dt>
          <dd>{{remain}}</dd>
        </dl>
      </van-cell>
    </van-cell-group>-->
    <van-cell-group class="my-assets__link">
      <van-cell title="我的团队业绩" isLink @click="goToPage('my-assets-achievement')" />
      <van-cell title="我的团队成员" isLink @click="goToPage('my-assets-members')" />
      <van-cell title="邀请好友" isLink @click="goToPage('my-assets-share')" />
    </van-cell-group>
  </div>
</template>

<script>
import { Cell, CellGroup } from 'vant';
import { goToPage } from '@/common/helpers';

export default {
  name: 'my-assets',

  components: {
    'van-cell': Cell,
    'van-cell-group': CellGroup
  },

  props: {
    diamond: String,
    jiuzhou: String,
    remain: String
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
}
.myast{
  background-image:url(./images/property_bg.png);
  background-size:100%;
  background-repeat:no-repeat;
  padding:40px 15px 35px 15px;
  color:#fff;
  text-align:center;
}
.douzi{
  font-size:31px;
  line-height:44px;
}
.btnBox{
  padding:10px 50px;
  background:#fff;
  margin-bottom:10px;
}
.btnTi{
  width:100%;
  padding:0;
  height:40px;
  text-align:center;
  line-height:40px;
  color:#C4D52F;
  border:1px solid #C4D52F;
  border-radius:5px;
  cursor:pointer;
}
.my-assets {
  &__list {
    .van-cell {
      padding: 12px;
      font-size: 17px;
    }
    img, dl {
      display: inline-block;
      vertical-align: top;
    }
    img {
      width: 30px;
      height: 30px;
    }
    dl {
      margin: 0 0 0 10px;
    }
    dt {
      font-size: 17px;
      color: #333333;
      line-height: 24px;
      span {
        font-size: 14px;
        color: #666666;
        line-height: 20px;
      }
    }
    dd {
      font-size: 30px;
      color: #333333;
      line-height: 42px;
      margin-top: 6px;
      margin-left: 0;
    }
  }
  &__link {
    .van-cell {
      padding: 17px 15px;
      font-size: 17px;
    }
  }
}
</style>
