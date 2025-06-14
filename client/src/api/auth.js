import axios from "./axios.js"

export const registerRequest = user => axios.post(`/register`, user)

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get('/verify')

// Este archivo sirve para exportar funciones que se pueden utilizar en otros archivos, en este caso estamos exportando funciones para realizar peticiones HTTP a nuestro servidor.