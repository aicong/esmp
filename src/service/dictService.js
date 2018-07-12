import { fetch } from './baseService';

let dictListApi = '/api/pub/dict';

export default {
  getDictList: () => fetch.get(dictListApi)
};
