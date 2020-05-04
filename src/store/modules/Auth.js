import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    state: {
        investor: {}
    },
    getters: {
        getEmployee(state) {
            return state.investor;
        }
    },
    actions: {
        login({
            commit
        }, payload) {
            return true
        }
    },
    mutations: {
        SET_INVESTOR(state, payload) {
            state.investor = payload
        }
    }
}