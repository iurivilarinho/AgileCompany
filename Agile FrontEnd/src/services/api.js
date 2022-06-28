import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:5000/login",
})

export const createSession = async (usuario, senha) => {
    return api.post('/login', {usuario, senha})
}