/**
 *  结算中心 - 驾驶员结算单
 */
import { fetch, apiFormat } from '@/service/baseService';

const listApi = '/api/tms/driver/settlement/settlement';                     // 查询结算单列表 method 'get'
const countApi = '/api/tms/driver/settlement/count';                          // 查询结算单总数 method 'get'
const dispatchListApi = '/api/tms/driver/settlement';                        // 查询调度单列表 method 'get'
const saveApi = '/api/tms/driver/settlement';                                // 保存结算单 method 'get'
const updateApi = '/api/tms/driver/settlement/{id}';                                // 编辑结算单 method 'get'
const loanListApi = '/api/tms/loan';                                         // 查询借还款列表 method 'get'
const getByIdApi = '/api/tms/driver/settlement/settlement/{id}';             // 查询借还款详情 method 'get'
const deleteApi = '/api/tms/driver/settlement/settlement/{id}';             // 查询借还款详情 method 'get'

export default {
  // 查询结算单列表
  queryList: (payload) => fetch.get(listApi, { params: payload }),
  // 查询结算单总数
  conunt: (payload) => fetch.get(countApi, { params: payload }),
  // 查询调度单列表
  dispatchList: (payload) => fetch.get(dispatchListApi, { params: payload }),
  // 查询借还款列表
  loanList: (payload) => fetch.get(loanListApi, { params: payload }),
  // 保存结算单
  save: (payload) => fetch.post(saveApi, payload),
  // 编辑结算单
  update: (opt, payload) => fetch.post(apiFormat(updateApi, opt), payload),
  // 查询结算单详情
  getById: (opt, payload) => fetch.get(apiFormat(getByIdApi, opt), { params: payload }),
  // 删除结算单
  deleteById: (opt) => fetch.delete(apiFormat(deleteApi, opt))
};

