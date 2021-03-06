import Vue from 'vue'
import {createApp} from './main'

const {app, router} = createApp()

Vue.mixin({
  beforeRouteUpdate (to, from, next) {
    const {asyncData} = this.$options
    if (asyncData) {
      asyncData({
        route: to
      }).then(next).catch(next)
    } else {
      next()
    }
  }
})

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    Promise.all(asyncDataHooks.map(hook => hook({route: to})))
      .then(() => {
        // iView.LoadingBar.finish()
        next()
      })
      .catch(next)
  })

  app.$mount('#app')
})
