import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/sys/tenant';                                                // 查询租户信息 method 'get'
const countApi = '/api/sys/tenant/count';                                         // 查询租户数量 method 'get'
const getByIdApi = '/api/sys/tenant/{id}';                                        // 获取租户详情 method 'get'
const createFunApi = '/api/sys/tenant';                                           // 添加租户 method 'post'
const updateFunApi = '/api/sys/tenant/{id}';                                      // 更新租户信息 method 'post'
const deleteFunApi = '/api/sys/tenant/{id}';                                      // 删除租户信息 method 'put'
const banbaseApi = '/api/sys/tenant/{id}/ban';                                    // 禁用租户
const unbanbaseApi = '/api/sys/tenant/{id}/unban';                                // 解禁租户

// 查询租户信息
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询租户数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 获取租户详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 添加租户
export const createFun = (payload) => fetch.post(createFunApi, payload);

// 更新租户信息
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateFunApi, opt), payload);

// 删除租户信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteFunApi, opt));

// 禁用租户
export const banbase = (opt) => fetch.post(apiFormat(banbaseApi, opt));

// 解禁租户
export const unbanbase = (opt) => fetch.post(apiFormat(unbanbaseApi, opt));
