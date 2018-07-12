/**
 *  结算中心 - 单价设置
 */
import { fetch, apiFormat, apiFormat2 } from '@/service/baseService';

const gasolineListApi = '/api/tms/monovalence/gasoline';                                            // 搜索油价设置列表 method 'get'
const gasolineCountApi = '/api/tms/monovalence/gasoline/count';                                     // 搜索油价设置数量 method 'get'
const gasolineSetApi = '/api/tms/monovalence/gasoline';                                             // 油价设置 method 'post'

const mileageListApi = '/api/tms/monovalence/mileage';                                              // 获取里程单价列表 method 'get'
const mileageSetApi = '/api/tms/monovalence/mileage/{group}';                                       // 设置里程单价 method 'put'

const priceSettingListApi = '/api/tms/monovalence/priceSetting';                                    // 单价列表 method 'get'
const priceSettingCountApi = '/api/tms/monovalence/priceSetting/count';                             // 单价列表 method 'get'
const priceSettingAddApi = '/api/tms/monovalence/priceSetting';                                     // 单价新增 method 'post'
const priceSettingUpdateApi = '/api/tms/monovalence/priceSetting/{id}';                             // 单价修改 method 'post'
const priceSettingDisabledApi = '/api/tms/monovalence/priceSetting/disabled';                       // 单价禁用 method 'post'
const priceSettingEnabledApi = '/api/tms/monovalence/priceSetting/enable';                          // 单价修改 method 'post'
const priceSettingDeleteApi = '/api/tms/monovalence/priceSetting/{id}';                             // 单价修改 method 'delete'

const mileagePriceApi = '/api/tms/monovalence/sys/mileage';                                         // 单价里程设置 method 'put'
const getMileagePriceApi = '/api/tms/monovalence/sys/mileage';                                         // 单价里程设置 method 'get'
const changeCarPriceApi = '/api/tms/monovalence/sys/changeCar';                                     // 设置交车补贴 method 'get'
const getChangeCarPriceApi = '/api/tms/monovalence/sys/changeCar';                                     // 设置交车补贴 method 'put'
const baselistApi = '/api/tms/base';                                                                // 查询基地信息 method 'get'
const getCarTypeListByIdApi = '/api/tms/car/brand/motorcycle/{id}';                                 // 根据品牌id查询车型列表 method 'get'
const updateGasoLineApi = '/api/tms/monovalence/gasoline/update';                                   // 修改油价信息

// 查询油价设置列表
export const gasolineList = (payload) => fetch.get(gasolineListApi, { params: payload });
// 查询油价设置数量
export const gasolineCount = (payload) => fetch.get(gasolineCountApi, { params: payload });
// 油价单价设置
export const gasolineSet = (payload) => fetch.post(gasolineSetApi, payload);

// 获取里程单价列表
export const mileageList = (payload) => fetch.get(mileageListApi, { params: payload });
// 里程单价设置
export const mileageSet = (payload) => fetch.put(apiFormat(mileageSetApi, payload));

// 查询单价设置列表
export const priceSettingList = (payload) => fetch.get(priceSettingListApi, { params: payload });
// 查询单价设置列表
export const priceSettingCount = (payload) => fetch.get(priceSettingCountApi, { params: payload });
// 单价设置新增
export const priceSettingAdd = (payload) => fetch.post(priceSettingAddApi, payload);
// 单价设置修改
export const priceSettingUpdate = (opt, payload) => fetch.put(apiFormat(priceSettingUpdateApi, opt), payload);
// 单价禁用
export const priceSettingDisabled = (payload) => fetch.put(priceSettingDisabledApi, payload);
// 单价启用
export const priceSettingEnabled = (payload) => fetch.put(priceSettingEnabledApi, payload);
// 单价设置删除
export const priceSettingDelete = (payload) => fetch.post(apiFormat(priceSettingDeleteApi, payload));

// 单价里程设置
export const mileagePriceFun = (payload) => fetch.put(mileagePriceApi, payload);
// 获取单价里程设置
export const getMileagePriceFun = (payload) => fetch.get(getMileagePriceApi);

// 设置交车补贴
export const changeCarPriceFun = (payload) => fetch.put(changeCarPriceApi, payload);
// 获取交车补贴
export const getchangeCarPriceFun = (payload) => fetch.get(getChangeCarPriceApi);

// 查询基地信息
export const baseList = (payload) => fetch.get(baselistApi, { params: payload });

// 查询基地信息
export const getCarTypeListById = (payload) => fetch.get(apiFormat(getCarTypeListByIdApi, payload));

// 修改油价信息
export const updateGasoLine = (payload) => fetch.put(apiFormat2(updateGasoLineApi, payload));
