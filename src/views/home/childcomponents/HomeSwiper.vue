<template>
  <swiper class="homeSwiper">
    <swiper-item v-for="item in banner" :key="item.acm">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperImgLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/";
export default {
  name: "HomeSwiper",
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    swiperImgLoad() {
      this.$emit("homeSwiperImgLoad");
    },
  },
};
</script>

<style>
</style>