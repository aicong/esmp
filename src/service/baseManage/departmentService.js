/**
 *  基本信息 - 部门管理
*/
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/department';                                                // 查询部门列表 method 'get'
const countApi = '/api/tms/department/count';                                         // 查询部门数量 method 'get'
const getByIdApi = '/api/tms/department/{id}';                                        // 获取部门详情 method 'get'
const createFunApi = '/api/tms/department';                                           // 添加部门 method 'post'
const updateFunApi = '/api/tms/department/{id}';                                      // 更新部门信息 method 'put'
const deleteFunApi = '/api/tms/department/{id}';                                      // 删除部门信息 method 'delete'

// 查询部门列表
export const queryList = (payload) => fetch.get(listApi, {params: payload});

// 查询部门数量
export const count = (payload) => fetch.get(countApi, {params: payload});

// 获取部门详情
export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 添加部门
export const createFun = (payload) => fetch.post(createFunApi, payload);

// 更新部门信息
export const updateFun = (opt, payload) => fetch.post(apiFormat(updateFunApi, opt), payload, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}});

// 删除部门信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteFunApi, opt));