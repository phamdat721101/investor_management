import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    state: {
        Investors: []
    },
    getters: {
        getInvestors(state) {
            return state.Investors
        }
    },
    actions: {
        get({commit}) {
            return httpClient.get(`investor`)
        },
        getById({commit}, idEmployee) {
            return httpClient.get(`/Investors/Investors/${idEmployee}`)
        },
        patch({commit}, payload) {
            return httpClient.patch(`/Investors/Investors/${payload.id_user}`, payload.employee)
        },
        getProfit({commit}, pid){
            return httpClient.get(`profit/${pid}`)
        },
        profit({commit}, payload){
            return httpClient.post(`profit`, payload)
        },
        create({commit}, payload) {
            return httpClient.post(`investor`, payload)
        }
    },
    mutations: {
        SET_Investors(state, payload) {
            state.Investors = payload
        }
    }
}