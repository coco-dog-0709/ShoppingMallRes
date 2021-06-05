<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="item"
      :class="{ active: index == currentIndex }"
      @click="tabcontrolClick(index)"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    tabcontrolClick(index) {
      this.currentIndex = index;
      this.$emit("tabitemclick", index);
    },
  },
};
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  background-color: #fff;
  z-index: 1;
}
.tab-control-item {
  flex: 1;
  line-height: 40px;
  height: 40px;
  font-size: 14px;
}
.active span {
  padding: 5px;
  border-bottom: 3px solid var(--color-high-text);
  color: var(--color-high-text);
}
</style>