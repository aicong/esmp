/**
 *  基础信息 - 商品车管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/car';                                   // 分页查询商品车信息
const saveApi = '/api/tms/car';                                   // 增加商品车
const updateApi = '/api/tms/car/{id}';                            // 更新商品车信息
const deleteApi = '/api/tms/car/{id}';                            // 删除商品车
const countApi = '/api/tms/car/count';                            // 查询商品车数量
const commodityinfo = '/api/tms/car/{id}';                        // 获取商品车详情
const detainApi = '/api/tms/car/{id}';                            // 获取商品车详情

// 查询商品车信息
export const commodityList = (opt) => fetch.get(listApi, {params: opt});

// 查询商品车数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 获取商品车详情
export const commodityInfo = (opt) => fetch.get(apiFormat(commodityinfo, opt));

// 添加商品车
export const createFun = (payload) => fetch.post(saveApi, payload);

// 更新商品车信息
export const updateFun = (opt, payload) => fetch.put(apiFormat(updateApi, opt), payload);

// 删除商品车信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteApi, opt));

// 商品车的禁用、启用
export const detain = (opt) => fetch.delete(apiFormat(detainApi, opt));
