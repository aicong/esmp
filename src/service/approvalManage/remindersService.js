/**
 *  回单提醒设置
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/receipt';                                   // 分页查询回单提醒信息
const saveApi = '/api/tms/receipt';                                   // 增加回单提醒
const updateApi = '/api/tms/receipt/{id}';                            // 更新回单提醒信息
const deleteApi = '/api/tms/receipt/{id}';                            // 删除回单
const remindersCount = '/api/tms/receipt/count';                      // 查询回单提醒数量
const info = '/api/tms/receipt/{id}';                                 // 通过回单id查回单详情

// 查询回单列表
export const remindersList = (opt) => fetch.get(listApi, {params: opt});

// 查询回单数量
export const count = (payload) => fetch.get(remindersCount, {params: payload});

// 添加回单
export const createFun = (payload) => fetch.post(saveApi, payload);

// 更新回单信息
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateApi, opt), payload);

// 删除回单信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteApi, opt));

// // 回单详情
export const remindersInfo = (opt) => fetch.get(apiFormat(info, opt));
