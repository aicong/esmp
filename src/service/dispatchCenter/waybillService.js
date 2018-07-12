/**
 *  调度中心 - 自营调度单管理
*/
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/waybill';                                               // 查询调度单列表 method 'get'
const countApi = '/api/tms/waybill/count';                                        // 查询调度单数量 method 'get'
const getByIdApi = '/api/tms/waybill/{id}';                                       // 获取调度单详情 method 'get'
const createFunApi = '/api/tms/waybill';                                          // 新建调度单 method 'post'
const updateFunApi = '/api/tms/waybill/{id}';                                     // 更新调度单信息 method 'put'
const forceUpdateFunApi = '/api/tms/waybill/forceUpdate/{id}';                         // 强制更新调度单信息 method 'put'
const deleteFunApi = '/api/tms/waybill/{id}';                                     // 删除调度单信息 method 'delete'
const forceDeleteFunApi = '/api/tms/waybill/forceDelete/{id}';                                     // 删除调度单信息 method 'delete'
const sendWaybillApi = '/api/tms/waybill/issue';                                  // 下发调度单 method 'post'
const cancelSendWaybillApi = '/api/tms/waybill/cancelIssue';                      // 取消下发调度单 method 'post'
const addEmptyApi = '/api/tms/waybill/createDryRun';                              // 新增空载调度单 method 'post'
const confirmArrivalApi = '/api/tms/waybill/confirmArrival';                      // 确认到达 method 'post'

const siteListApi = '/api/tms/site';                                              // 查询站点列表 method 'get'
const routeListApi = '/api/tms/route';                                            // 查询线路列表 method 'get'
const carListApi = '/api/tms/truck';                                              // 查询车辆列表 method 'get'
const driverListApi = '/api/tms/driver';                                          // 查询司机列表 method 'get'
const orderListApi = '/api/tms/order';                                            // 查询订单列表 method 'get'
const conctratorListApi = '/api/tms/contractor';                                  // 下家管理列表列表 method 'get'

// 查询调度单列表
export const queryList = (payload) => fetch.get(listApi, {params: payload});

// 查询调度单数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 获取调度单详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 添加调度单
export const createFun = (payload) => fetch.post(createFunApi, payload);

// 下发调度单
export const sendWaybillFun = (opt) => fetch.post(sendWaybillApi, opt);

// 取消下发调度单
export const cancelSendWaybillFun = (opt) => fetch.post(cancelSendWaybillApi, opt);

// 新增空载调度单
export const addEmpty = (opt) => fetch.post(addEmptyApi, opt);

// 确认到达
export const confirmArrival = (opt) => fetch.post(confirmArrivalApi, opt);

// 更新调度单信息
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateFunApi, opt), payload);

// 强制更新调度单信息
export const forceUpdateFun = (opt, payload) => fetch.post(apiFormat(forceUpdateFunApi, opt), payload);

// 删除调度单信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteFunApi, opt));

// 强制删除调度单信息
export const forceDeleteFun = (opt) => fetch.delete(apiFormat(forceDeleteFunApi, opt));

// 查询站点列表
export const querySiteList = (payload) => fetch.get(siteListApi, {params: payload});

// 查询线路列表
export const queryRouteList = (payload) => fetch.get(routeListApi, {params: payload});

// 查询车辆列表
export const queryCarList = (payload) => fetch.get(carListApi, {params: payload});

// 查询司机列表
export const queryDriverList = (payload) => fetch.get(driverListApi, {params: payload});

// 查询订单列表
export const queryOrderList = (payload) => fetch.get(orderListApi, {params: payload});

// 查询承运商列表
export const queryConctratorList = (payload) => fetch.get(conctratorListApi, {params: payload});
