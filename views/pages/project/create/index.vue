<template>
  <el-row>
    <el-col :span="12">
      <el-form ref="form" v-model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.path" placeholder="请输入"
                    :disabled="formAttrDisabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
                  type="textarea"
                  :autosize="{ minRows: 6, maxRows: 15}"
                  placeholder="请输入内容"
                  v-model="form.content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="goBack">取消</el-button>
          <el-button type="primary" @click="onSubmit">{{buttonName}}</el-button>
        </el-form-item>
      </el-form>
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
        form: {
          name: '',
          path: '',
          content: ''
        },
        formAttrDisabled: false,
        buttonName: '立即创建',
        isUpdate: false
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
        let crud = this.$route.meta.CRUD
        if (crud !== 'update') return
        this.isUpdate = true
        this.formAttrDisabled = true
        this.buttonName = '立即更新'
        let projectId = this.$route.params.projectId
        let id = this.$route.params.id
        Api.get(`/api/project/${projectId}/${id}`).then(res => {
          let data = res.data || {}
          this.form.id = data._id
          this.form.name = data.name
          this.form.path = data.path
          this.form.content = JSON.stringify(data.content)
        })
      },
      onSubmit () {
        let projectId = this.$route.params.projectId
        let data = {
          projectId,
          ...this.form
        }
        if (data.content) data.content = JSON.parse(data.content)
        if (this.isUpdate) {
          Api.put(`/api/project/${projectId}/${this.form.id}`, data).then(res => {
            this.goBack()
          })
        } else {
          Api.post(`/api/project/${projectId}`, data).then(res => {
            this.goBack()
          })
        }
      },
      goBack () {
        this.$router.back()
      }
    },
    computed: {},
    watch: {}
  }
</script>
