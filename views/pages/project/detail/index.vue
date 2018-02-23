<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-button @click="create" type="primary">新建</el-button>
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
              label="请求数量">
        <template slot-scope="scope">
          <span>{{scope.row.pvCount}}</span>
          <p class="pv-datetime">{{scope.row.pvDatetime}}</p>
        </template>
      </el-table-column>
      <el-table-column
              label="地址">
        <template slot-scope="scope">
          <el-button class="clip-btn" type="text"
                     :data-clipboard-text="scope.row.address">复制
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
              prop="create_at"
              label="日期"
              width="120">
      </el-table-column>
      <el-table-column
              label="操作"
              width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="update(scope.row.id)">update</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="scss" scoped>
  @import './index.scss';
</style>
<script>
  import Api from '../../../utils/api-tools'
  import Clipboard from 'clipboard'

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
      new Clipboard('.clip-btn').on('success', () => {
        this.$message.success('复制成功')
      })
      this.init()
    },
    beforeDestroy () {
    },
    methods: {
      init () {
        let projectId = this.$route.params.projectId
        Api.get(`/api/project/${projectId}`).then(res => {
          this.list = res.data || []
        })
      },
      create () {
        let projectId = this.$route.params.projectId
        this.$router.push(`/project/${projectId}/create`)
      },
      update (id) {
        let projectId = this.$route.params.projectId
        this.$router.push(`/project/${projectId}/update/${id}`)
      }
    },
    computed: {},
    watch: {}
  }
</script>
