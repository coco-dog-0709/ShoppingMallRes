<template>
  <div class="car-list">
    <scroll class="content" ref="scroll">
      <shop-car-list-item
        v-for="(item, index) in shopCarList"
        :key="index"
        :productInfo="item"
      />
    </scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "components/common/scroll/Scroll";
import ShopCarListItem from "./ShopCarLIstItem";

export default {
  name: "ShopCarList",
  components: {
    Scroll,
    ShopCarListItem,
  },
  computed: {
    ...mapGetters(["shopCarList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>

<style scoped>
.car-list {
  height: calc(100% - 44px - 49px);
}
.content {
  height: 100%;

  /* position: absolute;
  top: 44px;
  bottom: 49px; */
}
</style>