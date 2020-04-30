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
            return httpClient.get(`user`)
        },
        getById({commit}, idEmployee) {
            return httpClient.get(`/Investors/Investors/${idEmployee}`)
        },
        patch({commit}, payload) {
            return httpClient.patch(`/Investors/Investors/${payload.id_user}`, payload.employee)
        },
        profit({commit}, payload){
            return httpClient.post(`profit`, payload)
        },
        create({commit}, payload) {
            return httpClient.post(`user`, payload)
        }
    },
    mutations: {
        SET_Investors(state, payload) {
            state.Investors = payload
        }
    }
}