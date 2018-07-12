import { fetch } from '@/service/baseService';

const listApi = '/api/tms/app/pushmessage';                                     // 查询消息推送 method 'get'
const countApi = '/api/tms/app/pushmessage/count';                              // 查询消息推送数量 method 'get'
const fontTruckApi = '/api/tms/truck';                                          // 查询车头

// 查询消息推送
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询消息推送数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 查询车头列表
export const fontTruckList = (payload) => fetch.get(fontTruckApi, { params: payload });