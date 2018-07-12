import { fetch } from '@/service/baseService';

const listApi = '/api/tms/eventreport/list';                                      // 查询事件上报 method 'get'
const countApi = '/api/tms/eventreport/count';                                    // 查询事件上报数量 method 'get'
const driverApi = '/api/tms/driver';                                            // 查询司机
const fontTruckApi = '/api/tms/truck';                                          // 查询车头

// 查询事件上报
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询事件上报数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 司机
export const driveList = (payload) => fetch.get(driverApi, { params: payload });

// 查询车头列表
export const fontTruckList = (payload) => fetch.get(fontTruckApi, { params: payload });