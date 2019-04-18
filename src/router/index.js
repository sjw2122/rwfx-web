import Vue from 'vue'
import Router from 'vue-router'

const index = r => require.ensure([], () => r(require('@/pages/index/index')), 'index');
const content = r => require.ensure([], () => r(require('@/pages/content/content')), 'content');
const demo = r => require.ensure([], () => r(require('@/pages/demo/demo')), 'demo');
const form = r => require.ensure([], () => r(require('@/pages/form/form')), 'form');
const home = r => require.ensure([], () => r(require('@/pages/home/home')), 'home');
const PersonManageAuth = r => require.ensure([], () => r(require('@/pages/PersonManageAuth/PersonManageAuth')), 'PersonManageAuth');
const PersonInforCollect = r => require.ensure([], () => r(require('@/pages/PersonInforCollect/PersonInforCollect')), 'PersonInforCollect');
const PersonCollectList = r => require.ensure([], () => r(require('@/pages/PersonCollectList/PersonCollectList')), 'PersonCollectList');
const homePage = r => require.ensure([], () => r(require('@/pages/homePage/homePage')), 'homePage');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home',
      meta:{
        keepAlive:true
      },
      component: home
    },{
      path: '/home',
      name: 'home',
      meta:{
        keepAlive:true
      },
      component: home,
      children: [
        {
          path: 'content',
          name: 'content',
          component: content
        }, {
          path: 'demo',
          name: 'demo',
          component: demo
        }, {
          path: 'form',
          name: 'form',
          component: form
        }, {
          path: 'index',
          name: 'index',
          component: index
        },{
          path: 'PersonManageAuth',
          name: 'PersonManageAuth',
          component: PersonManageAuth
        },{
          path: 'PersonInforCollect',
          name: 'PersonInforCollect',
          component: PersonInforCollect
        },{
          path: 'PersonCollectList',
          name: 'PersonCollectList',
          component: PersonCollectList
        },{
          path: 'homePage',
          name: 'homePage',
          component: homePage
        }
       ]
    }
  ]
})
