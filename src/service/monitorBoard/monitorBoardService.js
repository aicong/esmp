/**
 *  在途中心 - 监控看板
*/
import { fetch } from '@/service/baseService';

const listApi = '/api/tms/monitor';                                               // 查询监控看板列表 method 'get'
const countApi = '/api/tms/waybill/count';                                        // 查询监控数量 method 'get'

const baseListApi = '/api/tms/base';                                              // 查询基地信息 method 'get'
const cityListApi = '/api/pub/district';                                          // 省市区查询 method 'get'

// 查询监控看板列表
export const queryList = (payload) => fetch.get(listApi, {params: payload});

// 查询监控数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 查询基地列表
export const queryBaseList = (payload) => fetch.get(baseListApi, {params: payload});

// 查询省市区列表
export const queryCityList = (payload) => fetch.get(cityListApi, {params: payload});