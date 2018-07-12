/**
 *  结算中心 - 借款管理
 */
import { fetch } from '@/service/baseService';

const listApi = '/api/tms/loan';                                            // 查询借款信息 method 'get'
const countApi = '/api/tms/loan/count';                                     // 查询借款信息数量 method 'get'
const examineApi = '/api/tms/loan/examine';                                 // 新增借款申请 method 'post'
const confirmPayApi = '/api/tms/loan/pay';                                  // 确认打款 method 'post'
const addApi = '/api/tms/loan';                                          // 新增借款申请 method 'post'
const abolishApi = '/api/tms/loan/abolish';                                 // 作废借款 method 'post'
const revertpayApi = '/api/tms/loan/revertpay';                                 // 回退到已审核 method 'post'
// const getByIdApi = '/api/tms/loan/{id}';                                    // 获取单据审核组详情 method 'get'
// const updateApi = '/api/tms/approval/{id}';                                     // 更新单据审核组 method 'post'
// const deleteApi = '/api/tms/approval/{id}';                                     // 删除单据审核组 method 'delete'

// 查询单据审核组
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询单据审核组数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 查看单据审核组详情
// export const getById = (opt) => fetch.get(apiFormat(getByIdApi, opt));

// 借款审批，驳回
export const examineFun = (payload) => fetch.post(examineApi, payload);

// 确认打款
export const confirmPay = (payload) => fetch.post(confirmPayApi, payload);

// 新增借款
export const addFun = (payload) => fetch.post(addApi, payload);

// 作废借款
export const abolishFun = (payload) => fetch.post(abolishApi, payload);

// 回退确认打款
export const revertPay = (opt) => fetch.post(revertpayApi, opt);