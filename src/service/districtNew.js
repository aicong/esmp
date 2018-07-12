/**
 *  省市区查询
 */
import { fetch } from './baseService';
const districtApi = '/api/pub/district';                               // 省市区查询 method 'get'
const provinceAndCityApi = '/api/pub/district/provinceAndCity';        // 获取省市数据 method 'get'

/**
 * parentId 上级行政区Id
 * type 行政区类型 1: 省或直辖市， 10: 地级市或省直管市， 30: 区县。类型为30时，请同时指定parentId或keyword
 * keyword 行政区名称或拼音首字母模糊查询，含有字母时按拼音查询
 * @param payload
 * @returns {T | ActiveX.IXMLDOMNode | Promise<any> | V | string | IDBRequest | *}
 */
export const district = (payload) => fetch.get(districtApi, {params: payload});

// 获取省市数据 (tree)
export const provinceAndCity = () => fetch.get(provinceAndCityApi);
