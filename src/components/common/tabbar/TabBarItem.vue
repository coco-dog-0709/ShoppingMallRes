<template>
  <div class="tabbar-item" @click="itemClick">
    <!-- <img src="../../assets/images/tabbar/home.svg" alt="" />
    <div class="item-text">首页</div> -->
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-active-icon"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: "red",
    },
  },
  data() {
    return {
      // isActive: true,
    };
  },
  computed: {
    isActive() {
      return this.$route.path == this.path;
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {};
    },
  },
  methods: {
    itemClick() {
      this.$router.replace(this.path).catch((err) => err);
    },
  },
};
</script>

<style>
.tabbar-item {
  z-index: 9;
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
  /* vertical-align: middle; */
}
.tabbar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
}
.item-wenzi {
  margin-top: -3px;
}
</style>