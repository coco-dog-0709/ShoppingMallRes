<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabitemclick="tabitemclick"
      ref="tabControl1"
      class="hide-tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      @goodsListScroll="goodsListScroll"
      @pullUp="pullUpMore"
      :probeType="3"
      :PullUpLoad="true"
    >
      <home-swiper :banner="banner" @homeSwiperImgLoad="homeSwiperImgLoad" />
      <home-recommend :recommend="recommend" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabitemclick="tabitemclick"
        ref="tabControl2"
      />
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
// 导入home下的子组件：
import HomeSwiper from "./childcomponents/HomeSwiper";
import HomeRecommend from "./childcomponents/HomeRecommend";
import FeatureView from "./childcomponents/FeatureView";

// 导入components里的组件
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from "components/content/backtop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils.js";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: true,
      tabOffsetTop: 0,
      isImgLoaded: false,
      isTabFixed: false,
    };
  },
  // 组件注册完就请求数据
  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    // 监听图片加载完成
  },
  mounted() {
    const scrollFresh = this.$refs.scroll && this.$refs.scroll.refresh;
    // 防抖：
    const refresh = debounce(scrollFresh, 1000);
    this.$bus.$on("imageLoad", () => {
      // this.$refs.scroll && this.$refs.scroll.refresh();
      refresh();
      // console.log("home刷新了");
    });
  },
  activated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    // 网络请求相关：
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      let page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
    // 事件监听相关
    tabitemclick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 保持两个组件实例点击状态同步
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 300); //this.$refs.scroll拿到组件scroll
    },
    goodsListScroll(position) {
      // console.log(position.y);
      // 大于800显示返回顶部组件
      this.isShowBackTop = Math.abs(position.y) > 800;
      this.isTabFixed = Math.abs(position.y) > this.tabOffsetTop;
    },
    pullUpMore() {
      // console.log("上拉加载更多");
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
    // 轮播图加载完不需要执行四次，只要一次就可以
    homeSwiperImgLoad() {
      if (!this.isImgLoaded) {
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        this.isImgLoaded = true;
      }
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
}
.home-nav {
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}

.content {
  height: 100vh;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  /* overflow: hidden; */
}
.hide-tab-control {
  position: relative;
  z-index: 9;
}
</style>