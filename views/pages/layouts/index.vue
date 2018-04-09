<template>
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
</template>
<style lang="scss" scoped>
  @import './index.scss';
</style>
<script>
  import MainMenu from 'pages/main-menu'

  export default {
    components: {MainMenu}
  }
</script>
