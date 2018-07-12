// 导入baseService
import fetch from '@/service/baseService';

// 角色
const listApi = '/api/user-center/role';                                   // 分页查询角色信息                   method 'GET'
const saveApi = '/api/user-center/role';                                   // 增加角色                         method 'POST'
const updateApi = '/api/user-center/role/{id}';                            // 更新角色                         method 'PUT'
const deleteApi = '/api/user-center/role/{id}';                            // 删除角色信息                      method 'DELETE'

/**
 * 列表
 */
export default {
  /* GET */
  /**
   * 获取角色列表
   * @param fnSuccess 成功回掉
   * @param fnFail    失败回掉
   * @return void
   */
  getList: (opt) => fetch.get(listApi, opt),
  /**
 * 新增角色
 * @param fnSuccess 成功回掉
 * @param fnFail    失败回掉
 * @return void
 */
  saveApi: (payload) => fetch.post(saveApi, payload),
  /* UPDATE */
  /**
   * 修改角色
   * @param fnSuccess 成功回掉
   * @param fnFail    失败回掉
   * @return void
   */
  updateApi: (opt, payload) => fetch.put(updateApi, opt, payload),
  /**
   * 删除角色
   * @param payload
   */
  deleteApi: (opt) => fetch.delete(deleteApi, opt)
};
