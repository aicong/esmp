/**
 *  全局公共属性
 */
export default {
  districtData: [],   // 省份城市数组
  privilegesData: [], // 角色权限菜单
  activeName: null,  // 激活菜单name
  openNames: [],      // 展开菜单名字
  isLogin: false,    // 是否登录
  currentUser: {},    // 当前登录用户
  token: '',          // 登录令牌
  shrink: false,      // 是否收起菜单
  isMgt: false        // 是否是平台登录
};
