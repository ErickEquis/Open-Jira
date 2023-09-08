import axios from 'axios'

// Lectura de peticiones HTTP
const entriesApi = axios.create({
    // Prefija la URL para cualquier consulta
    baseURL: '/api'
})

export default entriesApi