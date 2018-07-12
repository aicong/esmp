/**
 *  描述：Global filters js
 */
// import tool from '@/js/core/utils/tool';

// 待安装
const install = (Vue, options) => {
  Vue.prototype._filters = {
    money: (h, val) => {
      return h('p', val === 0 ? '0' : isNaN(val / 100) ? val : val / 100);
    },
    // 基本信息 - 基地管理 - 基地类型
    base: {
      baseType: (h, key) => {
        let strInfo = '';
        switch (key) {
          case 0:
            strInfo = '非主要基地';
            break;
          case 1:
            strInfo = '主要基地';
            break;
        }
        return h('p', strInfo);
      },
      hasRepairShop: (h, key) => {
        let strInfo = '';
        switch (key) {
          case false:
            strInfo = '否';
            break;
          case true:
            strInfo = '是';
            break;
        }
        return h('p', strInfo);
      },
      disabled: (h, key) => {
        let strInfo = '';
        switch (key) {
          case false:
            strInfo = '启用';
            break;
          case true:
            strInfo = '禁用';
            break;
        }
        return h('p', strInfo);
      }
    },
    // 状态
    enableFlag: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '启用';
          break;
        case 0:
          strInfo = '禁用';
          break;
      }
      return h('p', strInfo);
    },
    // 状态
    isheadstock: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 1:
          strInfo = '车头';
          break;
        case 2:
          strInfo = '车挂';
          break;
      }
      return h('p', strInfo);
    },
    // 状态
    dateLongFormat: (h, dateStr, fmt) => {
      if (!dateStr) return '';
      let time = new Date(dateStr);
      let o = {
        'M+': time.getMonth() + 1,
        'd+': time.getDate(),
        'h+': time.getHours(),
        'm+': time.getMinutes(),
        's+': time.getSeconds(),
        'q+': Math.floor((time.getMonth() + 3) / 3),
        'S': time.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
      }
      return h('p', fmt);
    },
    // 日志管理 操作结果
    controlResult: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 0:
          strInfo = '失败';
          break;
        case 1:
          strInfo = '成功';
          break;
      }
      return h('p', strInfo);
    },
    // 操作来源
    source: (h, params, key) => {
      let strInfo = '';
      switch (params.row[key]) {
        case 'PC':
          strInfo = '电脑端';
          break;
        case 'APP':
          strInfo = '手机APP';
          break;
        case 'WX':
          strInfo = '微信端';
          break;
      }
      return h('p', strInfo);
    }
  };
  // vue 过滤器
  Vue.filter('dateLongFormat', (dateStr, fmt = 'yyyy-MM-dd hh:mm:ss') => {
    if (!dateStr) return '';
    let time = new Date(dateStr);
    let o = {
      'M+': time.getMonth() + 1,
      'd+': time.getDate(),
      'h+': time.getHours(),
      'm+': time.getMinutes(),
      's+': time.getSeconds(),
      'q+': Math.floor((time.getMonth() + 3) / 3),
      'S': time.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  });
  Vue.filter('secondTurn', function (val) {
    switch (val) {
      case 0:
        return '否';
      case 1:
        return '是';
    }
  });
  Vue.filter('money', function (val) {
    if (val) {
      return (val / 100) + ' 元';
    } else {
      return '0' + ' 元';
    }
  });
};

export default install;
