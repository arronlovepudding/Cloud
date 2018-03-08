<template>
  <el-menu :default-active="activeIndex" class="main-menu" :style="componentsStyle" mode="horizontal"
           @select="handleSelect">
    <span class="logo-area">Cloud</span>
    <el-submenu index="2">
      <template slot="title">用户管理</template>
      <el-menu-item index="2-1">退出</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">图床</template>
      <el-menu-item index="3-1">Bucket</el-menu-item>
    </el-submenu>
    <el-submenu index="1">
      <template slot="title">项目管理</template>
      <el-menu-item index="1-1">项目列表</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<style lang="scss" scoped>
  @import './index.scss';
</style>
<script>
  export default {
    data () {
      return {
        activeIndex: '1-1',
        componentsStyle: {
          'border-bottom': '0'
        }
      }
    },
    components: {},
    created () {
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      handleSelect (key, keyPath) {
        let path = {
          '1-1': '/',
          '2-1': '/login/out',
          '3-1': '/picture'
        }[key]
        this.$router.push(path)
      }
    },
    computed: {},
    watch: {}
  }
</script>
