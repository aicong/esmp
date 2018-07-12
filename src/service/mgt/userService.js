/**
 *  基础信息 - 用户管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/sys/staff';                                  // 分页查询员工信息
const saveApi = '/api/sys/staff';                                   // 增加员工
const detailApi = '/api/sys/staff/{id}';                            // 查看员工详情
const updateApi = '/api/sys/staff/{id}';                            // 更新员工信息
const deleteApi = '/api/sys/staff/{id}';                            // 删除用户账户
const detainApi = '/api/sys/staff/{id}/ban';                        // 禁用员工账户
const nodetainApi = '/api/sys/staff/{id}/unban';                    // 解禁用户账户
const usercountApi = '/api/sys/staff/count';                        // 查询员工数量

// 查询用户信息
export const userList = (opt) => fetch.get(listApi, {params: opt});

// 查询用户数量
export const count = (payload) => fetch.get(usercountApi, {params: payload});

// 查询用户数量
export const detail = (payload) => fetch.get(detailApi, {params: payload});

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

