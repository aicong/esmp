/**
 *  结算单
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/balance';                               // 查询结算单列表
const countApi = '/api/tms/balance/count';                        // 查询结算单数量
const refreshApi = '/api/tms/balance/refresh';                    // 计算结算价格
const refreshResultApi = '/api/tms/balance/refresh/result';       // 获取计算结算价格列表
const genBalanceApi = '/api/tms/balance/balance';                 // 生产结算单
const getByIdApi = '/api/tms/balance/{id}';                       // 获取结算单详情
const updateApi = '/api/tms/balance/{id}';                        // 编辑结算单
const closeApi = '/api/tms/balance/close/{id}';                   // 结算单关账
const refreshCountApi = '/api/tms/balance/result/count';          // 刷新价格结果总数

// 查询结算单列表
export const getList = (payload) => fetch.get(listApi, {params: payload});

// 查询结算单数量
export const count = (opt) => fetch.get(countApi, {params: opt});

// 计算结算价格
export const refresh = (payload, opt) => fetch.post(refreshApi, payload, {params: opt});

// 获取计算结算价格列表
export const refreshResult = (opt) => fetch.get(refreshResultApi, {params: opt});

// 生产预结算单
export const genBalance = (payload) => fetch.post(genBalanceApi, payload);

// 获取预结算单详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 编辑预结算单
export const update = (opt, payload) => fetch.post(apiFormat(updateApi, opt), payload);
// 结算单关账
export const close = (opt, payload) => fetch.post(apiFormat(closeApi, opt), null, {params: payload});
// 刷新价格结果总数
export const refreshCount = (opt) => fetch.post(refreshCountApi);
