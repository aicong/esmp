/**
 *  基础信息 - 上家管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/customer';                                   // 分页查询上家信息
const saveApi = '/api/tms/customer';                                   // 增加上家
const updateApi = '/api/tms/customer/{id}';                            // 更新上家信息
const deleteApi = '/api/tms/customer/{id}';                            // 删除上家账户
const detainApi = '/api/tms/customer/status';                          // 禁用/启用上家
const clientcountApi = '/api/tms/customer/count';                       // 查询上家数量
const clientinfo = '/api/tms/customer/{id}';                            // 获取上家详情
const uplorder = '/api/pub/upload';                                     // 上传
const privewApi = '/api/pub/objurl/name';                                // 预览照片

// 查询上家信息
export const clientList = (opt) => fetch.get(listApi, {params: opt});

// 查询上家数量
export const count = (payload) => fetch.get(clientcountApi, {params: payload});

// 获取上家详情
export const clientInfo = (opt) => fetch.get(apiFormat(clientinfo, opt));

// 添加上家
export const createFun = (payload) => fetch.post(saveApi, payload);

// 更新上家信息
export const updateFun = (opt, payload) => fetch.put(apiFormat(updateApi, opt), payload);

// 删除上家信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteApi, opt));

// 禁用上家
export const detain = (opt) => fetch.put(detainApi, opt);

// 上传
export const uplord = (payload) => fetch.post(uplorder, payload);

// 预览图片
export const privew = (opt) => fetch.get(privewApi, {params: opt});
