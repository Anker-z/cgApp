import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import user from '@/components/user'
import classly from '@/components/classly'
import setting from '@/components/setting'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'KIBA',
            component: home
        },
        {
            path: '/user',
            name: '我的',
            component: user
        },
        {
            path: '/setting',
            name: '设置',
            component: setting
        },
        {
            path: '/classly',
            name: '分类',
            component: classly
        }
    ]
})