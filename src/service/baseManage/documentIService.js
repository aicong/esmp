import { fetch } from '@/service/baseService';

const inquiryApi = '/api/tms/orderreport/list';                       // 查询单据列表
const countApi = '/api/tms/orderreport/list/count';                   // 查询单据数量

// 查询单据列表
export const inquiryList = (opt) => fetch.get(inquiryApi, {params: opt});

// 查询单据列表
export const count = (opt) => fetch.get(countApi, {params: opt});