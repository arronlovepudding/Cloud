<template>
  <div id="app">
    <el-header class="header">
      <main-menu></main-menu>
    </el-header>
    <el-container class="container">
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>
<script>
  import MainMenu from 'pages/main-menu'

  export default {
    components: {MainMenu}
  }
</script>
<style lang="scss">
  @import "./assets/style/index.scss";
</style>
