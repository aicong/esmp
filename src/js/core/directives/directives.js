/**
 *  描述：Global directive js
 */
import tool from '@/js/core/utils/tool';
import Cookies from 'js-cookie';

const install = Vue => {
    // 自动高度
	Vue.directive('autoHeight', {
		bind: (el, binding) => {
			Vue.nextTick(() => {
				// 防止闪烁
				setTimeout(() => {
					let disH = document.documentElement.clientHeight || document.body.clientHeight;
					el.style.height = disH - binding.value + 'px';
				}, 0);
				el.__vueClickOutside__ = tool.debounce(500, (ev) => {
					let disH = document.documentElement.clientHeight || document.body.clientHeight;
					el.style.height = disH - binding.value + 'px';
				});
				window.addEventListener('resize', el.__vueClickOutside__, false);
			});
		},
		unbind: (el) => {
			window.removeEventListener('resize', el.__vueClickOutside__, false);
			delete el.__vueClickOutside__;
		}
	});

	// 后退
	Vue.directive('goBack', {
		bind: (el, binding) => {
			el.__vueClickOutside__ = () => {
				window.history.back(-1);
			};
			el.addEventListener('click', el.__vueClickOutside__, false);
		},
		unbind: (el) => {
			el.removeEventListener('click', el.__vueClickOutside__, false);
			delete el.__vueClickOutside__;
		}
	});

	// 是否显示按钮
	Vue.directive('btnAuth', {
    bind: (el, binding) => {
			let buttonList = ',' + Cookies.get('buttonList') + ',';
			let authCode = binding.value.code || '';
			if (Cookies.get('user') === 'admin') {
				return;
			}
      if (buttonList !== ',,') {
        if (buttonList.indexOf(',' + authCode + ',') === -1) {
					el.style.display = 'none';
					el.remove();
        }
      } else {
				el.style.display = 'none';
        el.remove();
      }
    }
  });
};

export default install;
