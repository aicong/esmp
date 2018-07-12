/**
 *  基础信息 - 司机管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/driver';                                                // 查询司机信息 method 'get'
const countApi = '/api/tms/driver/count';                                         // 查询司机数量 method 'get'
const getByIdApi = '/api/tms/driver/{id}';                                        // 获取司机详情 method 'get'
const createFunApi = '/api/tms/driver';                                           // 添加司机 method 'post'
const updateFunApi = '/api/tms/updatadriver/{id}';                                // 更新司机信息 method 'post'
const deleteFunApi = '/api/tms/driver/del';                                       // 删除司机信息 method 'delete'
const unbindApi = '/api/tms/driver/unbindcard/{id}';                              // 解绑司机卡 method 'post'

const banbaseApi = '/api/tms/driver/disable/{id}';                                // 禁用司机
const unbanbaseApi = '/api/tms/driver/enable/{id}';                               // 启用司机

// 查询司机信息
export const queryList = (payload) => fetch.get(listApi, {params: payload});

// 查询司机数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 获取司机详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 添加司机
export const createFun = (payload) => fetch.post(createFunApi, payload);

// 更新司机信息
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateFunApi, opt), payload);

// 删除司机信息
export const deleteFun = (opt) => fetch.delete(deleteFunApi, { params: opt });

// 解绑司机卡
export const unbind = (opt) => fetch.post(apiFormat(unbindApi, opt));

// 禁用司机
export const banbase = (opt) => fetch.post(apiFormat(banbaseApi, opt));

// 解禁司机
export const unbanbase = (opt) => fetch.post(apiFormat(unbanbaseApi, opt));

// 查询司机信息
export const driverList = (payload) => fetch.get(listApi, {params: payload});
