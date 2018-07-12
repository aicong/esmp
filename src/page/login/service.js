// 导入baseService
import fetch from '@/service/baseService';
import * as qs from 'qs';

// 用户登录
const loginApi = '/api/pub/tms/login';
// const getCurrentUserApi = '/api/pub/tms/login';                                 // 获取当前登录用户的信息    method 'GET'
/**
 * 列表
 */
export default {
  loginSave: (payload) => fetch.post(loginApi, qs.stringify(payload), {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
  // getCurrentUser: () => fetch.get(getCurrentUserApi)
};
