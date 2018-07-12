/**
 *  基础信息 - 基地管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/role';                                                // 查询TMS角色 method 'get'
const getByIdApi = '/api/tms/role/{id}';                                        // 查看角色详情 method 'get'
const countApi = '/api/tms/role/count';                                         // 查询TMS角色数量 method 'get'
const byRoleListApi = `/api/tms/role/{roleId}/user`;                            // 获取指定角色的授权用户列表 method 'get'
const byRoleCountApi = `/api/tms/role/{roleId}/user/count`;                     // 获取指定角色的授权用户数量 method 'get'
const createApi = '/api/tmsAdmin/role';                                         // 新建TMS角色 method 'post'
const updateApi = '/api/tmsAdmin/role/{id}';                                    // 更新TMS角色 method 'post'
const deleteApi = '/api/tmsAdmin/role/{id}';                                    // 删除TMS角色 method 'delete'
const revokeApi = '/api/tmsAdmin/role/{id}/revoke';                             // 租户管理员从用户收回角色 method 'post'
const authorizeApi = '/api/tmsAdmin/role/{roleId}/authorize';                   // 租户管理员向用户授权角色 method 'post'
const menuListApi = '/api/tms/menu';                                            // 获取菜单 method 'get'
const userListApi = '/api/tms/user';                                            // 获取用户列表 method 'get'
const baselistApi = '/api/tms/base';                                            // 查询基地信息 method 'get'

// 查询TMS角色
export const queryList = (payload) => fetch.get(listApi, {params: payload});

// 查询TMS角色数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 查看角色详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 获取指定角色的授权用户列表
export const byRoleList = (opt, payload) => fetch.get(apiFormat(byRoleListApi, opt), { params: payload });

// 获取指定角色的授权用户数量
export const byRoleCount = (opt) => fetch.get(apiFormat(byRoleCountApi, opt));

// 新建TMS角色
export const createFun = (payload) => fetch.post(createApi, payload);

// 更新TMS角色
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateApi, opt), payload);

// 删除TMS角色
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteApi, opt));

// 租户管理员从用户收回角色
export const revokeFun = (opt, payload) => fetch.post(apiFormat(revokeApi, opt), payload);

// 租户管理员向用户授权角色
export const authorizeFun = (opt, payload) => fetch.post(apiFormat(authorizeApi, opt), payload);

// 获取菜单
export const menuList = payload => fetch.get(menuListApi);

// 获取用户
export const userList = payload => fetch.get(userListApi);

// 查询基地信息
export const baseList = (payload) => fetch.get(baselistApi);