import {otherRouter, appRouter} from '@/router/router';
import tool from '../../js/core/utils/tool';

const origin = window.location.origin; // 获取当前域名

const app = {
  state: {
    loadingText: '加载中...',
    page: 1,
    limit: 10,
    totalElement: 100,
    searchListLoading: false,
    actionLoading: false,
    isFullScreen: false,
    openedSubmenuArr: [], // 要展开的菜单数组
    menuTheme: 'dark', // 主题
    themeColor: '',
    currentPageName: '',
    currentPath: [
      {
        title: '首页',
        path: '',
        name: 'home'
      }
    ], // 面包屑数组
    menuList: [],
    routers: [
      otherRouter,
      ...appRouter
    ],
    dontCache: ['text-editor', 'artical-publish'], // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    upAddress: origin,
    dictArray: []
  },
  mutations: {
    searchLoading (state, boolean) {
      state.searchListLoading = boolean;
    },
    actionLoading (state, boolean) {
      state.actionLoading = boolean;
    },
    updateMenulist (state) {
        let menuList = [];
        // if (isMgt) menuList = tool.filterMenu(Object.assign([], mgtRouter));
        // else menuList = tool.filterMenu(Object.assign([], appRouter));
        menuList = tool.filterMenu(Object.assign([], appRouter));
        // 管理员添加所有页面权限
        state.menuList = menuList;
    },
    addOpenSubmenu (state, subMenu) {
      if (state.openedSubmenuArr.indexOf(subMenu) === -1) {
        state.openedSubmenuArr[0] = subMenu;
        // state.openedSubmenuArr.push(subMenu);
      }
    },
    initCachepage (state) {
      if (localStorage.cachePage) {
          state.cachePage = JSON.parse(localStorage.cachePage);
      }
    },
    setCurrentPath (state, pathArr) {
      state.currentPath = pathArr;
    },
    setCurrentPageName (state, name) {
      state.currentPageName = name;
    },
    setAvator (state, path) {
      localStorage.avatorImgPath = path;
    },
    initDict (state, array) {
      state.dictArray = array;
    }
  }
};

export default app;
