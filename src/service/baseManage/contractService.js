/**
 *  基本信息 - 合同管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/contract';                                                  // 查询合同列表 method 'get'
const countApi = '/api/tms/contract/count';                                         // 查询合同数量 method 'get'
const getByIdApi = '/api/tms/contract/{id}';                                        // 获取合同详情 method 'get'
const createFunApi = '/api/tms/contract';                                           // 添加合同 method 'post'
const updateFunApi = '/api/tms/contract/{id}';                                      // 更新合同信息 method 'put'
const deleteFunApi = '/api/tms/contract/invalid';                                      // 删除合同信息 method 'delete'
const getContractDetailApi = '/api/tms/contract/detail';                                    // 查询合同价格信息 method 'get'
const getContractDetailCountApi = '/api/tms/contract/detail/count';                              // 查询合同价格信息条数 method 'get'
const uploadApi = '/api/pub/upload';                                                    // 上传附件 method 'post'
const discardApi = '/api/tms/contract/detail/discard';                                                    // 废除明细 method 'delete'

// 查询合同列表
export const queryList = (payload) => fetch.get(listApi, {params: payload});

// 查询合同价格明细列表
export const getContractDetail = (payload) => fetch.get(getContractDetailApi, {params: payload});

// 查询合同价格明细列表
export const getContractDetailCount = (payload) => fetch.get(getContractDetailCountApi, {params: payload});

// 查询合同数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 获取合同详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 添加合同
export const createFun = (payload) => fetch.post(createFunApi, payload);

// 更新合同信息
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateFunApi, opt), payload);

// 删除合同信息
export const deleteFun = (payload) => fetch.post(deleteFunApi, null, {params: payload});

// 上传合同附件
export const upload = (payload) => fetch.post(uploadApi, payload);
// 废除合同明细
export const discard = (opt) => fetch.delete(discardApi, {params: opt});
