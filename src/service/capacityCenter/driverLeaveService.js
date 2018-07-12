import { fetch } from '@/service/baseService';

const listApi = '/api/tms/leavenote/list';                                      // 查询司机请假 method 'get'
const countApi = '/api/tms/leavenote/count';                                    // 查询司机请假数量 method 'get'
const createApi = '/api/tms/leavenote/examine';                                 // 司机请假审批 method 'post'
const driverApi = '/api/tms/driver';
// 查询司机请假
export const queryList = (payload) => fetch.get(listApi, { params: payload });

// 查询司机请假数量
export const count = (payload) => fetch.get(countApi, { params: payload });

// 请假审批
export const createFun = (payload) => fetch.post(createApi, payload);

// 司机
export const driveList = (payload) => fetch.get(driverApi, { params: payload });

