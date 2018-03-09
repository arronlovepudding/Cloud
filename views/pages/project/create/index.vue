<template>
  <el-row>
    <el-col :span="12">
      <el-form ref="form" v-model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.path" placeholder="格式: path1/path2/path3"
                    :disabled="formAttrDisabled"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <div ref="codeEdit" style="width:100%;height:500px;"></div>
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
    async mounted () {
      await this.init()
      window.require.config({paths: {'vs': '/javascripts/monaco/vs'}})
      window.require(['vs/editor/editor.main'], () => {
        this.editor = window.monaco.editor.create(this.$refs.codeEdit, {
          value: '',
          language: 'json'
        })
        this.editor.setValue(this.form.content)
        this.editor.onDidChangeModelContent(event => {
          const value = this.editor.getValue()
          this.form.content = value
        })
      })
    },
    beforeDestroy () {
      this.editor && this.editor.dispose()
    },
    methods: {
      async init () {
        let crud = this.$route.meta.CRUD
        if (crud !== 'update') return
        this.isUpdate = true
        this.formAttrDisabled = true
        this.buttonName = '立即更新'
        let projectId = this.$route.params.projectId
        let id = this.$route.params.id
        let res = await Api.get(`/api/project/${projectId}/${id}`)
        let data = res.data || {}
        this.form.id = data._id
        this.form.name = data.name
        this.form.path = data.path
        this.form.content = JSON.stringify(data.content)
      },
      onSubmit () {
        if (this.form.path === '' || this.form.name === '') return this.$message.warning('名称与路径不可空')
        if (/^([0-9a-zA-z]+\/?)+[^/]$/.test(this.form.path) === false) return this.$message.warning('路径错误，标准格式: path1/path2/path3')
        let projectId = this.$route.params.projectId
        let data = {
          projectId,
          ...this.form
        }
        try {
          if (data.content) data.content = JSON.parse(data.content)
        } catch (e) {
          this.$message.warning('JSON格式错误')
          return
        }
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
