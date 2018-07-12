/**
 *  平台用户登录
 */
import { fetch } from '@/service/baseService';

const loginApi = '/api/pub/sys/login';                                            // 平台员工登录 method 'post'
const logoutApi = '/api/pub/logout';                                              // 平台员工推出登录 method 'post'
const currentMenuApi = '/api/tms/menu/current';                                   // 获取当前登录员工账户信息 method 'get'

// 租户员工登录
export const login = (payload) => fetch.post(loginApi, payload, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

// 退出登录
export const logout = () => fetch.post(logoutApi);

// 获取当前登录员工的菜单权限
export const currentMenu = () => fetch.get(currentMenuApi);
