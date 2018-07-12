
import { fetch } from '@/service/baseService';

const listApi = '/api/tms/receiptDeduction';                                            // 查询运单扣减列表 method 'get'
const countApi = '/api/tms/receiptDeduction/count';                                     // 查询运单扣减列表数量 method 'get'
const createApi = '/api/tms/receiptDeduction';                                          // 生成运单扣减 method 'post'
const statisticsListApi = '/api/tms/receiptDeduction/statistics';                       // 查询运单扣减统计列表 method 'get'
const statCountApi = '/api/tms/receiptDeduction/statistics/count';                      // 查询运单扣减列表数量 method 'get'
const createStatApi = '/api/tms/receiptDeduction/statistics';                           // 生成运单扣减统计 method 'post'
const recordListApi = '/api/tms/receiptDeduction/record';                               // 查询运单扣减统计列表 method 'get'
const recordCountApi = '/api/tms/receiptDeduction/record/count';                        // 查询运单扣减统计数量 method 'get'
const cancelRecordApi = '/api/tms/receiptDeduction/record';                             // 设置回单扣减统计作废 method 'post'

// 查询运单扣减列表
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询运单扣减数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 生成运单扣减
export const createFun = (payload) => fetch.post(createApi, payload);

// 生成运单扣减统计
export const createStatFun = (payload) => fetch.post(createStatApi, payload);

// 查询运单扣减数量
export const statCount = (payload) => fetch.get(statCountApi, { params: payload });

// 查询运单扣减统计列表
export const statisticsList = (payload) => fetch.get(statisticsListApi, { params: payload });

// 查询运单扣减统计列表
export const recordList = (payload) => fetch.get(recordListApi, { params: payload });

// 查询运单扣减统计数量
export const recordCount = (payload) => fetch.get(recordCountApi, { params: payload });

// 设置回单扣减统计作废
export const cancelRecordFun = (payload) => fetch.post(cancelRecordApi, payload);

