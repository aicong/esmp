import axios from 'axios';
import env from '../../build/env';

let util = {};
util.currentPathArr = []; // 记录面包屑路径对象
util.title = function (title) {
  title = title || '承运商运营管理系统';
  window.document.title = title;
};

const ajaxUrl = env === 'development'
  ? 'http://127.0.0.1:8888'
  : env === 'production'
    ? 'https://www.url.com'
    : 'https://debug.url.com';

util.ajax = axios.create({
  baseURL: ajaxUrl,
  timeout: 30000
});

util.inOf = function (arr, targetArr) {
  let res = true;
  arr.forEach(item => {
    if (targetArr.indexOf(item) < 0) {
      res = false;
    }
  });
  return res;
};

util.oneOf = function (ele, targetArr) {
  if (targetArr.indexOf(ele) >= 0) {
    return true;
  } else {
    return false;
  }
};

util.showThisRoute = function (itAccess, currentAccess) {
  if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
    return util.oneOf(currentAccess, itAccess);
  } else {
    return itAccess === currentAccess;
  }
};

util.getRouterObjByName = function (routers, name) {
  if (!name || !routers || !routers.length) {
    return null;
  }
  // debugger;
  let routerObj = null;
  for (let item of routers) {
    if (item.name === name) {
      return item;
    }
    routerObj = util.getRouterObjByName(item.children, name);
    if (routerObj) {
      return routerObj;
    }
  }
  return null;
};

util.handleTitle = function (vm, item) {
  if (typeof item.title === 'object') {
    return vm.$t(item.title.i18n);
  } else {
    return item.title;
  }
};
util.subString = function (path) {
  return path.substring(path.lastIndexOf('/', path.lastIndexOf('/') - 1) + 1, path.lastIndexOf('/'));
};
util.setCurrentPath = function (vm, name) {
  // let title = '';
  let otherRouter = {};
  let isOtherRouter = false; // 是否是其他路由(菜单以外的路由)
  vm.$store.state.app.routers.forEach(item => {
    if (item.children) {
      if (item.children.length === 1) {
        if (item.children[0].name === name) {
          // title = util.handleTitle(vm, item);
          if (item.name === 'otherRouter') {
            otherRouter = item;
            isOtherRouter = true;
          }
        }
      } else {
        item.children.forEach(child => {
          if (child.name === name) {
            // title = util.handleTitle(vm, child);
            if (item.name === 'otherRouter') {
              otherRouter = child;
              isOtherRouter = true;
            }
          }
        });
      }
    }
  });
  let currentPathArr = [];
  // console.log(title);
  if (name === 'home') {
    currentPathArr = [
      {
        title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home')),
        path: '',
        name: 'home'
      }
    ];
  } else if ((name.indexOf('_') >= 0 || isOtherRouter) && name !== 'home') {
    // 找到路径中父节点 (路由路径上一路径名必须为父级name)
    let currentPathFather = util.subString(otherRouter.path);
    // 找到父节点路径面包屑
    util.getCrumbs(vm, currentPathFather);
    for (let i = util.currentPathArr.length - 1; i >= 0; i--) {
      let path = util.currentPathArr[i];
      currentPathArr.push({
        title: path ? path.title : '',
        path: '',
        name: path ? path.name : ''
      });
    }
    // 面包屑增加当前路由面包屑
    currentPathArr.push({
      title: otherRouter.title,
      path: '',
      name: otherRouter.name
    });
  } else {
    util.getCrumbs(vm, name);
    for (let i = util.currentPathArr.length - 1; i >= 0; i--) {
      let path = util.currentPathArr[i];
      currentPathArr.push({
        title: path.title,
        path: '',
        name: path.name
      });
    }
  }
  vm.$store.commit('setCurrentPath', currentPathArr);

  return currentPathArr;
};
util.getCrumbs = function (vm, name) {
  util.currentPathArr = [];
  let routers = vm.$store.state.app.routers;
  let currentPath = routers.filter(item => {
    return util.filterPath(item, name);
  });
  util.currentPathArr.push(currentPath[0]);
};
util.filterPath = function (arr, name) {
  let path = arr.children.filter(item => {
    if (item.name === name) {
      return true;
    } else if (item.children) {
      return util.filterPath(item, name);
    } else {
      return false;
    }
  });
  if (path && path.length > 0) {
    util.currentPathArr.push(path[0]);
    return true;
  } else {
    return false;
  }
};
util.openNewPage = function (vm, name, argu, query) {
  // 判断当前打开的页面是否是其他路由
  let otherRouter = {};
  let isOtherRouter = false; // 是否是其他路由(菜单以外的路由)
  vm.$store.state.app.routers.forEach(item => {
    if (item.children) {
      if (item.children.length === 1) {
        if (item.children[0].name === name) {
          // title = util.handleTitle(vm, item);
          if (item.name === 'otherRouter') {
            otherRouter = item;
            isOtherRouter = true;
          }
        }
      } else {
        item.children.forEach(child => {
          if (child.name === name) {
            // title = util.handleTitle(vm, child);
            if (item.name === 'otherRouter') {
              otherRouter = child;
              isOtherRouter = true;
            }
          }
        });
      }
    }
  });
  if (isOtherRouter) {
    // 找到路径中父节点 (路由路径上一路径名必须为父级name)
    name = util.subString(otherRouter.path);
  }
  vm.$store.commit('setCurrentPageName', name);
};
util.getPageObj = function (pages, name) {
  for (let i = 0; i < pages.length; i++) {
    if (pages[i].name === name) {
      return pages[i];
    } else if (pages[i].children && pages[i].children.length > 0) {
      let page = util.getPageObj(pages[i].children, name);
      if (page) {
        return page;
      } else {
        continue;
      }
    }
  }
};
util.toDefaultPage = function (routers, name, route, next) {
  let len = routers.length;
  let i = 0;
  let notHandle = true;
  while (i < len) {
    if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
      route.replace({
        name: routers[i].children[0].name
      });
      notHandle = false;
      next();
      break;
    }
    i++;
  }
  if (notHandle) {
    next();
  }
};

util.fullscreenEvent = function (vm) {
  vm.$store.commit('initCachepage');
  // 权限菜单过滤相关
  vm.$store.commit('updateMenulist');
  // 全屏相关
};
export default util;
