<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <main-tab-Bar></main-tab-Bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/maintabbar/MainTabBar";
export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style>
/* @import url("./assets/css/base.css"); */
@import url("./assets/css/base.css");
</style>
