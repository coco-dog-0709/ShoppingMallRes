<template>
  <div class="goods-item" @click="goodsItemClick">
    <img :src="showImage" alt="" @load="imgLoad" />
    <div class="info">
      <p class="title">{{ goodsItem.title }}</p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      this.$bus.$emit("imageLoad");
      // console.log(this.$bus);
    },
    goodsItemClick() {
      this.$router.push({
        path: "/detail", //两种方式   动态路由  和query
        query: {
          iid: this.goodsItem.iid,
        },
      });
    },
  },
  computed: {
    showImage() {
      return this.goodsItem.image || this.goodsItem.show.img; //这里反过来就会报错
    },
  },
};
</script>

<style>
.goods-item {
  padding-bottom: 5px;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.info {
  text-align: center;
}
.info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.info .price {
  color: var(--color-high-text);
}
.info .collect {
  position: relative;
  margin-left: 20px;
}
.info .collect::before {
  z-index: 9;
  content: "";
  position: absolute;
  left: -16px;
  top: 1px;
  width: 50px;
  height: 50px;
  background: url("~assets/images/common/icon-popular.png");
}
</style>