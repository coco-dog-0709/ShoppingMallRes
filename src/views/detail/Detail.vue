<template>
  <div id="detailPage">
    <detail-nav-bar
      class="detail-navbar"
      @titleClick="titleClick"
      ref="navbar"
    />

    <scroll
      class="conent"
      ref="scroll"
      @goodsListScroll="detailScroll"
      :probeType="3"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <detail-params-info ref="params" :goods-params="goodsParams" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommendInfo" />
    </scroll>
    <detail-bottom-bar @addToShopingCar="addToShopingCar" />

    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailNavBar from "./childsComponents/DetailNavBar";
import DetailSwiper from "./childsComponents/DetailSwiper";
import DetailBaseInfo from "./childsComponents/DetailBaseInfo";
import DetailShopInfo from "./childsComponents/DetailShopInfo";
import DetailGoodsInfo from "./childsComponents/DetailGoodsInfo.vue";
import DetailParamsInfo from "./childsComponents/DetailParamsInfo.vue";
import DetailCommentInfo from "./childsComponents/DetailCommentInfo.vue";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childsComponents/DetailBottomBar";
import BackTop from "components/content/backtop/BackTop";

import Scroll from "components/common/scroll/Scroll";
import { debounce } from "common/utils.js";
import { mapActions } from "vuex";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend,
} from "network/detail.js";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    Scroll,
    DetailBottomBar,
    BackTop,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParams: {},
      commentInfo: {},
      recommendInfo: [],
      navBarItemY: [],
      getNavBarItemY: [],
      positionY: 0,
      isShowBackTop: false,
    };
  },
  created() {
    this.getNavBarItemY = debounce(() => {
      // 点击时获取到各个组件跟元素的offsetTop并添加到数组
      this.navBarItemY = [];
      this.navBarItemY.push(0);
      this.navBarItemY.push(this.$refs.params.$el.offsetTop);
      this.navBarItemY.push(this.$refs.comment.$el.offsetTop);
      this.navBarItemY.push(this.$refs.recommend.$el.offsetTop);
    }, 500);
  },
  activated() {
    this.iid = this.$route.query.iid;

    // 请求详情页数据：
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 获取顶部的轮播图图片
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.goodsParams = new GoodsParams(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.list.length !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 保证第一次进入一个新的详情页都是在顶部
    this.$refs.scroll.scrollTo(0, 0);
    // 请求推荐数据：
    getRecommend().then((res) => {
      // console.log(res);
      this.recommendInfo = res.data.list;
    });
  },
  methods: {
    ...mapActions(["addShopCar"]),
    imageLoad() {
      this.$refs.scroll.refresh();
      this.getNavBarItemY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.navBarItemY[index] + 44, 100);
    },
    detailScroll(position) {
      // console.log(position.y);
      this.positionY = -position.y;
      if (this.positionY < this.navBarItemY[1] - 44) {
        this.$refs.navbar.currentIndex = 0;
      } else if (this.positionY < this.navBarItemY[2] - 44) {
        this.$refs.navbar.currentIndex = 1;
      } else if (this.positionY < this.navBarItemY[3] - 44) {
        this.$refs.navbar.currentIndex = 2;
      } else {
        this.$refs.navbar.currentIndex = 3;
      }
      this.isShowBackTop = Math.abs(position.y) > 800;
    },
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    addToShopingCar() {
      // console.log(11111);
      // 获取购物车需要展示的信息：
      let product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // 将商品添加到购物车：
      // this.$store.commit("addShopCar", product);

      // this.$store.dispatch("addShopCar", product).then((res) => {
      //   console.log(res);
      // });
      // 将addShopCar映射到组件：
      this.addShopCar(product).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped>
#detailPage {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-navbar {
  position: relative;
  background-color: #fff;
  z-index: 10;
}
.conent {
  height: calc(100% - 44px);
}
</style>