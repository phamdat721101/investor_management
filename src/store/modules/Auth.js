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
            return httpClient.get(`/investor/1`, payload)
        }
    },
    mutations: {
        SET_INVESTOR(state, payload) {
            state.investor = payload
        }
    }
}