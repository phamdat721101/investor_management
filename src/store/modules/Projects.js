import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    state: {
        Projects: [],        
    },
    getters: {
        getProjects(state) {            
            return state.Projects
        }        
    },
    actions: {
        get({commit}) {
            return httpClient.get(`project`)
        },
        getById({commit}, idProject) {
            return httpClient.get(`Projects/Projects/${idProject}`)
        },        
        create({commit}, payload) {
            return httpClient.post(`project`, payload)
        },        
        assignEmploye({commit}, payload) {
            return httpClient.post(`Projects/Projects/${payload.idProject}/employee`, {
                Investors: payload.Investors
            })
        }        
    },
    mutations: {
        SET_ProjectS(state, payload) {            
            state.Projects = payload
        }        
    }
}