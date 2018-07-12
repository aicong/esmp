import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import state from './modules/state';
import mutations from './modules/mutations';
import actions from './modules/actions';

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        app,
        user
    }
});

export default store;
