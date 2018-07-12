import Vue from 'vue';
import VueRouter from 'vue-router';
import $ from 'jquery';
import {router} from './router/index';
import store from './store/';
import core from '@/js/core';       // 公共指令及filter
import iView from 'iview';
import 'iview/dist/styles/iview.css';

window.$ = $;
Vue.config.productionTip = false;

Vue.use(iView);
Vue.use(VueRouter);
Vue.use(core);
Vue.config.lang = 'zh-CN';
/* eslint-disable no-new */
new Vue({
  router,
  store,
  data: {
    currentPageName: ''
  },
  mounted () {
    this.currentPageName = this.$route.name;
    // 显示打开的页面的列表
    // this.$store.commit('setOpenedList');
    this.$store.commit('initCachepage');
    // 权限菜单过滤相关
    // this.$store.commit('updateMenulist');
  }
}).$mount('#app');
