
import {fetch} from './baseService';

let requestPromise;
/**
 * 获取所有省市数据
 */
export function getProvincesAndCities () {
  if (!requestPromise) {
    requestPromise = new Promise((resolve, reject) => {
      tryAtMost(5, resolve, reject);
    });
  }
  return requestPromise;
}

function tryAtMost (maxRetries, resolve, reject) {
  fetch.get('/api/pub/district/provinceAndCity').then(res => {
    resolve(res.data);
  }).catch(err => {
    if (maxRetries > 0) {
      setTimeout(() => tryAtMost(maxRetries - 1, resolve, reject), 500);
    } else {
      reject(err);
    }
  });
}

/**
 * 根据省份、城市ID获取相应的省份、城市信息。返回数组包含两个元素，第1个为省份数据，第2个为城市数据
 * @param number provinceId  省份ID
 * @param number cityId 城市ID
 */
export function resolveProvinceAndCity (provinceId, cityId) {
  return getProvincesAndCities().then(pac => {
    let prov = pac.find(p => p.id === provinceId);
    let city = null;

    if (prov) {
      city = prov.children.find(c => c.id === cityId);
      prov = { ...prov, children: undefined };
    }
    return [prov, city];
  });
}

/**
 * 根据省份、城市名称获取相应的省份、城市信息。返回数组包含两个元素，第1个为省份数据，第2个为城市数据
 * @param number provinceId  省份ID
 * @param number cityId 城市ID
 */
export function getProvinceAndCityId (provinceName, cityName) {
  return getProvincesAndCities().then(pac => {
    let prov = pac.find(p => p.name === provinceName);
    let city = null;

    if (prov) {
      city = prov.children.find(c => c.name === cityName);
      prov = { ...prov, children: undefined };
    }
    return [prov, city];
  });
}

/**
 * 获取所有省份
 */
export function getProvinces () {
  return getProvincesAndCities().then(pac => pac.map(p => {
    return { ...p };
  }));
}

/**
 * 获取某个省份下的城市列表
 * @param number provinceId
 */
export function getCities (provinceId) {
  return getProvincesAndCities().then(pac => pac.find(p => p.id === provinceId ? p.children : []));
}

/**
 * 查询省或市或区县
 * @param number parentId 上级ID，省或直辖市的上级ID为0
 * @param string key 搜索关键字，可不填
 */
export function getDistrict (parentId, key) {
  return fetch.get('/api/pub/district', {params: { parentId, key }}).then(res => res.data);
}
