<template>
  <el-row :gutter="20">
    <el-col class="card-item" :span="6" v-for="(item,index) in list" :key="index">
      <div class="project" @click="showDetail(item.id)">
        <div class="name">
          {{item.name}}({{item.path}})
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
  @import './index.scss';
</style>
<script>
  import Api from '../../../utils/api-tools'

  export default {
    data () {
      return {
        list: []
      }
    },
    components: {},
    created () {
    },
    mounted () {
      this.init()
    },
    beforeDestroy () {
    },
    methods: {
      async init () {
        let res = await Api.get(`/api/picture`)
        this.list = res.data || []
      },
      showDetail (bucketId) {
        this.$router.push(`/picture/${bucketId}`)
      }
    },
    computed: {},
    watch: {}
  }
</script>
