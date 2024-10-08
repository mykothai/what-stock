import axios from 'axios'

const instance = axios.create({
    baseURL: process.env.BACKEND_URL,
    withCredentials: true,
})

export default instance
