import * as auth from '@/libs/user';

const user = {
  state: {
    token: auth.getUser() ? auth.getUser().token : '',
    name: '',
    roles: [],
    userInfo: auth.getUser()
  },

  getters: {
    user: state => state.userInfo,
    token: state => state.token
  },

  mutations: {
    setToken: (state, token) => {
      state.token = token;
    },
    setName: (state, name) => {
      state.name = name;
    },
    setRoles: (state, roles) => {
      state.roles = roles;
    },
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
    }
  },

  actions: {
    // 登录
    login ({ commit }, userInfo) {
      commit('setName', userInfo.realName);
      commit('setRoles', [userInfo.role]);
      commit('setUserInfo', userInfo);
      commit('setToken', userInfo.token);
      auth.setUser(userInfo);
      return Promise.resolve();
    },

    // 获取用户信息
    getUser ({ commit, state }) {
      return Promise.resolve(state.userInfo);
    },

    // 登出
    LogOut ({ commit, state }) {
      commit('setName', '');
      commit('setRoles', []);
      commit('setUserInfo', null);
      commit('setToken', '');
      return Promise.resolve();
    }
  }
};

export default user;
