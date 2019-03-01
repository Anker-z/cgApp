import Vue from 'vue';
import Vuex from 'vuex';
import { Stats } from 'fs';

Vue.use(Vuex);
const shouldUseTransition = !/transition=none/.test(location.href);
const store = new Vuex.Store({
    state: {
        demoScrollTop: 0,
        isLoading: false,
        router: "",
        direction: shouldUseTransition ? 'forward' : ''
    },
    mutations: {
        updateDemoPosition(state, payload) {
            state.demoScrollTop = payload.top
        },
        updateRouter(state, data) {
            state.router = data
        },
        updateLoadingStatus(state, payload) {
            state.isLoading = payload.isLoading
        },
        updateDirection(state, payload) {
            if (!shouldUseTransition) {
                return
            }
            state.direction = payload.direction
        }
    },
    actions: {
        updateDemoPosition({ commit }, top) {
            commit({ type: 'updateDemoPosition', top: top })
        }
    }
});

export default store