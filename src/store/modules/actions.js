/**
 *  通用actions
 */
import { DISTRICT_DATA, LOGOUT, SET_CURRENT_USER, PRIVILEGE_DATA } from './mutation-types';
import { provinceAndCity } from '@/service/districtNew';
import { logout, currentUser } from '@/service/login/loginService';
import { menuList } from '@/service/userManage/roleMService';
import dictService from '@/service/dictService';

export default {
  async initDict ({ commit }) {
    let res = await dictService.getDictList();
    commit('initDict', res.data);
  },
  async getDistrictData ({ commit }) {
    const result = await provinceAndCity();
    commit(DISTRICT_DATA, result.data);
  },
  async roleMenu ({ commit }) {
    function getChilderValue (item) {
      if (!item.children) {
        item.value = [];
        item.privileges.map(p => {
          p.title = p.name;
        });
        item.children = item.privileges;
        // item.privileges.forEach(k => {
        //   item.value.push(k.id);
        // });
      } else {
        item.children.forEach(k => {
          getChilderValue(k);
        });
      }
    };
    const result = await menuList();
    result.data.forEach((item, i) => {
      getChilderValue(item);
    });
    commit(PRIVILEGE_DATA, result.data);
  },
  async logout ({ commit }) {
    await logout();
    commit(LOGOUT);
  },
  getCurrentUser ({ commit }) {
    currentUser().then(result => {
      commit(SET_CURRENT_USER, result.data);
    });
  }
};
