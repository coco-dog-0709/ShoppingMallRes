<template>
  <div id="app">
    <router-view></router-view>
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
