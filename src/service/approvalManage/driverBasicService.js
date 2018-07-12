// 司机底薪设置api
import { fetch } from '@/service/baseService';

const listApi = '/api/tms/monovalence/sys/driver';                                   // 获取司机底薪设置
const saveApi = '/api/tms/monovalence/sys/driver';                                   // 设置司机底薪
const driverRApi = '/api/tms/monovalence/sys/receipt';                               // 设置司机回单天数
const wayRApi = '/api/tms/monovalence/sys/multiTask';                                // 设置调度单参数设置
const getWaitApi = '/api/tms/monovalence/waitsubsidysetting/query';                  // 获取等时补贴设置
const setWaitApi = '/api/tms/monovalence/waitsubsidysetting/update';                  // 设置等时补贴

// 获取司机底薪设置
export const getBasic = (opt) => fetch.get(listApi, opt);

// 设置司机底薪
export const setBasic = (payload) => fetch.put(saveApi, payload);

// 设置司机回单天数
export const setDriverR = (payload) => fetch.put(driverRApi, payload);

// 设置调度单参数
export const setWayR = (payload) => fetch.put(wayRApi, payload);

// 获取等时补贴设置
export const getWait = (opt) => fetch.get(getWaitApi, opt);

// 设置司机底薪
export const setWait = (payload) => fetch.post(setWaitApi, payload);