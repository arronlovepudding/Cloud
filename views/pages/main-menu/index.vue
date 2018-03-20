<template>
  <el-menu :default-active="activeIndex"
           class="main-menu"
           :style="componentsStyle"
           @select="handleSelect"
           background-color="#011529"
           text-color="#fff"
           active-text-color="#1890ff">
    <div class="logo-area">
      <img src="/images/cloud_icon.png">
      <h1>Cloud</h1>
    </div>
    <el-submenu index="1">
      <template slot="title">API</template>
      <el-menu-item index="1-1">浏览</el-menu-item>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title">图库</template>
      <el-menu-item index="3-1">浏览</el-menu-item>
      <el-menu-item index="3-2">新建</el-menu-item>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">用户管理</template>
      <el-menu-item index="2-1">退出</el-menu-item>
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
          '3-1': '/picture',
          '3-2': '/picture/bucket/create'
        }[key]
        this.$router.push(path)
      }
    },
    computed: {},
    watch: {}
  }
</script>
