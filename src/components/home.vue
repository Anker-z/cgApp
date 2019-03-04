<template>
  <div class="hello">
    <swiper :list="list" v-model="index" :min-moving-distance="120"></swiper>
  </div>
</template>

<script>
import { Swiper } from "vux";
import { request } from "http";
export default {
  name: "home",
  components: {
    Swiper
  },
  data() {
    return {
      index: 0,
      list: [
        {
          url: "javascript:",
          img: require("@/assets/images/banner1.jpg"),
          title: "送你一朵fua"
        },
        {
          url: "javascript:",
          img: require("@/assets/images/banner2.jpg"),
          title: "送你一次旅行"
        }
      ]
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
