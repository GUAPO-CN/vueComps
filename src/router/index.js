import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import table from './table'
const dropdown = () =>import('@/components/common/dropdown/example');
const checkbox = () =>import('@/components/common/checkbox/example');
const radio = () =>import('@/components/common/radio/example');
const formE = () =>import('@/components/common/form/example');
const carousel = () =>import('@/components/common/carousel/example');



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    table,
    {
      path: '/dropdown',
      name: 'dropdown',
      component: dropdown,
    },
    {
      path: '/checkbox',
      name: 'checkbox',
      component: checkbox,
    },
    {
      path: '/radio',
      name: 'radio',
      component: radio,
    },
    {
      path: '/form',
      name: 'formE',
      component: formE,
    },
    {
      path: '/carousel',
      name: 'carousel',
      component: carousel,
    },
  ]
})
