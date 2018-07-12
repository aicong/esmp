import { fetch, apiFormat } from '@/service/baseService';

// 表头API
const hListApi = '/api/tms/repairOrder';                                      // 查询维修保养工单表头列表method 'get'
const hCountApi = '/api/tms/repairOrder/count';                               // 查询维修保养工单表头数量 method 'get'
const hCreateApi = '/api/tms/repairOrder';                                    // 新增维修保养工单表头 method 'post'
const hUpdateApi = '/api/tms/repairOrder/{id}';                               // 更新维修保养工单表头
const hInfoApi = '/api/tms/repairOrder/{id}';                                 // 查询维修保养工单详情
const clearApi = '/api/tms/repairOrder/countPrice';                           // 结算工单
// 表体API
const bListApi = '/api/tms/repairOrder/detail';                               // 查询工单明细列表method 'get'
const bCountApi = '/api/tms/repairOrder/detail/count';                        // 查询工单明细数量 method 'get'
const bCreateApi = '/api/tms/repairOrder/detail';                             // 新增工单明细 method 'post'
const bUpdateApi = '/api/tms/repairOrder/detail';                             // 更新工单明细

/**
 * 表头api
 */
// 查询工单表头列表
export const hList = (payload) => fetch.get(hListApi, { params: payload });

// 查询工单表头数量
export const hCount = (payload) => fetch.get(hCountApi, { params: payload });

// 新增工单表头
export const hCreateFun = (payload) => fetch.post(hCreateApi, payload);

// 更新工单表头
export const hUpdateFun = (opt, payload) => fetch.put(apiFormat(hUpdateApi, opt), payload);

// 查询工单表头详情
export const hInfo = (opt) => fetch.get(apiFormat(hInfoApi, opt));

// 结算工单
export const clearFun = (opt) => fetch.put(clearApi, opt);

/**
 * 表体api
 */
// 查询工单明细列表
export const bList = (payload) => fetch.get(bListApi, { params: payload });

// 查询工单明细数量
export const bCount = (payload) => fetch.get(bCountApi, { params: payload });

// 新增工单明细
export const bCreateFun = (payload) => fetch.post(bCreateApi, payload);

// 更新工单明细
export const bUpdateFun = (opt) => fetch.put(bUpdateApi, opt);

