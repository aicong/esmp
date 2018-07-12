/**
 *  基础信息 - 基地管理
 */
import { fetch } from '@/service/baseService';

const updateApi = '/api/tms/password';                             // 修改密码 method 'post'

// 修改密码
export const updatePassword = (payload) => fetch.post(updateApi, payload);