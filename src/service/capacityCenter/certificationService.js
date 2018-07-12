import { fetch } from '@/service/baseService';

const detailListApi = '/api/tms/licenseRemind/details';                          // 查询证照到期明细 method 'get'
const detailCountApi = '/api/tms/licenseRemind/details/count';                  // 查询证照到期明细数量 method 'get'
const totalListApi = '/api/tms/licenseRemind/total';                            // 查询证照年度看板 method 'get'
const totalCountListApi = '/api/tms/licenseRemind/total/count';                 // 查询证照年度看板数量 method 'get'
const licenseRemindListApi = '/api/tms/licenseSetting/setting';                  // 查询证照提醒设置列表 method 'get'
const licenseRemindApi = '/api/tms/licenseSetting';                              // 证照提醒参数设置 method 'post'
const updateRemindApi = '/api/tms/licenseRemind/total';                         // 更新证件状态 method 'put'

// 查询证照到期明细
export const detailList = (payload) => fetch.get(detailListApi, { params: payload });

// 查询证照到期明细数量
export const detailCount = (payload) => fetch.get(detailCountApi, { params: payload });

// 查询证照年度看板
export const totalList = (payload) => fetch.get(totalListApi, { params: payload });

// 查询证照年度看板数量
export const totalCount = (payload) => fetch.get(totalCountListApi, { params: payload });

// 查询证照提醒设置列表
export const licenseRemindList = (payload) => fetch.get(licenseRemindListApi, { params: payload });

// 证照提醒参数设置
export const licenseRemind = (payload) => fetch.post(licenseRemindApi, payload);

// 更新证件状态
export const updateRemind = (opt) => fetch.put(updateRemindApi, opt);

