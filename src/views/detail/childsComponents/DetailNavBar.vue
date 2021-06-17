<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/images/common/back.svg" alt="" />
      </div>
      <div slot="center" class="center">
        <span
          v-for="(item, index) in titles"
          :key="index"
          class="titles"
          :class="{ active: index == currentIndex }"
          @click="titleClick(index)"
          >{{ item }}</span
        >
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      this.$router.back();
    },
  },
};
</script>

<style  scoped>
.center {
  display: flex;
}
.titles {
  flex: 1;
  font-size: 13px;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin: 12px;
}
</style>