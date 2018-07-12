
import { fetch } from '@/service/baseService';

const listApi = '/api/tms/bonuspunish';                                            // 查询奖惩记录 method 'get'
const countApi = '/api/tms/bonuspunish/count';                                     // 查询奖惩记录数量 method 'get'
const createApi = '/api/tms/bonuspunish';                                          // 新增单据审批组 method 'post'
const examineApi = '/api/tms/bonuspunish/examine';                                 // 奖惩审批 method 'post'
const updateApi = '/api/tms/bonuspunish/update';                                   // 更新奖惩记录 method 'post'
const cancelApi = '/api/tms/bonuspunish/cancel';                                   // 更新奖惩记录 method 'post'
const driverApi = '/api/tms/driver';

// 查询奖惩记录
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询奖惩记录数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 新建奖惩记录
export const createFun = (payload) => fetch.post(createApi, payload);

// 奖惩审批
export const examineFun = (payload) => fetch.post(examineApi, payload);

// 作废奖惩记录
export const cancelFun = (payload) => fetch.post(cancelApi, payload);

// 更新奖惩记录
export const updateFun = (payload) => fetch.post(updateApi, payload);

// 司机
export const driveList = (payload) => fetch.get(driverApi, { params: payload });

