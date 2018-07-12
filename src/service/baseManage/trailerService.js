/**
 *  基本信息 - 车挂管理
*/
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/trailer';                                                // 查询车挂列表 method 'get'
const countApi = '/api/tms/trailer/count';                                         // 查询车挂数量 method 'get'
const getByIdApi = '/api/tms/trailer/{id}';                                        // 获取车挂详情 method 'get'
const createFunApi = '/api/tms/trailer';                                           // 添加车挂 method 'post'
const updateFunApi = '/api/tms/trailer/{id}';                                      // 更新车挂信息 method 'put'
const deleteFunApi = '/api/tms/trailer/{id}';                                      // 删除车挂信息 method 'delete'
const disableApi = '/api/tms/trailer/{id}/disabled';                               // 禁用车挂 method 'put'
const enabledApi = '/api/tms/trailer/{id}/enabled';                                // 启用车挂 method 'put'

const brandListApi = '/api/tms/car/brand';                                                // 查询品牌列表 method 'get'
const baseListApi = '/api/tms/base';                                                // 查询基地列表 method 'get'

// 查询车挂列表
export const queryList = (payload) => fetch.get(listApi, {params: payload});

// 查询车挂数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 获取车挂详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 添加车挂
export const createFun = (payload) => fetch.post(createFunApi, payload);

// 更新车挂信息
export const updateFun = (opt, payload) => fetch.put(apiFormat(updateFunApi, opt), payload);

// 删除车挂信息
export const deleteFun = (opt, payload) => fetch.delete(apiFormat(deleteFunApi, opt) + payload);

// 禁用车挂
export const disabledFun = (opt) => fetch.put(apiFormat(disableApi, opt));

// 启用车挂
export const enabledFun = (opt) => fetch.put(apiFormat(enabledApi, opt));

// 查询品牌列表
export const queryBrandList = (payload) => fetch.get(brandListApi, {params: payload});

// 查询基地列表
export const queryBaseList = (payload) => fetch.get(baseListApi, {params: payload});
