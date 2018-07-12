// 导入baseService
import { fetch } from '@/service/baseService';

// 角色
const listApi = '/api/tms/site';                                   // 分页查询站点列表信息                   method 'GET'
const baseListApi = '/api/tms/base';                                   // 分页查询站点列表信息                   method 'GET'
const oneApi = '/api/tms/site/';                                   // id查询站点信息                   method 'GET'
const addApi = '/api/tms/site';                                   // 增加站点                         method 'POST'
const updateApi = '/api/tms/site/';                            // 更新站点                         method 'PUT'
const deleteApi = '/api/tms/site/';                            // 删除站点                      method 'DELETE'
const countApi = '/api/tms/site/count';                            // 查询站点数量                      method 'GET'

/**
 * 列表
 */
export default {
  /* GET */
  /**
   * 获取站点列表
   * @param fnSuccess 成功回掉
   * @param fnFail    失败回掉
   * @return void
   */
  getList: (opt) => fetch.get(listApi, {params: opt}),

  // 查询站点数量
  count: (payload) => fetch.get(countApi, {params: payload}),
  // 查询站点详情
  getOne: (id) => fetch.get(oneApi + id),
  /**
 * 新增站点
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
  addApi: (payload) => fetch.post(addApi, payload),
  /* UPDATE */
  /**
   * 修改站点
   * @param fnSuccess 成功回掉
   * @param fnFail    失败回掉
   * @return void
   */
  updateApi: (id, payload) => fetch.put(updateApi + id, payload),
  /**
   * 删除站点
   * @param id
   */
  deleteApi: (id) => fetch.delete(deleteApi + id),
   /* GET */
  /**
   * 获取基地列表
   * @param fnSuccess 成功回掉
   * @param fnFail    失败回掉
   * @return void
   */
  getBaseList: (opt) => fetch.get(baseListApi, {params: opt})
};
