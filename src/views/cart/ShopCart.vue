<template>
  <div class="shop-car">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <shop-car-list />
    <shop-car-count-bar />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import { mapGetters } from "vuex";
import ShopCarList from "./childComponents/ShopCarList";
import ShopCarCountBar from "./childComponents/ShopCarCountBar.vue";

export default {
  name: "ShopCart",
  components: {
    NavBar,
    ShopCarList,
    ShopCarCountBar,
  },
  computed: {
    // 把getters里面的shopCarListLength映射到计算属性中
    // ...mapGetters(["shopCarListLength"]),
    // 如果想名字取不一样，就可以写成对象形式：
    ...mapGetters({
      length: "shopCarListLength",
    }),
  },
};
</script>

<style>
.nav-bar {
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 99;
}
.shop-car {
  height: 100vh;
  overflow: hidden;
}
</style>