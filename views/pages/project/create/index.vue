<template>
  <el-row>
    <el-col :span="12">
      <el-form ref="form" v-model="form" label-width="80px">
        <el-form-item label="名称">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="路径">
          <el-input v-model="form.path" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="form.content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button type="default" @click="goBack">取消</el-button>
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
        }
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
      onSubmit () {
        let projectId = this.$route.params.id
        let data = {
          projectId,
          ...this.form
        }
        if (data.content) data.content = JSON.parse(data.content)
        Api.post(`/api/project/create`, data).then(res => {
          this.createSuccess()
        })
      },
      createSuccess () {
        let projectId = this.$route.params.id
        this.$router.replace(`/project/detail/${projectId}`)
      },
      goBack () {
        this.$router.back()
      }
    },
    computed: {},
    watch: {}
  }
</script>
