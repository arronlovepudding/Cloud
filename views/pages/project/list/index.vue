<template>
  <el-row>
    <el-col :span="4">
      <div class="project" @click="showDetail(item.id)" v-for="item in list">
        {{item.name}}
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
        this.$router.push(`/project/detail/${id}`)
      }
    },
    computed: {},
    watch: {}
  }
</script>
