/**
 *  描述：基于vue的扩展
 */
import axios from 'axios';

import _hyTool from '@/js/core/utils/tool';                               	 // 全局方法
import _hyDirectives from '@/js/core/directives/directives';              	 // 全局指令文件
import _filters from '@/js/core/filters/filters';                       	   // 全局过滤文件
// import hyButton from '@/components/common/button/button';                 // button
import hyIconBtn from '@/components/common/iconBtn/iconBtn';                 // IconButton
import optHandler from '@/components/common/handler/handler';
// import transProcess from '@/page/monitorBoard/transProcess';                 // 全图监控-运输过程组件

const install = function (Vue, options = {}) {
	// 静态方法
	if (install.installed) return;
	install.installed = true;
	// axios
	Vue.prototype.$http = Vue.$http = Vue.prototype.$http || axios;
	// 全局方法
	Vue.prototype._hyTool = Vue._hyTool = Vue.prototype._hyTool || _hyTool;
	// 指令
	Vue.use(_hyDirectives);
  // iview table字段过滤
	Vue.use(_filters);
	// 组件
	// Vue.component('hyButton', hyButton);
	Vue.component('hyIconBtn', hyIconBtn);
	Vue.component('optHandler', optHandler);
	// Vue.component('transProcess', transProcess);
};

// axios拦截器设置cookie
axios.interceptors.request.use(
  config => {
    if (_hyTool.getStore('token')) {
      config.headers['x-access-token'] = _hyTool.getStore('token');
    }
    return config;
  },
  err => {
    return Promise.reject(err);
});

// 工具类
const core = {
	install
};

/**
 * 自动安装控件
 */
let GlobalVue = null;
if (window.Vue !== undefined) {
	GlobalVue = window.Vue;
} else if (global.Vue !== undefined) {
	GlobalVue = global.Vue;
}

if (GlobalVue) {
	GlobalVue.use(core);
}

export default core;
