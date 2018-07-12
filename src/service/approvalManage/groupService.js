/**
 *  基础信息 - 基地管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/approval';                                            // 查询单据审核组 method 'get'
const countApi = '/api/tms/approval/count';                                     // 查询单据审核组数量 method 'get'
const createApi = '/api/tms/approval';                                          // 新增单据审批组 method 'post'
const getByIdApi = '/api/tms/approval/{id}';                                    // 获取单据审核组详情 method 'get'
const updateApi = '/api/tms/approval/{id}';                                     // 更新单据审核组 method 'post'
const deleteApi = '/api/tms/approval/{id}';                                     // 删除单据审核组 method 'delete'
const banbaseApi = '/api/tms/approval/{id}/disable';                            // 禁用单据审核组
const unbanbaseApi = '/api/tms/approval/{id}/enable';                           // 启用单据审核组
const addApprovalTypeApi = `/api/tms/approval/add/type`;                        // 单据审核组添加单据类型 method 'put'
const removeApprovalTypeApi = '/api/tms/approval/remove/type';                  // 单据审核组删除单据类型 method 'put'
const addUserTypeApi = `/api/tms/approval/add/user`;                            // 单据审核组添加用户 method 'put'
const removeUserTypeApi = '/api/tms/approval/remove/user';                      // 单据审核组删除用户 method 'put'
const getUserTypeApi = '/api/tms/approval/user/{id}';                           // 查询单据审核组用户 'get'
const getApprovalTypeApi = '/api/tms/approval/type/{id}';                       // 查询单据审核组可审核类型 'get'
const userListApi = '/api/tms/user';                                            // 获取用户列表 method 'get'

// 查询单据审核组
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询单据审核组数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 查看单据审核组详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 新建单据审核组
export const createFun = (payload) => fetch.post(createApi, payload);

// 更新单据审核组
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateApi, opt), payload);

// 删除单据审核组
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteApi, opt));

// 禁用单据审核组
export const banbase = (opt) => fetch.post(apiFormat(banbaseApi, opt));

// 解禁单据审核组
export const unbanbase = (opt) => fetch.post(apiFormat(unbanbaseApi, opt));

// 单据审核组添加单据类型
export const addApprovalType = (opt) => fetch.put(addApprovalTypeApi, opt);

// 单据审核组删除单据类型
export const removeApprovalType = (opt) => fetch.put(removeApprovalTypeApi, opt);

// 单据审核组添加用户
export const addUserType = (opt) => fetch.put(addUserTypeApi, opt);

// 单据审核组删除用户
export const removeUserType = (opt) => fetch.put(removeUserTypeApi, opt);

// 查询单据审核组用户
export const getUserType = (opt) => fetch.get(apiFormat(getUserTypeApi, opt));

// 查询单据审核组用户
export const getApprovalType = (opt) => fetch.get(apiFormat(getApprovalTypeApi, opt));

// 获取用户
export const userList = payload => fetch.get(userListApi);
