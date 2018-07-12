/**
 * 描述：http
 */
import axios from 'axios';
import { router } from '@/router/';
import store from '@/store/';
import { Notice } from 'iview';
import _hyTool from '@/js/core/utils/tool';

const http = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'http://182.61.48.201:8080/' : '/'
});

// 拦截
http.interceptors.request.use(function (config) {
  const token = _hyTool.getStore('token', true);
  if (token) {
    config.headers['X-Auth-Token'] = token;
  }
  return config;
}, function (error) {
  Notice.error({
    title: '加载超时'
  });
  return Promise.reject(error);
});

http.interceptors.response.use(function (response) {
  const token = response.headers['x-auth-token'];
  if (token) { // 登录后存放token
    _hyTool.setStore('token', token, true);
  }
  if (response.status === 200 && response.data.result) {
    return Promise.resolve(response.data);
  } else {
    setTimeout(() => {
      _hyTool.csl(false);
      _hyTool.cal(false);
    }, 500);
    if (response.data.error === 'EXCEL_CONSTRAINT_VIOLATION') {
      return Promise.reject(response);
    } else {
      Notice.error({
        title: '请求错误',
        desc: response.data.message
      });
      return Promise.reject(response.data.message);
    }
  }
}, function (error) {
  setTimeout(() => {
    _hyTool.csl(false);
    _hyTool.cal(false);
  }, 500);
  if (error.response) {
    switch (error.response.status) {
      case 401:
      Notice.error({
          title: 'error-401',
          desc: error.response.data.message
        });
        break;
      case 403:
        // 403 登录超时 清除登录信息跳转到登录页面
        store.dispatch('LOGOUT');
        Notice.error({
          title: '登录超时， 请重新登录！'
        });
        _hyTool.removeStore('token', true);
        _hyTool.removeStore('currentUser', true);
        router.push('/login');
        break;
      case 404:
        Notice.error({
          title: 'error-401',
          desc: '当前api未找到，错误代码：404！'
        });
        break;
      case 500:
        Notice.error({
          title: 'error-500',
          desc: '未知原因，错误代码：500'
        });
        break;
      case 504:
        Notice.error({
          title: 'error-504',
          desc: '服务器异常，请稍后再试！'
        });
        break;
    }
  }
  return Promise.reject(error);
});

export default http;
