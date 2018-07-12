
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/driver/salary';                                            // 查询薪资列表 method 'get'
const countApi = '/api/tms/driver/salary/count';                                     // 查询薪资记录数量 method 'get'
const createSalaryApi = '/api/tms/driver/salary';                                    // 计算薪资  method 'post'
const updateSalaryApi = '/api/tms/driver/salary/update';                             // 更新驾驶员薪资  method 'post'
const detailApi = '/api/tms/driver/salary/{id}';                                     // 薪资详情  method 'get'
const batchUpdateApi = '/api/tms/driver/salary/batch/update';                        // 批量更新驾驶员薪资  method 'post'
const settlementUpdateApi = '/api/tms/driver/salary/settlement';                        // 批量更新驾驶员薪资  method 'post'
const statusUpdateApi = '/api/tms/driver/salary/update/status';                        // 批量更新驾驶员薪资  method 'post'
const changeStatusApi = '/api/tms/driver/salary/settlement';                        // 批量更新驾驶员薪资  method 'post'
// 查询奖惩记录
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询奖惩记录数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 计算薪资
export const createSalaryFun = (payload) => fetch.post(createSalaryApi, payload);

// 更新驾驶员薪资
export const updateSalaryFun = (payload) => fetch.post(updateSalaryApi, payload);

// 更新驾驶员薪资
export const batchUpdateFun = (payload) => fetch.post(batchUpdateApi, payload);

// 薪资详情
export const salaryDetail = (opt) => fetch.get(apiFormat(detailApi, opt));

// 更新驾驶员预结算状态
export const settlementUpdate = (payload) => fetch.post(settlementUpdateApi, payload);

// 更新驾驶员状态
export const statusUpdate = (payload) => fetch.post(statusUpdateApi, payload);

// 设置结算状态
export const changeStatus = (payload) => fetch.post(changeStatusApi, payload);

