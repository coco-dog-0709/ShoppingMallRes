<template>
  <div class="count-bar">
    <div class="count-left">
      <check-button
        class="check-bt"
        :isActive="isAllChecked"
        @click.native="allCheckedClick"
      />
      <span class="checked">全选</span>
    </div>
    <div class="count-center">合计:{{ totalAll }}</div>
    <div class="count-right">去计算:({{ shopCount }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";

export default {
  name: "ShopCarCountBar",
  components: {
    CheckButton,
  },
  methods: {
    allCheckedClick() {
      if (this.isAllChecked) {
        this.$store.state.shopCarList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.shopCarList.forEach((item) => (item.checked = true));
      }
    },
  },
  computed: {
    totalAll() {
      this.$store.state.shopCarList;
      return (
        "￥" +
        this.$store.state.shopCarList
          .filter((item) => {
            return item.checked;
          })
          .reduce((pre, item) => {
            return pre + item.count * item.price;
          }, 0)
          .toFixed(2)
      );
    },
    shopCount() {
      return this.$store.state.shopCarList.filter((item) => item.checked)
        .length;
    },
    isAllChecked() {
      if (this.$store.state.shopCarList.length === 0) {
        return false;
      }
      // return this.$store.state.shopCarList.every((item) => item.checked);
      for (let item of this.$store.state.shopCarList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<style scoped>
.count-bar {
  display: flex;
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 40px;
  font-size: 14px;
}
.count-left {
  display: flex;
  width: 70px;
  padding-left: 10px;
}
.check-bt {
  margin-top: 10px;
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.checked {
  margin-top: 11px;
}
.count-center {
  flex: 1;

  text-align: center;
  line-height: 40px;
}
.count-right {
  width: 80px;
  text-align: center;
  line-height: 40px;
  background-color: red;
  color: #fff;
}
</style>