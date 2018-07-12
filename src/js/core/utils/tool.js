import store from '@/store/';
import MD5 from 'md5';

/**
 * MD5加密
 */
const md5 = (str) => {
  return MD5(MD5(MD5(str)));
};
/**
 * 设置cookie
 */
const setCookie = (name, value) => {
  var Days = 7;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
};

/**
 * 获取cookie
 * @param  {[type]} name [description]
 * @return {[type]}      [description]
 */
const getCookie = (name) => {
  if (document.cookie.length > 0) {
    let start = document.cookie.indexOf(name + '=');
    if (start !== -1) {
      start = start + name.length + 1;
      let end = document.cookie.indexOf(';', start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return '';
};

/**
 * 存储localStorage/sessionStorage
 */
const setStore = (name, content, deep) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  if (deep) {
    window.localStorage.setItem(name, content);
  } else {
    window.sessionStorage.setItem(name, content);
  }
};

/**
 * 获取localStorage/sessionStorage
 */
const getStore = (name, deep) => {
  if (!name) return;
  if (deep) {
    return window.localStorage.getItem(name);
  } else {
    return window.sessionStorage.getItem(name);
  }
};

/**
 * 删除localStorage/sessionStorage
 */
const removeStore = (name, deep) => {
  if (!name) return;
  if (deep) {
    window.localStorage.removeItem(name);
  } else {
    window.sessionStorage.removeItem(name);
  }
};

/**
 * 格式化日期
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
const DateFormat = (str, fmt) => {
  let o = {
    'M+': str.getMonth() + 1,
    'd+': str.getDate(),
    'h+': str.getHours(),
    'm+': str.getMinutes(),
    's+': str.getSeconds(),
    'q+': Math.floor((str.getMonth() + 3) / 3),
    'S': str.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

const DateFormatLast = (str, fmt) => {
  let o = {
    'M+': str.getMonth() + 1,
    'd+': str.getDate(),
    'h+': str.getHours()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  fmt = fmt + ' 23:59:59';
  return fmt;
};

const MonthFormat = (str, fmt) => {
  let o = {
    'M+': str.getMonth() + 1,
    'd+': str.getDate()
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};

/**
 * 格式化日期
 * @param  {[type]} fmt [description]
 * @return {[type]}     [description]
 */
const DateFormatTZ = (dateStr) => {
  let time = (new Date(dateStr)).getTime();
  let date = DateFormat(new Date(time - 8 * 60 * 60 * 1000), 'yyyy-MM-dd hh:mm:ss');
  let dateTZ = new Date((date + '.000Z').replace(' ', 'T'));
  return dateTZ;
};

// 格式化为YY-MM-DD
const formatDateYMD = (date) => {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

// 函数节流
const throttle = (idea, action) => {
  let last = 0;
  return function () {
    let now = +new Date();
    if (now - last > idea) {
      action && action.apply(this, arguments);
      last = now;
    }
  };
};

// 函数防抖
const debounce = (idea, action) => {
  let timer = null;
  return function () {
    let that = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(function () {
      action && action.apply(that, args);
    }, idea);
  };
};

// extend
const extend = (target, source) => {
  for (let attr in source) {
    target[attr] = source[attr];
  }
  return target;
};

// deepCopy
const deepCopy = (obj, cache = []) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  const hit = find(cache, c => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj)
    ? []
    : {};
  cache.push({
    original: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache);
  });
  return copy;
};
const checkVIN = (sVIN) => {
  let Arr = [];
  let Brr = [];
  Arr['A'] = 1;
  Arr['B'] = 2;
  Arr['C'] = 3;
  Arr['D'] = 4;
  Arr['E'] = 5;
  Arr['F'] = 6;
  Arr['G'] = 7;
  Arr['H'] = 8;
  Arr['J'] = 1;
  Arr['K'] = 2;
  Arr['L'] = 3;
  Arr['M'] = 4;
  Arr['N'] = 5;
  Arr['P'] = 7;
  Arr['R'] = 9;
  Arr['S'] = 2;
  Arr['T'] = 3;
  Arr['U'] = 4;
  Arr['V'] = 5;
  Arr['W'] = 6;
  Arr['X'] = 7;
  Arr['Y'] = 8;
  Arr['Z'] = 9;
  Arr['1'] = 1;
  Arr['2'] = 2;
  Arr['3'] = 3;
  Arr['4'] = 4;
  Arr['5'] = 5;
  Arr['6'] = 6;
  Arr['7'] = 7;
  Arr['8'] = 8;
  Arr['9'] = 9;
  Arr['0'] = 0;
  Brr[1] = 8;
  Brr[2] = 7;
  Brr[3] = 6;
  Brr[4] = 5;
  Brr[5] = 4;
  Brr[6] = 3;
  Brr[7] = 2;
  Brr[8] = 10;
  Brr[9] = 0;
  Brr[10] = 9;
  Brr[11] = 8;
  Brr[12] = 7;
  Brr[13] = 6;
  Brr[14] = 5;
  Brr[15] = 4;
  Brr[16] = 3;
  Brr[17] = 2;
  // 车辆VIN码验证代码 上线前放开
  // var sKYZF = 'ABCDEFGHJKLMNPRSTUVWXYZ1234567890';
  // var sJYW = '';
  var bl = false;
  // var blKYZF = false;
  if (sVIN.length === 17) {
    return true; // 上线时 这里删掉
    // let iJQS = 0;
    // let intTemp = 0;
    // let ht = Arr;
    // let htZM = Brr;
    // try {
    //   for (var i = 0; i < sVIN.length; i++) {
    //     if (sKYZF.indexOf(sVIN.substr(i, 1)) !== -1) {
    //       blKYZF = true;
    //       iJQS = iJQS + parseInt(ht[sVIN.substr(i, 1)]) * parseInt(htZM[(i + 1)]);
    //     } else {
    //       blKYZF = false;
    //       break;
    //     }
    //   }
    //   if (blKYZF) {
    //     intTemp = iJQS % 11;
    //     if (intTemp === 10) {
    //       sJYW = 'X';
    //     } else {
    //       sJYW = intTemp.toString();
    //     }
    //     if (sJYW === sVIN.substr(8, 1)) bl = true;
    //   } else {
    //     bl = false;
    //   }
    // } catch (err) {
    //   bl = false;
    // }
  }
  return bl;
};

/**
 * 改变表格加载状态
 * @param boolean
 */
const csl = (boolean) => {
  store.commit('searchLoading', boolean);
};
/**
 * 改变操作按钮加载状态
 * @param boolean
 */
const cal = (boolean) => {
  store.commit('actionLoading', boolean);
};

const createIconBtn = (h, params, fn, text, iconType, iconSize, style, code) => {
  let defProps = {
    text: text,
    iconType: iconType,
    iconSize: iconSize && (iconSize.toString() || '14'),
    authCode: code
  };
  return h('hyIconBtn', {
    props: defProps,
    style: style || {},
    on: {
      click: ($event) => {
        fn && fn(params.row, $event);
      }
    }
  });
};
// 过滤树数据
const filterTreeData = function (vm, treeData, title) {
  for (let i = 0; i < treeData.length; i++) {
    let item = treeData[i];
    vm.$set(item, 'expand', true);
    if (item.children && item.children.length > 0) {
      let data = filterTreeData(vm, item.children, title);
      if (data.length <= 0 && item.title.indexOf(title) === -1) {
        treeData.splice(i, 1);
        i--;
      }
    } else if (item.title.indexOf(title) === -1) {
      treeData.splice(i, 1);
      i--;
    }
  }
  return treeData;
};

// 省份 城市 相关
const getProvinceById = function (id) {
  const districtData = store.state.districtData;
  return districtData.find(item => item.id === id);
};

const getProvinceByName = function (name) {
  if (name === '香港') {
    name = '香港特别行政区';
  } else if (name === '澳门') {
    name = '澳门特别行政区';
  }
  const districtData = store.state.districtData;
  return districtData.find(item => name.indexOf(item.name) > -1);
};

const getCitiesByPId = function (pid) {
  if (!pid) return [];
  const districtData = store.state.districtData;
  return districtData.find(item => item.id === pid).children;
};

const getCityById = function (id) {
  const districtData = store.state.districtData;
  for (const province of districtData) {
    for (const city of province.children) {
      if (city.id === id) {
        return city;
      }
    }
  }
  return null;
};

const getCityByName = function (name) {
  if (name === '香港') {
    name = '香港岛';
  } else if (name === '澳门') {
    name = '澳门半岛';
  }
  const districtData = store.state.districtData;
  for (const province of districtData) {
    for (const city of province.children) {
      if (city.name === name) {
        return city;
      }
    }
  }
  return null;
};

const getDict = function (key) {
  if (!key) return [];
  const dictArray = store.state.app.dictArray;
  let findData = [];
  const find = (child) => {
    if (!child) return [];
    child.forEach(item => {
      if (item.key === key) {
        findData.push(item);
      }
    });
    if (findData.length) return findData;
    for (let i = 0; i < child.length; i++) {
      let res = find(child[i].children);
      if (res && res.length) return res;
    }
  };
  return find(dictArray);
};
const filterMenu = (router) => {
  let menuList = getStore('menuList', true);
  let routes = [];
  function matching (router) {
    return router.filter(item => {
      if (item.id) {
        if (menuList && (menuList.indexOf(item.id) !== -1 || item.id === '1')) {
          if (item.children) {
            item.children = matching(item.children);
          }
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    });
  }
  routes = matching(Object.assign([], router));
  return routes;
};
// 抛出
export default {
  md5,
  setCookie,
  getCookie,
  setStore,
  getStore,
  removeStore,
  DateFormat,
  DateFormatLast,
  MonthFormat,
  DateFormatTZ,
  formatDateYMD,
  throttle,
  debounce,
  extend,
  deepCopy,
  checkVIN,
  csl,
  cal,
  createIconBtn,
  filterTreeData,
  getProvinceById,
  getProvinceByName,
  getCitiesByPId,
  getCityById,
  getCityByName,
  getDict,
  filterMenu
};
