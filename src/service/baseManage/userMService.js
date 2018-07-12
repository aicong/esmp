/**
 *  基础信息 - 用户管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/user';                                   // 分页查询员工信息
const saveApi = '/api/tms/user';                                   // 增加员工
const updateApi = '/api/tms/user/{id}';                            // 更新员工信息
const deleteApi = '/api/tms/user/{id}';                            // 删除用户账户
const detainApi = '/api/tms/user/{id}/ban';                        // 禁用员工账户
const nodetainApi = '/api/tms/user/{id}/unban';                    // 解禁用户账户
const usercountApi = '/api/tms/user/count';                        // 查询员工数量
const rolelistApi = '/api/tms/user/{userId}/role';                 // 通过用户id查角色列表
const allroleApi = '/api/tms/role';                               // 查询所有角色
const addroleApi = '/api/tmsAdmin/role/{roleId}/authorize';        // 给用户添加角色
const deleteroleApi = '/api/tmsAdmin/role/{id}/revoke';            // 移除用户角色

// 查询用户信息
export const userList = (opt) => fetch.get(listApi, {params: opt});

// 查询用户数量
export const count = (payload) => fetch.get(usercountApi, {params: payload});

// 添加用户
export const createFun = (payload) => fetch.post(saveApi, payload);

// 更新用户信息
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateApi, opt), payload);

// 删除用户信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteApi, opt));

// 禁用用户
export const detain = (opt) => fetch.post(apiFormat(detainApi, opt));

// 解禁用户
export const nodetain = (opt) => fetch.post(apiFormat(nodetainApi, opt));

// 根据用户查询角色列表
export const roleList = (opt) => fetch.get(apiFormat(rolelistApi, opt));

// 查询所有角色
export const getAllRole = (opt) => fetch.get(allroleApi, {params: opt});

// 给用户添加角色
export const addRole = (opt, payload) => fetch.post(apiFormat(addroleApi, opt), payload);

// 删除用户角色
export const deleteRole = (opt, payload) => fetch.post(apiFormat(deleteroleApi, opt), payload);
