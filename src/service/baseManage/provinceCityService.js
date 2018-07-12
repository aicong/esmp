/**
 *  基本信息 - 省份城市
*/
import { fetch } from '@/service/baseService';

const listApi = '/api/pub/district';                                                // 省市区查询 method 'get'
const allListApi = '/api/pub/district/provinceAndCity';                             // 获取省市数据 method 'get'

// 查询省市区列表
export const queryList = (payload) => fetch.get(listApi, {params: payload});

// 获取省市数据列表
export const queryAllList = (payload) => fetch.get(allListApi, {params: payload});