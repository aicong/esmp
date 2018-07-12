/**
 *  基础信息 - 基地管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/sys/role';                                                // 查询TMS角色 method 'get'
const getByIdApi = '/api/sys/role/{id}';                                        // 查看角色详情 method 'get'
const countApi = '/api/sys/role/count';                                         // 查询TMS角色数量 method 'get'
const byRoleListApi = `/api/sys/role/{roleId}/user`;                            // 获取指定角色的授权用户列表 method 'get'
const byRoleCountApi = `/api/sys/role/{roleId}/user/count`;                     // 获取指定角色的授权用户数量 method 'get'
const createApi = '/api/sysAdmin/role';                                         // 新建TMS角色 method 'post'
const updateApi = '/api/sysAdmin/role/{id}';                                    // 更新TMS角色 method 'post'
const deleteApi = '/api/sysAdmin/role/{id}';                                    // 删除TMS角色 method 'delete'
const revokeApi = '/api/sysAdmin/role/{id}/revoke';                             // 租户管理员从用户收回角色 method 'post'
const authorizeApi = '/api/sysAdmin/role/{roleId}/authorize';                   // 租户管理员向用户授权角色 method 'post'
const getRoleByIdApi = '/api/sys/user/{staffId}/role';                          // 获取指定用户的角色列表

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

// 获取指定用户的角色列表
export const getRoleById = (opt) => fetch.get(apiFormat(getRoleByIdApi, opt));

