/**
 *  基础信息 - 下家管理
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/contractor';                                   // 分页查询下家信息
const saveApi = '/api/tms/contractor';                                   // 增加下家
const updateApi = '/api/tms/contractor/{id}';                            // 更新下家信息
const deleteApi = '/api/tms/contractor/{id}';                            // 删除下家账户
const detainApi = '/api/tms/contractor/{id}/ban';                         // 禁用下家
const nodetainApi = '/api/tms/contractor/{id}/unban';                      // 启用下家
const contcountApi = '/api/tms/contractor/count';                        // 查询下家数量
const continfo = '/api/tms/contractor/{id}';                           // 获取下家详情
const uplorder = '/api/pub/upload';                                      // 上传
const privewApi = '/api/pub/objurl/name';                                // 预览照片

// 查询下家信息
export const contList = (opt) => fetch.get(listApi, {params: opt});

// 查询下家数量
export const count = (payload) => fetch.get(contcountApi, {params: payload});

// 获取下家详情
export const contInfo = (opt) => fetch.get(apiFormat(continfo, opt));

// 添加下家
export const createFun = (payload) => fetch.post(saveApi, payload);

// 更新下家信息
export const updateFun = (opt, payload) => fetch.put(apiFormat(updateApi, opt), payload);

// 删除下家信息
export const deleteFun = (opt) => fetch.delete(apiFormat(deleteApi, opt));

// 禁用下家
export const detain = (opt) => fetch.post(apiFormat(detainApi, opt));

// 解禁下家
export const nodetain = (opt) => fetch.post(apiFormat(nodetainApi, opt));

// 上传
export const uplord = (payload) => fetch.post(uplorder, payload);

// 预览图片
export const privew = (opt) => fetch.get(privewApi, {params: opt});
