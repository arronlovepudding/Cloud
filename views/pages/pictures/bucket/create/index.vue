<template>
  <el-row>
    <el-col :span="12">
      <el-form ref="form" v-model="form" label-width="80px">
        <el-form-item label="仓库名称">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="仓库路径">
          <el-input v-model="form.path" placeholder="格式: path1/path2/"
                    :disabled="formAttrDisabled"></el-input>
        </el-form-item>
        <el-form-item label="存储类型">
          <el-radio-group v-model="form.storageType">
            <el-radio label="etag">Hash（基于内容计算MD5）</el-radio>
            <el-radio label="fname">FileName（可覆盖同名文件）</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button @click="goBack">取消</el-button>
          <el-button type="primary" @click="onSubmit" :loading="loading">{{buttonName}}</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>
<style lang="scss" scoped>
  @import './index.scss';
</style>
<script>
  import Api from '../../../../utils/api-tools'

  export default {
    data () {
      return {
        form: {
          name: '',
          path: '',
          storageType: ''
        },
        formAttrDisabled: false,
        buttonName: '立即创建',
        loading: false
      }
    },
    components: {},
    created () {
    },
    mounted () {
    },
    beforeDestroy () {
    },
    methods: {
      goBack () {
        this.$router.back()
      },
      check () {
        if (this.form.name === '' || this.form.path === '' || this.form.storageType === '') {
          this.$message.warning('数据不可为空')
          return false
        }
        return true
      },
      async onSubmit () {
        if (!this.check()) return
        if (/^([0-9a-zA-z]+\/?)+\/$/.test(this.form.path) === false) return this.$message.warning('路径错误，标准格式: path1/path2/')
        this.loading = true
        let res = await Api.post(`/api/picture/bucket/create`, this.form)
        this.loading = false
        if (res.data.message) return this.$message.warning(res.data.message)
        this.goBack()
      }
    },
    computed: {},
    watch: {}
  }
</script>
