// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'
//全局ui组件
import { LoadingPlugin, ToastPlugin, AlertPlugin, ViewBox, XHeader, ConfirmPlugin, CloseDialogsPlugin } from 'vux'

Vue.component('view-box', ViewBox)
Vue.component('x-header', XHeader)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)



Vue.use(Vuex)


Vue.use(VueRouter)
Vue.config.productionTip = false


const FastClick = require('fastclick');
FastClick.attach(document.body)


// router.beforeEach(function(to, from, next) {
//     store.commit('updateRouter', to)
//     store.commit('updateLoadingStatus', { isLoading: true })
//     next()
// })
const routes = []


Vue.use(CloseDialogsPlugin, router)




const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']

function routerTransition(to, from) {
    const toIndex = history.getItem(to.name) * 1 || 0
    const fromIndex = history.getItem(from.name) * 1 || 0
    let direction = 'reverse'
    if (toIndex) {
        if (toIndex >= fromIndex) {
            direction = 'forward'
            store.commit('updateDirection', { direction: direction })
        } else {
            direction = 'reverse'
            store.commit('updateDirection', { direction: direction })
        }
    } else {
        ++historyCount
        history.setItem('count', historyCount)
        if (to.path !== '/') {
            history.setItem(to.name, historyCount)
            direction = 'forward'
        }
        store.commit('updateDirection', { direction: direction })
    }
}
document.addEventListener('touchend', () => {
    endTime = Date.now()
})
methods.forEach(key => {
    let method = router[key].bind(router)
    router[key] = function(...args) {
        isPush = true
        method.apply(null, args)
    }
})
router.beforeEach(function(to, from, next) {
    store.commit('updateLoadingStatus', { isLoading: true })
    routerTransition(to, from)

    if (/\/http/.test(to.path)) {
        let url = to.path.split('http')[1]
        window.location.href = `http${url}`
    } else {
        next()
    }
})


router.afterEach(function(to) {
    store.commit('updateLoadingStatus', { isLoading: false })
})
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})