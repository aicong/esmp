/**
 *  基础信息 - 设备管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/device/gps';                                   // 分页查询设备信息
const countApi = '/api/tms/device/gps/count';                           // 查询设备数量
const clientinfo = '/api/tms/device/gps/log';                           // 获取设备绑定历史
const refreshApi = '/api/tms/device/gps/synchro';                       // 同步设备信息
const bindLOgApi = '/api/tms/truck/bind/log';                           // 获取司机、车辆、车挂、设备的绑定与解绑日志

// 查询设备列表
export const queryList = (opt) => fetch.get(listApi, {params: opt});

// 查询设备数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 获取设备绑定历史
export const clientInfo = (opt) => fetch.get(apiFormat(clientinfo, opt));

// 同步绑定历史
export const refresh = (opt) => fetch.get(refreshApi, {params: opt});

// 获取司机、车辆、车挂、设备的绑定与解绑日志
export const bindLog = (opt) => fetch.post(bindLOgApi, opt);
