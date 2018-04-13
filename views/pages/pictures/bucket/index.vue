<template>
  <el-row :gutter="20">
    <el-col class="col-item" :span="6" v-for="(item,index) in list" :key="index">
      <div class="card project" @click="showDetail(item.id)">
        <div class="name">
          {{item.name}}
        </div>
        <div class="path">
          <span class="text-gray">仓库路径：{{item.path}}</span>
        </div>
        <div>
          <span class="text-gray">存储类型：{{item.storageType}}</span>
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
