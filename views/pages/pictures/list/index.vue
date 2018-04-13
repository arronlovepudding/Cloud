<template>
  <div>
    <!--func-->
    <div class="flex-row flex-item-center">
      <el-button type="primary" size="small" @click="uploadClick" :loading="uploading">上传</el-button>
      <input ref="fileUpload" style="display: none" type="file" @change="handleChange" :accept="fileAccept">
      <div class="ml-20" v-if="haveSelectItemsText">
        <span>{{haveSelectItemsText}}</span>
        <el-button size="mini" type="text" class="clip-btn pl-10" :data-clipboard-text="batchUrls">批量复制</el-button>
      </div>
    </div>
    <!--pic list-->
    <el-row :gutter="20">
      <el-col :md="{span:12}" :lg="{span:6}" :xl="{span:4}" class="col-item"
              v-for="(item,index) in list" :key="index">
        <div class="card" :class="{cardSelected:item.selected}">
          <div class="img-thum flex-row flex-item-center flex-content-center" v-if="showImg">
            <a :href="item.absUrl" target="_blank">
              <img v-lazy="item.thumUrl">
            </a>
          </div>
          <div class="card-item-info">
            <div class="text-elps" :title="item.name">{{item.name}}
            </div>
            <div class="options flex-row flex-item-center">
              <time class="time flex-1">{{item.createTime}}</time>
              <el-button class="clip-btn" type="text"
                         :data-clipboard-text="item.absUrl">复制
              </el-button>
              <el-button type="text" @click="selectItem(item)">选择</el-button>
            </div>
          </div>
        </div>
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
        uploading: false,
        haveSelectItems: [],
        fileAccept: '.jpg, .jpeg, .png, .gif',
        showImg: false
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
        let fileAccept = await Api.get(`/api/picture/${this.bucketId}/fileAccept`)
        this.fileAccept = fileAccept.data.accept
        this.showImg = fileAccept.data.showImg
        let res = await Api.get(`/api/picture/${this.bucketId}`)
        let data = res.data || []
        data.forEach(item => {
          item.selected = false
        })
        this.list = data
      },
      uploadClick () {
        this.$refs.fileUpload.click()
      },
      async handleChange (event) {
        const files = event.target.files
        if (!files) return
        let file = files[0]
        this.$refs.fileUpload.value = null
        this.fileName = file.name
        let res = await Api.get(`/api/picture/${this.bucketId}/token/${this.fileName}`)
        let token = res.data.token
        let key = res.data.key
        let pictureObj = {
          name: file.name,
          size: file.size,
          expand: file.type
        }
        this.uploading = true
        this.percent = 0
        let observable = qiniu.upload(file, key, token)
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
      },
      selectItem (item) {
        if (this.haveSelectItems.includes(item)) {
          item.selected = false
          this.haveSelectItems.splice(this.haveSelectItems.indexOf(item), 1)
          return
        }
        item.selected = true
        this.haveSelectItems.push(item)
      }
    },
    computed: {
      haveSelectItemsText () {
        let itemLength = this.haveSelectItems.length
        return itemLength > 0 ? `已选择 ${itemLength} 个` : ''
      },
      batchUrls () {
        return this.haveSelectItems.map(item => item.absUrl).join(', ')
      }
    },
    watch: {}
  }
</script>
