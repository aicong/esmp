/**
 *  基础信息 - 轮胎管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/tyre';                                                // 查询轮胎信息 method 'get'
const useRecordApi = '/api/tms/tyre/record';                                    // 查询轮胎使用记录 method 'get'
const countApi = '/api/tms/tyre/count';                                         // 查询轮胎数量 method 'get'
const getByIdApi = '/api/tms/tyre/{id}';                                        // 获取轮胎详情 method 'get'
const createApi = '/api/tms/tyre';                                              // 添加轮胎 method 'post'
const updateApi = '/api/tms/tyre/{id}';                                         // 更新轮胎信息 method 'post'
const recordApi = '/api/tms/tyre/record';                                       // 新增轮胎使用记录 method 'post'
const delApi = '/api/tms/tyre/del/{id}';                                        // 轮胎报废 method 'get'
const fontTruckApi = '/api/tms/truck';                                          // 分页查询车头列表
const trailerApi = '/api/tms/trailer';                                          // 查询车挂列表 method 'get'
const tempalteApi = '/api/pub/template';                                        // 查询下载模板列表 method 'get'

// 查询轮胎信息
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询轮胎使用记录
export const useRecord = (payload) => fetch.get(useRecordApi, { params: payload });

// 查询轮胎数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 获取轮胎详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 轮胎作废
export const delFun = (opt) => fetch.get(apiFormat(delApi, opt));

// 添加轮胎
export const createFun = (payload) => fetch.post(createApi, payload);

// 更新轮胎信息
export const updateFun = (opt, payload) => fetch.put(apiFormat(updateApi, opt), payload);

// 新增轮胎使用记录
export const createRecordFun = (payload) => fetch.post(recordApi, payload);

// 查询车头列表
export const fontTruckList = (payload) => fetch.get(fontTruckApi, { params: payload });

// 查询车挂列表
export const trailerList = (payload) => fetch.get(trailerApi, { params: payload });

// 查询车挂列表
export const tempalteList = (payload) => fetch.get(tempalteApi, { params: payload });