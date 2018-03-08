<template>
  <div>
    <input type="file" @change="handleChange">
    <el-table class="mt-15"
              :data="list">
      <el-table-column
              type="index"
              width="50">
      </el-table-column>
      <el-table-column
              label="缩略"
              width="120">
        <template slot-scope="scope">
          <a :href="scope.row.absUrl" target="_blank">
            <img :src="scope.row.thumUrl" alt="">
          </a>
        </template>
      </el-table-column>
      <el-table-column
              prop="name"
              label="名称">
      </el-table-column>
      <el-table-column
              prop="expand"
              label="类型">
      </el-table-column>
      <el-table-column
              prop="createTime"
              label="时间"
              width="180">
      </el-table-column>
      <el-table-column
              label="路径"
              width="100">
        <template slot-scope="scope">
          <el-button class="clip-btn" type="text"
                     :data-clipboard-text="scope.row.absUrl">复制
          </el-button>
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
  import * as qiniu from 'qiniu-js'
  import Clipboard from 'clipboard'

  export default {
    data () {
      return {
        bucketId: null,
        list: []
      }
    },
    components: {},
    created () {
      this.bucketId = this.$route.params.bucketId
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
      async init () {
        if (this.bucketId === null) return
        let res = await Api.get(`/api/picture/${this.bucketId}`)
        this.list = res.data || []
      },
      async handleChange (event) {
        const files = event.target.files
        if (!files) return
        let file = files[0]
        let res = await Api.get(`/api/picture/${this.bucketId}/token`)
        let token = res.data
        let pictureObj = {
          name: file.name,
          size: file.size,
          expand: file.type
        }
        let observable = qiniu.upload(file, null, token)
        observable.subscribe(next => {
          console.log(next)
        }, error => {
          console.log(error)
        }, complete => {
          pictureObj.resUrl = complete.key
          pictureObj.hash = complete.hash
          Api.post(`/api/picture/${this.bucketId}`, pictureObj).then(res => {
            let data = res.data
            if (data.uploadedUrl) {
              this.$message.warning(`文件存在：${data.uploadedUrl}`)
              return
            }
            this.list.unshift(data)
          })
        })
      }
    },
    computed: {},
    watch: {}
  }
</script>
