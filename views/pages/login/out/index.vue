<template>
  <div>123</div>
</template>
<script>
  import Cookies from 'universal-cookie'
  import config from 'config'

  export default {
    data () {
      return {}
    },
    components: {},
    created () {
    },
    mounted () {
    },
    beforeMount () {
      this.logOut()
    },
    beforeDestroy () {
    },
    methods: {
      logOut () {
        const cookies = new Cookies()
        cookies.remove(`${config.storageNamespace}token`)
        this.$router.push('/login')
      }
    },
    computed: {},
    watch: {}
  }
</script>
