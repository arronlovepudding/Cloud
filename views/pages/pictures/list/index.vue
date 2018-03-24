<template>
  <div>
    <el-button type="primary" size="small" @click="uploadClick" :loading="uploading">上传</el-button>
    <input ref="fileUpload" style="display: none" type="file" @change="handleChange" accept=".jpg, .jpeg, .png, .gif">
    <el-row :gutter="20">
      <el-col :md="{span:12}" :lg="{span:6}" :xl="{span:4}" class="col-item"
              v-for="(item,index) in list" :key="index">
        <el-card :body-style="{ padding: '0px' }">
          <div class="img-thum">
            <a :href="item.absUrl" target="_blank">
              <img v-lazy="item.thumUrl">
            </a>
          </div>
          <div class="card-item-info">
            <span class="text-elps" :title="item.name">{{item.name}}</span>
            <div class="options">
              <time class="time">{{item.createTime}}</time>
              <el-button class="clip-btn" type="text"
                         :data-clipboard-text="item.absUrl">复制
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
            title="上传中"
            :visible="uploading"
            width="30%"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false">
      <div>{{fileName}}</div>
      <el-progress :percentage="percent"></el-progress>
    </el-dialog>
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
        list: [],
        fileName: '',
        percent: 0,
        uploading: false
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
      uploadClick () {
        this.$refs.fileUpload.click()
      },
      async handleChange (event) {
        const files = event.target.files
        if (!files) return
        let file = files[0]
        this.fileName = file.name
        let res = await Api.get(`/api/picture/${this.bucketId}/token`)
        let token = res.data
        let pictureObj = {
          name: file.name,
          size: file.size,
          expand: file.type
        }
        this.uploading = true
        this.percent = 0
        let observable = qiniu.upload(file, null, token)
        observable.subscribe(next => {
          console.log(next)
          let percent = next.total.percent
          this.percent = Number(Number(percent).toFixed(0))
        }, error => {
          this.$message.error('上传失败')
          this.delayCloseUploading()
          console.log(error)
        }, complete => {
          this.$message.success('上传成功')
          this.delayCloseUploading()
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
      },
      delayCloseUploading () {
        setTimeout(() => {
          this.uploading = false
        }, 1350)
      }
    },
    computed: {},
    watch: {}
  }
</script>
