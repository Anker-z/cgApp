   
<template>
  <div style="height:100%;">
    <div v-transfer-dom>
      <loading v-model="isLoading"></loading>
    </div>

    <drawer
      width="200px;"
      :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      :placement="showPlacementValue"
      :drawer-style="{'background-color':'#35495e', width: '200px'}"
    >
      <!-- drawer content -->
      <div slot="drawer"></div>

      <!-- main content -->
      <view-box
        ref="viewBox"
        :body-padding-top="isShowNav ? '46px' : '0'"
        body-padding-bottom="55px"
      >
        <x-header
          v-if="isShowNav"
          slot="header"
          style="width:100%;position:absolute;left:0;top:0;z-index:100;"
          :left-options="leftOptions"
          :right-options="rightOptions"
          :title="title"
          :transition="headerTransition"
          @on-click-more="onClickMore"
        >
          <span slot="overwrite-left" @click="drawerVisibility = !drawerVisibility">
            <x-icon
              type="navicon"
              size="35"
              style="fill:#fff;position:relative;top:-8px;left:-3px;"
            ></x-icon>
          </span>
        </x-header>

        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
        <transition
          @after-enter="$vux.bus && $vux.bus.$emit('vux:after-view-enter')"
          :name="viewTransition"
          :css="!!direction"
        >
          <router-view class="router-view"></router-view>
        </transition>

        <tabbar
          class="vux-demo-tabbar"
          icon-class="vux-center"
          v-show="!isTabbarDemo && isShowBar"
          slot="bottom"
        >
          <tabbar-item :link="{path:'/',replace:true} " selected>
            <span
              class="demo-icon-22 vux-demo-tabbar-icon-home"
              slot="icon"
              style="position:relative;top: -2px;"
            >&#xe8f2;</span>
            <span slot="label">首页</span>
          </tabbar-item>
          <tabbar-item :link="{path:'/classly',replace:true}" :selected="isSelect('/classly')">
            <span class="demo-icon-22" slot="icon">&#xe634;</span>
            <span slot="label">
              <span>分类</span>
            </span>
          </tabbar-item>
          <tabbar-item :link="{path:'/user',replace:true}" :selected="isSelect('/user')">
            <span class="demo-icon-22" slot="icon">&#xe635;</span>
            <span slot="label">
              <span>我的</span>
            </span>
          </tabbar-item>
          <tabbar-item :link="{path:'/setting',replace:true}" :selected="isSelect('/setting')">
            <span class="demo-icon-22" slot="icon">&#xe636;</span>
            <span slot="label">
              <span>设置</span>
            </span>
          </tabbar-item>
        </tabbar>
      </view-box>
    </drawer>
  </div>
</template>

<script>
import {
  Radio,
  Group,
  Cell,
  Badge,
  Drawer,
  Actionsheet,
  ButtonTab,
  ButtonTabItem,
  ViewBox,
  XHeader,
  Tabbar,
  TabbarItem,
  Loading,
  TransferDom
} from "vux";

import store from "./store";
import { mapState, mapActions } from "vuex";
import router from "./router";
export default {
  directives: {
    TransferDom
  },
  components: {
    Radio,
    Group,
    Cell,
    Badge,
    Drawer,
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    Actionsheet
  },
  methods: {
    isSelect(path) {
      return path == this.path;
    },
    onShowModeChange(val) {
      /** hide drawer before changing showMode **/
      this.drawerVisibility = false;
      setTimeout(one => {
        this.showModeValue = val;
      }, 400);
    },
    onPlacementChange(val) {
      /** hide drawer before changing position **/
      this.drawerVisibility = false;
      setTimeout(one => {
        this.showPlacementValue = val;
      }, 400);
    },
    onClickMore() {
      this.showMenu = true;
    },
    changeLocale(locale) {
      this.$i18n.set(locale);
      this.$locale.set(locale);
    },
    ...mapActions(["updateDemoPosition"])
  },
  mounted() {
    this.handler = () => {
      //   if (this.path === "/demo") {
      //     this.box = document.querySelector("#demo_list_box");
      //     this.updateDemoPosition(this.box.scrollTop);
      //   }
    };
  },
  beforeDestroy() {
    this.box && this.box.removeEventListener("scroll", this.handler, false);
  },
  watch: {
    path(path) {
      console.log(path);
      if (path === "/") {
        this.$router.replace("/home");
        return;
      } else {
        this.$router.replace("/" + path);
        return;
      }
    },
    $route(to, from) {
      this.thisRoute = to;
      this.direction = store.state.direction;
      if (this.direction === "forward") {
        //this.headerTransition = "slide-left";
        this.viewTransition = "vux-pop-in";
      } else {
        //this.headerTransition = "slide-right";
        this.viewTransition = "vux-pop-out";
      }
    }
  },
  computed: {
    isShowBar() {
      if (this.entryUrl.indexOf("hide-tab-bar") > -1) {
        return false;
      }
      return true;
    },
    isShowNav() {
      if (this.entryUrl.indexOf("hide-nav") > -1) {
        return false;
      }
      return true;
    },
    leftOptions() {
      return {
        // showBack: this.route.path !== "/"
      };
    },
    rightOptions() {
      return {
        showMore: true
      };
    },
    // headerTransition() {
    //   if (!this.direction) return "";
    //   return this.direction === "forward"
    //     ? "vux-header-fade-in-right"
    //     : "vux-header-fade-in-left";
    // },

    isTabbarDemo() {
      //return /tabbar/.test(this.route.path);
    },
    title() {
      //console.log(name);
      return this.$route.name;
    }
    // viewTransition() {
    //   // if (!this.direction) return "";
    //   console.log(this.direction);
    //   return "vux-pop-" + (this.direction === "forward" ? "in" : "out");
    //   //return "vux-pop-out";
    // }
  },
  data() {
    return {
      entryUrl: document.location.href,
      showMenu: false,
      drawerVisibility: false,
      showMode: "push",
      showModeValue: "push",
      showPlacement: "left",
      showPlacementValue: "left",

      //thisRoute: $route.path,
      path: this.$route.path,
      //deviceready: store.state.app.deviceready,
      demoTop: store.state.demoScrollTop,
      isLoading: store.state.isLoading,
      direction: "",

      viewTransition: "vux-pop-in",
      headerTransition: "vux-header-fade-in-right"
    };
  }
};
</script>

<style lang="less">
@import "~vux/src/styles/reset.less";
@import "~vux/src/styles/1px.less";
@import "~vux/src/styles/tap.less";
body {
  background-color: #fbf9fe;
}
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.demo-icon-22 {
  font-family: "vux-demo";
  font-size: 22px;
  color: #888;
}
.weui-tabbar.vux-demo-tabbar {
  /** backdrop-filter: blur(10px);
  background-color: none;
  background: rgba(247, 247, 250, 0.5);**/
}
.vux-demo-tabbar .weui-bar__item_on .demo-icon-22 {
  color: #f70968;
}
.vux-demo-tabbar
  .weui-tabbar_item.weui-bar__item_on
  .vux-demo-tabbar-icon-home {
  color: rgb(53, 73, 94);
}
.demo-icon-22:before {
  content: attr(icon);
}
.vux-demo-tabbar-component {
  background-color: #f70968;
  color: #fff;
  border-radius: 7px;
  padding: 0 4px;
  line-height: 14px;
}
.weui-tabbar__icon + .weui-tabbar__label {
  margin-top: 0 !important;
}
.vux-demo-header-box {
  z-index: 100;
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
}
@font-face {
  font-family: "vux-demo"; /* project id 70323 */
  src: url("//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot");
  src: url("//at.alicdn.com/t/font_70323_wlronpvr565yiudi.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_70323_wlronpvr565yiudi.woff") format("woff"),
    url("//at.alicdn.com/t/font_70323_wlronpvr565yiudi.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_70323_wlronpvr565yiudi.svg#iconfont")
      format("svg");
}
.demo-icon {
  font-family: "vux-demo";
  font-size: 20px;
  color: #04be02;
}
.demo-icon-big {
  font-size: 28px;
}
.demo-icon:before {
  content: attr(icon);
}
.router-view {
  width: 100%;
  top: 46px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 300ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
