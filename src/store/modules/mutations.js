/**
 *  mutations
 */
import {
  PRIVILEGE_DATA,
  DISTRICT_DATA,
  SET_ACTIVE_NAME,
  SET_OPEN_NAMES,
  LOGIN,
  LOGOUT,
  SET_CURRENT_USER,
  SET_TOKEN,
  SET_SHRINK,
  IS_MGT
} from './mutation-types';

export default {
  [DISTRICT_DATA] (state, districtData) {
    state.districtData = districtData;
  },
  [PRIVILEGE_DATA] (state, privilegesData) {
    state.privilegesData = privilegesData;
  },
  [SET_ACTIVE_NAME] (state, activeName) {
    state.activeName = activeName;
  },
  [SET_OPEN_NAMES] (state, openNames) {
    state.openNames = openNames;
  },
  [LOGIN] (state, currentUser) {
    state.isLogin = true;
    state.currentUser = currentUser;
  },
  [LOGOUT] (state) {
    state.isLogin = false;
    state.currentUser = {};
    state.token = '';
  },
  [SET_CURRENT_USER] (state, currentUser) {
    state.currentUser = currentUser;
  },
  [SET_TOKEN] (state, token) {
    state.token = token;
  },
  [SET_SHRINK] (state, shrink) {
    state.shrink = shrink;
  },
  [IS_MGT] (state, status) {
    state.isMgt = status;
  }
};
