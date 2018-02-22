<template>
  <el-row>
    <el-col :span="8" :offset="8">
      <el-form ref="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">登录</el-button>
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
  import Cookies from 'universal-cookie'
  import config from 'config'

  export default {
    data () {
      return {
        form: {
          name: '',
          password: ''
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
      login () {
        Api.post(`/api/login`, this.form).then(res => {
          let data = res.data || {}
          let token = data.token
          if (token) {
            const cookies = new Cookies()
            cookies.set(`${config.storageNamespace}token`,
              token,
              {
                path: '/',
                maxAge: 60 * 60 * 24 * 31
              }
            )
            this.$router.push('/')
          }
        })
      }
    },
    computed: {},
    watch: {}
  }
</script>
