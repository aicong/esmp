/**
 *  基础信息 - 基地管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/base';                                                // 查询基地信息 method 'get'
const countApi = '/api/tms/base/count';                                         // 查询基地数量 method 'get'
const getByIdApi = '/api/tms/base/{id}';                                        // 获取基地详情 method 'get'
const createFunApi = '/api/tms/base';                                           // 添加基地 method 'post'
const updateFunApi = '/api/tms/base/{id}';                                      // 更新基地信息 method 'post'
const deleteFunApi = '/api/tms/base/{id}';                                      // 删除基地信息 method 'put'

const banbaseApi = '/api/tms/base/{id}/ban';                        // 禁用基地
const unbanbaseApi = '/api/tms/base/{id}/unban';                    // 解禁基地

// 查询基地信息
export const queryList = (payload) => fetch.get(listApi, {params: payload});

// 查询基地数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 获取基地详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 添加基地
export const createFun = (payload) => fetch.post(createFunApi, payload);

// 更新基地信息
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateFunApi, opt), payload);

// 删除基地信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteFunApi, opt));

// 禁用基地
export const banbase = (opt) => fetch.post(apiFormat(banbaseApi, opt));

// 解禁基地
export const unbanbase = (opt) => fetch.post(apiFormat(unbanbaseApi, opt));
