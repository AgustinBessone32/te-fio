import axios from 'axios'
import {URL} from '../../config'

export const NEW_USER = 'NEW_USER'
export const LOGIN_USER = "LOGIN_USER"
export const GET_CLIENTS = "GET_CLIENTS"
export const GET_AMOUNT = "GET_AMOUNT"
export const NEW_CLIENT = "NEW_CLIENT"
export const DELETE_CLIENT = "DELETE_CLIENT"
export const ADD_FIAD = "ADD_FIAD"
export const DELETE_FIAD = "DELETE_FIAD"
export const ADD_CASH = "ADD_CASH"
export const ADD_SEARCH = "ADD_SEARCH"
export const GET_USER = "GET_USER"

export const newUser = (name) => {
    return function(dispatch){
            axios.post(URL + `/api/newUser/${name}`)
            .then(json => dispatch({type: NEW_USER , payload: json.data.user.email}))
            .catch(err => console.log(err))
    }
}

export const addClient = (user , client) => {
    return function(dispatch){
        axios.put(URL + `/api/${user}/newClient/${client}`)
            .then(client => dispatch({type: NEW_CLIENT , payload: client.data.client }))
            .catch(err => console.log(err))
    }
}

export const loginUser = (name) => {
    return function(dispatch){
      axios.get(URL +`/api/getUser/${name}`)
        .then(user => dispatch({type: LOGIN_USER , payload : user.data}))
        .catch(err => console.log(err))
    }
}

export const getAllClients= (user) => {
    return function(dispatch){
        axios.get(URL + `/api/getAllClients/${user}`)
            .then(clients => dispatch({type : GET_CLIENTS , payload: clients.data}))
            .catch(err => console.log(err))
    }
}


export const getAmount = (user , client) => {
    return function(dispatch){
        axios.get(URL + `/api/${user}/getAmount/${client}`)
            .then(amount => dispatch({type : GET_AMOUNT , payload : amount.data.total}))
            .catch(err => console.log(err))
    }
}

export const deleteClient = (user, client) => {
    return function(dispatch){
        axios.delete(URL + `/api/${user}/deleteClient/${client}`)
            .then(clients => dispatch({type: DELETE_CLIENT , payload: clients.data}))
            .catch(err => console.log(err))
    }
}

export const addFiad = (user, client, raz , cash) => {

    return function(dispatch){
        axios.put(URL + `/api/${user}/newFiad/${client}/${raz}/${cash}`)
            .then(fiads => dispatch({type: ADD_FIAD , payload : fiads.data.client}))
            .catch(err => console.log(err))
    }
}  


export const deleteFiad = (user, client ,id) => {

    return function(dispatch){
        axios.delete(URL + `/api/${user}/deleteFiad/${client}/${id}`)
            .then(fiads => dispatch({type: DELETE_FIAD , payload : fiads.data.user}))
            .catch(err => console.log(err))
    }
}

export const addCash = (user,client,cash) =>{
    return function(dispatch){
        axios.put(URL + `/api/${user}/addCash/${client}/${cash}`)
            .then(fiads => dispatch({type: ADD_CASH , payload: fiads.data.user}))
            .catch(err => console.log(err))
    }
}

export const setSearch = (name) => {
    return function(dispatch){
        dispatch({type : ADD_SEARCH , payload : name})
    }
}

export const getUser =(user) =>{
    return function(dispatch){
        axios.get(URL + `/api/getUser/${user}`)
            .then(user => dispatch({type : GET_USER , payload: user.data}))
            .catch(err => console.log(err))
    }
}