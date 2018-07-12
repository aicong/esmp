/**
 *  单据审核
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/waybillaccount/list';                  // 查询调度单列表(柴源提供的报销列表的接口)
const countApi = '/api/tms/waybillaccount/listcount';            // 查询调度单数量(柴源提供的报销列表的接口)
const inquiryApi = '/api/tms/orderreport/examinelist';          // 按审核组权限查询单据列表
const reportCount = '/api/tms/orderreport/examinelistcount';    // 查询单据数量
const auditApi = '/api/tms/orderreport/examine';                // 单据审核

const infoApi = '/api/tms/waybill/{id}';                        // 获取调度单详情
const cancelAudit = '/api/tms/orderreport/cancelsubmit';        // 取消单据审批状态
const cancelSubmit = '/api/tms/orderreport/cancel';              // 取消单据上报
const finishApi = '/api/tms/waybillaccount/finishexamine';       // 预结算
const turnApi = '/api/tms/waybillaccount/reject';                // 运单驳回列表

const dictApi = '/api/tms/dict';                                                // 获取字典
// 查询调度单列表
export const reviewList = (payload) => fetch.get(listApi, {params: payload});

// 查询单据列表
export const inquiryList = (opt) => fetch.get(inquiryApi, {params: opt});

// 查询调度单数量
export const count = (opt) => fetch.get(countApi, {params: opt});

// 查询单据数量
export const reCount = (opt) => fetch.get(reportCount, {params: opt});

// 审核单据
export const audit = (payload) => fetch.post(auditApi, payload);

//  调度单详情
export const waybillInfo = (payload) => fetch.get(apiFormat(infoApi, payload));

// 取消单据审核状态
export const auditCancel = (opt) => fetch.put(cancelAudit, opt);

// 预结算
export const finish = (opt) => fetch.put(finishApi, opt);

// 取消单据上报
export const sumbitCancel = (opt) => fetch.post(cancelSubmit, opt);

// 运单驳回列表
export const turnDown = (opt) => fetch.get(turnApi, {params: opt});

// 获取字典
export const getDict = (payload) => fetch.get(dictApi, {params: payload});

