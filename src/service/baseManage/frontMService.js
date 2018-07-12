/**
 *  基础信息 - 车头管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/truck';                                   // 分页查询车头列表
const saveApi = '/api/tms/truck';                                   // 增加车头
const updateApi = '/api/tms/truck/{id}';                            // 更新车辆信息
const deleteApi = '/api/tms/truck/{id}';                            // 删除车头信息
const driverApi = '/api/tms/truck/bind/driver';                     // 车辆绑定司机
const trailerApi = '/api/tms/truck/bind/trailer';                   // 车头绑定车挂
const undriverApi = '/api/tms/truck/unbind/driver';                 // 车辆绑定司机
const untrailerApi = '/api/tms/truck/unbind/trailer';               // 车头绑定车挂
const frontcountApi = '/api/tms/truck/count';                       // 查询车头数量
const frontinfoApi = '/api/tms/truck/{id}';                         // 查询车头详情
const detainApi = '/api/tms/truck/{id}/enabled';                    // 启用车头
const nodetainApi = '/api/tms/truck/{id}/disabled';                 // 禁用车头
const changestatusAPI = '/api/tms/truck/update/status';             // 更改运力状态
const gpsBApi = '/api/tms/truck/bindgps';                           // 车头绑定gps
const ungpsBrApi = '/api/tms/truck/unbindgps';                      // 车头解绑gps

// 查询车头列表
export const frontList = (opt) => fetch.get(listApi, {params: opt});

// 获取车头详情
export const frontInfo = (opt) => fetch.get(apiFormat(frontinfoApi, opt));

// 查询用户数量
export const count = (payload) => fetch.get(frontcountApi, {params: payload});

// 添加车头
export const createFun = (payload) => fetch.post(saveApi, payload);

// 更新车头信息
export const updateFun = (opt, payload) => fetch.put(apiFormat(updateApi, opt), payload);

// 删除车头信息
export const deleteFun = (opt, payload) => fetch.delete(apiFormat(deleteApi, opt) + payload);

// 车辆绑定司机
export const driverBind = (opt) => fetch.put(driverApi, opt);

// 车头绑定车挂
export const trailerBind = (opt) => fetch.put(trailerApi, opt);

// 解绑司机
export const driverOff = (opt) => fetch.put(undriverApi, opt);

// 解绑车挂
export const trailerOff = (opt) => fetch.put(untrailerApi, opt);

// 禁用车头
export const detain = (opt) => fetch.put(apiFormat(detainApi, opt));

// 启用车头
export const nodetain = (opt) => fetch.put(apiFormat(nodetainApi, opt));

// 更改运力状态
export const changeAstatus = (opt) => fetch.put(changestatusAPI, opt);

// 车头绑定gps
export const gpsBind = (opt) => fetch.put(gpsBApi, opt);

// 解绑gps
export const ungpsBind = (opt) => fetch.put(ungpsBrApi, opt);
