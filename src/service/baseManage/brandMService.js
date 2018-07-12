/**
 *  基础信息 - 品牌管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/car/brand';                                   // 分页查询品牌信息
const saveApi = '/api/tms/car/brand';                                   // 增加品牌
const updateApi = '/api/tms/car/brand/{id}';                            // 更新品牌信息
const deleteApi = '/api/tms/car/brand/{id}';                            // 删除品牌账户
const detainApi = '/api/tms/car/brand/status';                     // 禁用/启用品牌
const brandcountApi = '/api/tms/car/brand/count';                       // 查询品牌数量
const brandinfo = '/api/tms/car/brand/{id}';                            // 获取品牌详情

// 查询品牌信息
export const brandList = (opt) => fetch.get(listApi, {params: opt});

// 查询品牌数量
export const count = (payload) => fetch.get(brandcountApi, {params: payload});

// 获取品牌详情
export const brandInfo = (opt) => fetch.get(apiFormat(brandinfo, opt));

// 添加品牌
export const createFun = (payload) => fetch.post(saveApi, payload);

// 更新品牌信息
export const updateFun = (opt, payload) => fetch.put(apiFormat(updateApi, opt), payload);

// 删除品牌信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteApi, opt));

// 禁用品牌
export const detain = (opt) => fetch.put(detainApi, opt);
