<template>
  <div class="goods">
    <goods-list-item
      v-for="item in goods"
      :key="item.acm"
      :goodsItem="item"
      class="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem";
export default {
  name: "GoodsList",
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  padding: 10px;
  justify-content: space-around;
}
.item {
  width: 48%;
}
</style>