/**
 *  基础信息 - 基地管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/order';                                                // 查询訂單 method 'get'
const getByIdApi = '/api/tms/order/{id}/sub';                                    // 查看訂單详情 method 'get'
const countApi = '/api/tms/order/count';                                         // 查询訂單数量 method 'get'
const updateApi = '/api/tmsAdmin/role/{id}';                                     // 更新訂單 method 'post'
const deleteApi = '/api/tms/order/delete';                                       // 删除訂單 method 'delete'
const checkReceiptApi = '/api/tms/order/checkReceipt';                           // 勾单 method 'post'
const cancelReceiptApi = '/api/tms/order/cancelReceipt';                         // 取消勾单 method 'post'
const baseApi = '/api/tms/base';                                                 // 查询基地信息 method 'get'
const contractorApi = '/api/tms/contractor';                                     // 查询承运商下家信息 method 'get'
const orderTranferApi = '/api/tms/order/subcontract';                            // 订单转包 method 'post'
const cancelOrderTranferApi = '/api/tms/order/subcontract/cancel';               // 取消订单转包 method 'post'

const waitListApi = '/api/tms/order?dispatched=0';                               // 查询待调度订单 method 'get'
const waitListCountApi = '/api/tms/order/count?dispatched=0';                    // 查询待调度订单 method 'get'
// 查询訂單
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询訂單数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 查看订单详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 更新訂單
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateApi, opt), payload);

// 删除訂單
export const deleteFun = (opt) => fetch.delete(deleteApi, { params: opt });

// 勾单
export const checkReceiptFun = (payload) => fetch.post(checkReceiptApi, payload);
// 取消勾单
export const cancelReceiptFun = (payload) => fetch.post(cancelReceiptApi, payload);

// 订单转包
export const orderTranfer = (payload) => fetch.post(orderTranferApi, payload);

// 取消订单转包
export const cancelOrderTranfer = (payload) => fetch.post(cancelOrderTranferApi, payload);

// 查询基地信息
export const baseList = (payload) => fetch.get(baseApi, { params: payload });

// 查询承运商下家信息
export const contractorList = (payload) => fetch.get(contractorApi, { params: payload });

// 查询待调度订单
export const waitList = (payload) => fetch.get(waitListApi, { params: payload });
// 查询待调度订单总数
export const waitListCount = (payload) => fetch.get(waitListCountApi, { params: payload });
