/**
 *  基础信息 - 线路管理
 */
import { fetch, apiFormat } from '@/service/baseService';

// 角色
const listApi = '/api/tms/route';                                                // 查询线路列表 method 'get'
const countApi = '/api/tms/route/count';                                         // 查询线路数量 method 'get'
const getByIdApi = '/api/tms/route/{id}';                                        // 获取线路详情 method 'get'
const createApi = '/api/tms/route';                                              // 添加线路 method 'post'
const updateApi = '/api/tms/route/{id}';                                         // 更新线路信息 method 'put'
const deleteApi = '/api/tms/route/{id}';                                         // 删除线路信息 method 'delete'

const baseApi = '/api/tms/base';                                                  // 查询线路信息 method 'get'
const siteApi = '/api/tms/site';                                                  // 查询站点信息 method 'GET'

const banbaseApi = '/api/tms/route/{id}/disabled';                                // 禁用线路
const unbanbaseApi = '/api/tms/route/{id}/enabled';                               // 解禁线路
const routeDetailApi = '/api/tms/route/detail';                                 // 通过线路名查询线路详情 method 'GET'
const getAnalyseApi = '/api/tms/route/analyse';                                 // 线路推荐 method 'GET'

/**
 * 列表
 */
export default {
  /* GET */
  /**
   * 获取线路列表
   * @param fnSuccess 成功回掉
   * @param fnFail    失败回掉
   * @return void
   */
  queryList: (payload) => fetch.get(listApi, { params: payload }),

  /**
   * 通过线路名查询线路详情
   * @param fnSuccess 成功回掉
   * @param fnFail    失败回掉
   * @return void
   */
  routeDetail: (payload) => fetch.get(routeDetailApi, { params: payload }),

  // 查询线路数量
  count: (payload) => fetch.get(countApi, { params: payload }),
  /**
 * 新增线路
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
  saveApi: (payload) => fetch.post(createApi, payload),
  /* UPDATE */
  /**
   * 修改线路
   * @param fnSuccess 成功回掉
   * @param fnFail    失败回掉
   * @return void
   */
  updateFun: (opt, payload) => fetch.put(apiFormat(updateApi, opt), payload),
  /**
   * 删除线路
   * @param id
   */

  // 删除线路信息
  deleteFun: (opt) => fetch.delete(apiFormat(deleteApi, opt)),

  // 获取线路详情
  getById: (opt) => fetch.get(apiFormat(getByIdApi, opt)),

  // 获取基地
  queryBase: (payload) => fetch.get(baseApi, payload),

  // 获取站点信息
  querySite: (opt) => fetch.get(siteApi, {params: opt}),

  // 禁用线路
  banbase: (opt) => fetch.put(apiFormat(banbaseApi, opt)),

  // 解禁线路
  unbanbase: (opt) => fetch.put(apiFormat(unbanbaseApi, opt)),

  // 推荐线路
  getAnalyse: (opt) => fetch.get(getAnalyseApi, {params: opt})
};

