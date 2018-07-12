/**
 *  基础信息 - 系统日志管理
 */
import { fetch } from '@/service/baseService';

const sysLogApi = '/api/tms/sysLog/sys';                                                // 查询系统日志记录列表
const sysLogCountApi = '/api/tms/sysLog/sys/count';                                                // 查询系统日志记录列表
const dictApi = '/api/tms/dict';                                                // 获取字典

// 查询TMS角色
export const sysLogList = (payload) => fetch.get(sysLogApi, {params: payload});
export const sysLogCount = (payload) => fetch.get(sysLogCountApi, {params: payload});
export const getDict = (payload) => fetch.get(dictApi, {params: payload});
