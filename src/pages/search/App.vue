<template>
  <div class="search">
      <div class="search-nav" :class="{'android': !isAndroid}">
        <van-icon name="arrow-left"/>
        <van-search
          placeholder="搜一下就出来了"
          v-model="search"
          show-action
          @blur="onBlur"
          @keyup.enter="onSearch"
        >
          <div v-if="isAndroid" slot="action" @click="onSearch">搜索</div>
          <div v-else slot="action" @click="onCancel">取消</div>
        </van-search>
      </div>
      <div class="search-history" :class="{'hide': isHotSearch}" v-if="history.length">
        <div class="title"><span>历史记录</span><van-icon name="delete" @click="clearCookie"/></div>
        <ul>
          <li v-for="(item, index) in history" @click="onSearchWord(item)">
            {{item}}
          </li>
        </ul>
      </div>
      <div class="search-hot" :class="{'hide': isHotSearch}" v-if="hotHistory.length">
        <div class="title"><span>热门</span></div>
        <ul>
          <li v-for="(item, index) in hotHistory" :class="{'active': activeHot === index}"  @click="onSearchWord(item.keyword, index)">
            {{item.keyword}}
          </li>
        </ul>
      </div>
      <div class="search-hot-enmpty" v-if="isHotSearch">
        <div class="bg"></div>
        <p>抱歉，未找到您寻找的商品～</p>
        <div class="title">
          <span class="right"></span>推荐好物<span class="left"></span>
        </div>
      </div>
      <goods-list
        :layout="2"
        :list="goodsList"
        showOrigin
        showTags
        v-waterfall-lower="fetchGoods"
        :waterfall-disabled="waterfallDisabled"
      />
  </div>
</template>
<script>
import { Icon, Search, Toast, Waterfall, Loading } from "vant";
import UA from '@/common/utils/ua_browser';
import cookie from '@/common/utils/cookie';
import GoodsList from '@/components/goods-list';
import { getCategory } from './api';

export default {
  name: "search",

  props: {
    hotHistory: Array
  },

  components: {
    "van-icon": Icon,
    "van-search": Search,
    'goods-list': GoodsList,
    [Loading.name]: Loading
  },

  computed: {
    waterfallDisabled() {
      return this.status === 'finished' || this.status === 'loading';
    }
  },

  directives: {
    WaterfallLower: Waterfall('upper')
  },

  data() {
    return {
      search: '',
      isAndroid: UA.isAndroid(),
      history: [],
      activeHot: -1,
      goodsList: [],
      status: 'empty',
      pageNo: 1,
      isHotSearch: false
    };
  },

  methods: {
    onSearch() {
      console.log('搜索==》');
      this.status = 'empty';
      this.pageNo = 1;
      this.isHotSearch = false;
      this.goodsList = [];
      this.search = this.search.replace(/(^\s*)|(\s*$)/, '');
      if (this.search === '') return;
      console.log('搜索==>', this.search);
      let history = cookie('search-history');
      let setCookie = history !== '' ? JSON.parse(history) : [];
      if (setCookie.indexOf(this.search) !== -1) return;
      setCookie.unshift(this.search);
      this.history = setCookie;
      this.fetchGoods();
      // 设置cookie
      cookie('search-history', {
        value: JSON.stringify(setCookie),
        expires: 1
      });
    },
    getHistorySearch() {
      if (cookie('search-history') !== '') {
        this.history = JSON.parse(cookie('search-history'));
      };
    },
    onCancel() {
      this.search = '';
      this.onSearchWord('');
    },
    clearCookie() {
      this.history = [];
      cookie('search-history', {expires: -1});
    },
    onSearchWord(key, index) {
      console.log('搜索关键字==》')
      this.isHotSearch = false;
      if (index !== undefined) {
        this.activeHot = index;
      };
      this.search = key;
      this.status = 'empty';
      this.pageNo = 1;
      this.goodsList = [];
      this.fetchGoods();
    },
    onBlur() {
      // console.log('清空')
      if (!this.search.length) {
        this.onSearchWord('');
      };
    },
    fetchGoods() {
      // console.log('this.waterfallDisabled', this.waterfallDisabled)
      if (this.status === 'loading' || this.status === 'finished' || this.waterfallDisabled) {
        return;
      }
      this.status = 'loading';
      getCategory({
        pageNo: this.pageNo,
        titlePart: this.search
      }).then((res) => {
        const { data, total } = res.result;
        console.log('res ===>', res)
        if (total === 0 && this.search) {
          // 如果搜索不到需要的就直接搜  “推荐好物”
          this.isHotSearch = true;
          this.search = '';
          this.status = 'empty';
          this.pageNo = 1;
          this.goodsList = [];
          this.fetchGoods();
          return;
        }
        if (data.length + this.goodsList.length >= total) {
          this.status = 'finished';
        } else {
          this.status = '';
          this.pageNo++;
        }
        this.goodsList = this.goodsList.concat(data);
      }).catch(err => {
        console.log('err', err)
        Toast(err);
        this.status = '';
      });
    }
  },

  created() {
    this.getHistorySearch()
  }
};
</script>
<style lang="postcss">
@import 'mixins';
body {
  background-color: #f7f7f7;
}
.search {
  &-nav {
    height: 42px;
    position: relative;
    -webkit-user-select: none;
    user-select: none;
    line-height: 42px;
    background-color: #fff;
    &.android {
      .van-icon-arrow-left {
        display: none;
      }
      .van-search {
        width: 100%;
        padding: 4px 0px 4px 20px;
      }
    }
    &::after {
      @mixin border-retina (bottom);
    }
  }
  .van-search {
    padding: 4px 0px 4px 22px;
    width: 346px;
    float: right;
    background-color: transparent !important;
  }
  .van-icon-arrow-left {
    padding-left: 13px;
  }
  .van-search__action {
    padding: 0px 20px 0px 11px;
  }
  .van-search__input-wrap {
    background: #F2F2F2;
    border-radius: 30px;
    border: 0;
  }
  .van-search__input {
    background: #F2F2F2;
  }
  &-history, &-hot {
    background-color: #fff;
    padding: 20px 0;
    position: relative;
    &.hide {
      display: none;
    }
    &::after {
      @mixin border-retina (bottom);
    }
    .title {
      line-height: 24px;
      font-size: 17px;
      color: #333333;
      display: flex;
      justify-content: space-between;
      padding-right: 20px;
      padding-bottom: 4px;
      align-content: center;
      span {
        padding-left: 12px;
        position: relative;
        &:before {
          content: '';
          display: block;
          width: 4px;
          height: 12px;
          background: #EE4F4F;
          position: absolute;
          top: 6px;
          left: 0;
        }
      }
    }
    ul {
      padding: 0 12px;
      @mixin clearfix;
    }
    li {
      float: left;
      margin: 12px 12px 0 0;
      padding: 3px 15px;
      border: 1px solid #979797;
      border-radius: 21px;
      font-size: 14px;
      color: #333333;
      line-height: 20px;
    }
  }
  &-hot {
    li {
      &.active {
        border: 1px solid #EE4F4F;
        color: #EE4F4F;
      }
    }
  }
  &-hot-enmpty {
    .bg {
      height: 157px;
      background-image: url('./images/search.png');
      background-position: center;
      background-size: 120px 115px;
      background-repeat: no-repeat;
    }
    p {
      text-align: center;
      font-size: 17px;
      color: #333333;
      letter-spacing: 0.68px;
      line-height: 24px;
    }
    .title {
      padding-top: 30px;
      text-align: center;
      color: #FF3132;
      letter-spacing: 1.4px;
      line-height: 18px;
      font-size: 18px;
      margin-bottom: 30px;
      span {
        vertical-align: middle;
        display: inline-block;
        width: 40px;
        height: 2px;
        &.left {
          background-image: linear-gradient(-90deg, rgba(255,255,255,0.00) 0%, #FF0000 97%);
        }
        &.right {
          background-image: linear-gradient(-270deg, rgba(255,255,255,0.00) 3%, #FF0000 100%);
        }
      }
    }
  }
}
</style>
