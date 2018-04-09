<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-panel">
        <div class="login-brand">Cloud</div>
        <div class="login-content">
          <div class="account-input">
            <input ref="formName" type="email" class="login-input" value="" name="account" placeholder="用户名"
                   v-model="form.name" @focus="closeFormValidate('name')">
            <div class="input-errorMask" v-show="formValidate.name"
                 @click="closeFormValidate('name','formName')">请输入手机号或邮箱
            </div>
          </div>
          <div class="password-input">
            <input ref="formPass" type="password" class="login-input" value="" name="password" placeholder="密码"
                   v-model="form.password" @focus="closeFormValidate('password')"
                   @keyup.enter="login">
            <div class="input-errorMask" v-show="formValidate.password"
                 @click="closeFormValidate('password','formPass')">请输入密码
            </div>
          </div>
          <button class="login-btn s-btn--orange" @click="login">登录</button>
          <!--
          <div class="cooperation">
            <div class="title-cooperation">
              <span class="tit">使用第三方账号登录</span>
            </div>
            <div class="cooperation-content">
              <a href="">
                <i class="icon-weixin"></i>
              </a>
              <a href="">
                <i class="icon-weibo"></i>
              </a>
              <a href="">
                <i class="icon-qq"></i>
              </a>
            </div>
          </div>
          -->
        </div>
      </div>
    </div>
  </div>
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
        },
        formValidate: {
          name: false,
          password: false
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
      beforeLogin () {
        if (this.form.name === '') {
          this.formValidate.name = true
          return true
        }
        if (this.form.password === '') {
          this.formValidate.password = true
          return true
        }
        return false
      },
      closeFormValidate (validateName, formName = null) {
        this.formValidate[validateName] = false
        if (formName === null) return
        this.$refs[formName].focus()
      },
      login () {
        if (this.beforeLogin()) return
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
