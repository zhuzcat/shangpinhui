<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- 当再Register和Login时隐藏 -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    this.$store.dispatch("categoryList");
  },
};
</script>

<style>
</style>
