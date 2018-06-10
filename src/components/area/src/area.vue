<template>
  <div class="cap-area">
    <van-area
      :area-list="curAreaList"
      :columns-num="columnsNum"
      :value="value"
      @confirm="handleAreaConfirm"
      @cancel="handleAreaCancel">
    </van-area>
  </div>
</template>

<script>
import { Area } from 'vant';
import Api from './api/area';

const levelMap = {
  1: 'province_list',
  2: 'city_list',
  3: 'count_list'
};

export default {
  name: 'cap-area',

  components: {
    [Area.name]: Area
  },

  props: {
    value: {},
    requestAreaList: {
      type: Function,
      default: Api.requestAreaList
    },
    url: {
      type: String,
      default: ''
    },
    /**
     * 省市县显示列数，3-省市县，2-省市，1-省
     */
    columnsNum: {
      type: [String, Number],
      default: 3
    }
  },

  data() {
    return {
      fetchedCode: {},
      curAreaList: {
        province_list: {
        },
        city_list: {
        },
        county_list: {
        }
      }
    };
  },

  watch: {
    value(val) {
      console.log(val);
    }
  },

  created() {
    this.getAreaList();
  },

  methods: {
    getAreaObj(areas) {
      const result = areas.reduce((obj, area) => {
        obj[area.areaCode] = area.areaName;
        return obj;
      }, {});
      return result;
    },

    getAreaList(parentCode = '000000') {
      // 缓存
      if (this.fetchedCode[parentCode]) return;

      this.requestAreaList(this.url, parentCode)
        .then(({ result }) => {
          const updateKey = levelMap[result[0].level];
          this.curAreaList = {
            ...this.curAreaList,
            [updateKey]: {
              ...this.curAreaList[updateKey],
              ...this.getAreaObj(result)
            }
          };
          if (parentCode) this.fetchedCode[parentCode] = true;
        });
    },

    handleAreaConfirm(values) {
      this.$emit('confirm', values);
    },

    handleAreaCancel() {
      this.$emit('cancel');
    }
  }
};
</script>
