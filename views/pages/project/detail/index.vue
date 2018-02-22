<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button @click="create">新建</el-button>
      </el-col>
    </el-row>
    <el-table class="mt-15"
              :data="list">
      <el-table-column
              prop="name"
              label="名称">
      </el-table-column>
      <el-table-column
              prop="path"
              label="路径">
      </el-table-column>
      <el-table-column
              prop="address"
              label="地址">
      </el-table-column>
    </el-table>
  </div>
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
        let projectId = this.$route.params.id
        Api.get('/api/project/detail', {
          params: {
            projectId
          }
        }).then(res => {
          this.list = res.data || []
        })
      },
      create () {
        let id = this.$route.params.id
        this.$router.push(`/project/create/${id}`)
      }
    },
    computed: {},
    watch: {}
  }
</script>
