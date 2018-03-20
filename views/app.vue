<template>
  <div id="app" class="main-view">
    <el-container>
      <el-aside width="256px">
        <main-menu></main-menu>
      </el-aside>
      <el-container>
        <el-main class="main-container">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>
      </el-container>
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
