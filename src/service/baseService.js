/**
 * 描述：基类
 */
import axios from '@/js/libs/http';

export const fetch = axios;

export const apiFormat2 = (url, params) => {
  if (params) {
    let propertys = Object.keys(params);
    url = url + '?';
    propertys.forEach((key, index) => {
      if (params[key]) {
        if (index === propertys.length - 1) {
          url = url + key + '=' + params[key];
        } else {
          url = url + key + '=' + params[key] + '&';
        }
      }
    });
  }
  return url;
};

export const apiFormat = (str, res) => {
  let reg = /\{(\w+?)\}/gi;
  return str.replace(reg, ($0, $1) => {
    return res[$1];
  });
};
