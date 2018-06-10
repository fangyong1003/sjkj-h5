<template>
  <div>
    <goods-list
      :layout="2"
      :list="goodsList"
      :extraArgs="extraArgs"
      :onlyCredit="onlyCredit"
      showOrigin
      showTags
      v-waterfall-lower="fetchGoods"
      :waterfall-disabled="waterfallDisabled"
    />
    <div v-if="!goodsList.length && status === 'finished'"
      class="empty-list"
    >
      暂无商品
    </div>
  </div>
</template>

<script>
import { Toast, Waterfall, Loading } from 'vant';
import GoodsList from '@/components/goods-list';
import Args from '@/common/utils/args';
import api from './api';

export default {
  name: 'group',

  components: {
    'goods-list': GoodsList,
    [Loading.name]: Loading
  },

  props: {
    onlyCredit: {
      type: Boolean,
      default: false
    }
  },

  directives: {
    WaterfallLower: Waterfall('lower')
  },

  data() {
    return {
      goodsList: [],
      status: 'empty',
      type: 'categoryId',
      id: '',
      pageNo: 1
    };
  },

  computed: {
    waterfallDisabled() {
      return this.status === 'finished' || this.status === 'loading';
    },

    extraArgs() {
      let args = {};
      if (this.type === 'exhibitionId') {
        args = {
          [this.type]: this.id
        };
      }

      return args;
    }
  },

  methods: {
    fetchGoods() {
      if (this.status === 'loading' || this.status === 'finished' || this.waterfallDisabled) {
        return;
      }

      this.status = 'loading';

      api.getGroups({
        pageNo: this.pageNo,
        type: this.type,
        id: this.id
      }).then((res) => {
        const { data, total } = res.result;
        if (data.length + this.goodsList.length >= total) {
          this.status = 'finished';
        } else {
          this.status = '';
          this.pageNo++;
        }
        this.goodsList = this.goodsList.concat(data);
      }).catch(err => {
        Toast(err);
        this.status = '';
      });
    }
  },

  created() {
    this.type = Args.get('type');
    this.id = Args.get('id');

    if (this.type === 'exhibitionId') {
      document.title = '活动商品';
    }
    if (this.onlyCredit) {
      document.title = '点石金专场';
    }
    this.fetchGoods();
  }
};
</script>

<style lang="postcss">
body {
  background-color: #f7f7f7;
}

.goods-list {
  padding: 0 2px;
}

.empty-list {
  padding: 20px;
  font-size: 17px;
  text-align: center;
}

</style>
