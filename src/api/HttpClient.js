import axios from 'axios'

const httpClient = axios.create({
    baseURL: 'http://localhost:4201/',
    headers: {
        'Content-Type': 'application/json'
    }
})

const getAuthToken = () => localStorage.getItem('token')

const authInterceptor = (config) => {
    config.headers['Authorization'] = getAuthToken()
    return config
}

httpClient.interceptors.request.use(authInterceptor)

export default httpClient
