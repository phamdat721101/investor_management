import httpClient from '@/api/HttpClient'

export default {
    namespaced: true,
    state: {
        Projects: [],        
    },
    getters: {
        getProjects(state) {
            // state.Projects.forEach(Project => {
            //     Project.Investors.forEach(employee => {
            //         Project.all_Investors = (Project.all_Investors === undefined) ?
            //             `${employee.first_name} ${employee.last_name}` :
            //             Project.all_Investors + ` - ${employee.first_name} ${employee.last_name}`
            //     })
            // })
            return state.Projects
        },
        // getTimeEntries(state) {
        //     state.timeEntries.forEach(entry => {
        //         entry.employee.full_name = `${entry.employee.first_name} ${entry.employee.last_name}`
        //     });
        //     return state.timeEntries
        // }
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