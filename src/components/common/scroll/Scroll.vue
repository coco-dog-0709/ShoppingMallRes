<template>
  <div ref="wrapper">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import Pullup from "@better-scroll/pull-up";
BScroll.use(ObserveDOM);
BScroll.use(Pullup);
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    PullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.PullUpLoad,
    });
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("goodsListScroll", position);
    });
    if (this.PullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullUp");
      });
    }
  },
  methods: {
    scrollTo(x, y, time) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>