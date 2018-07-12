import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/repair';                                           // 查询维修保养列表method 'get'
const countApi = '/api/tms/repair/count';                                    // 查询维修保养数量 method 'get'
const createApi = '/api/tms/repair';                                         // 新增维修保养 method 'post'
const updateApi = '/api/tms/repair/{id}';                                    // 更新维修保养信息
const typeInfoApi = '/api/tms/repair/{id}';                                  // 查询维修类型详情
// 查询维修保养列表
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询维修保养数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 新增维修保养
export const createFun = (payload) => fetch.post(createApi, payload);

// 更新维修保养
export const updateFun = (opt, payload) => fetch.put(apiFormat(updateApi, opt), payload);

// 查询维修保养类型详情
export const typeInfo = (opt) => fetch.get(apiFormat(typeInfoApi, opt));

