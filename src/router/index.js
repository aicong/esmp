import Vue from 'vue';
import iView from 'iview';
import Util from '../libs/util';
import VueRouter from 'vue-router';
import {routes} from './router';
import tool from '@/js/core/utils/tool';

// import Cookies from 'js-cookie';
// import {routes, otherRouter, appRouter} from './router';
Vue.use(VueRouter);
// 过滤menu
// let auth = tool.filterMenu(routes); // 每次刷新浏览器都会重新获取路由
// 路由配置
const RouterConfig = {
  // mode: 'history',
  routes: routes
};

export const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  Util.title(to.meta.title);
  const isLocked = tool.getStore('isLocked');
  const currentUser = tool.getStore('currentUser', true);
 // let token = tool.getStore('token', true);
  let getMStore = tool.getStore('mgtUser', true);
  let url = to.path.includes('mgt');
  if (url) {
    if ((to.path !== '/mgt/login' && !getMStore) || to.path === '/mgt') {
      next({
        path: '/mgt/login'
      });
    } else if (isLocked && to.path !== '/locking') {
      next({
        path: '/locking'
      });
    } else {
      next();
    }
  } else {
    if (to.path === '/wayCenter/bigPage' || to.path === '/cmal' || to.path === '/matchBoard' || to.path === '/matchBoardList') {
      next();
    } else {
      if (to.path !== '/login' && !currentUser) {
        next({
          path: '/login'
        });
      } else if (isLocked && to.path !== '/locking') {
        next({
          path: '/locking'
        });
      } else {
        next();
      }
    }
  }
});

router.afterEach((to) => {
  Util.openNewPage(router.app, to.name, to.params, to.query);
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
});
