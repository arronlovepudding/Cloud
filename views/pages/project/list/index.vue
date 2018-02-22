<template>
  <el-row :gutter="20">
    <el-col class="card-item" :span="6" v-for="(item,index) in list" :key="index">
      <div class="project" @click="showDetail(item.id)">
        <div class="name">
          {{item.name}}
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
      init () {
        Api.get('/api/project/list').then(res => {
          this.list = res.data || []
        })
      },
      showDetail (id) {
        this.$router.push(`/project/${id}/detail`)
      }
    },
    computed: {},
    watch: {}
  }
</script>
