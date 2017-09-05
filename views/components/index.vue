<template>
  <div id="app">
    <hello></hello>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
