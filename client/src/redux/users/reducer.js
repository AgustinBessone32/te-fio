import {NEW_USER , LOGIN_USER, GET_CLIENTS, GET_AMOUNT,
         NEW_CLIENT, DELETE_CLIENT , ADD_FIAD, DELETE_FIAD , ADD_CASH, ADD_SEARCH, GET_USER} from './actions'

const initialState = {
    user: null,
    clients: [],
    amount : 0,
    search : ''
}

const userReducer =(state = initialState , action ) => {
    switch(action.type){
        case NEW_USER :{
            return{
                ...state,
                user: action.payload
            }
        }
        case LOGIN_USER:{
            return{
                ...state,
                user: action.payload
            }
        }

        case GET_CLIENTS:{
            return{
                ...state,
                clients : action.payload
            }
        }

        case GET_AMOUNT:{
            return{
                ...state,
                amount : action.payload
            }
        }

        case NEW_CLIENT:{
            return{
                ...state,
                clients :  action.payload
            }
        }

        case DELETE_CLIENT:{
            return{
                ...state,
                clients : action.payload
            }
        }

        case ADD_FIAD:{
            return{
                ...state,
                clients : action.payload
            }
        }

        case DELETE_FIAD:{
            return{
                ...state,
                clients: action.payload
            }
        }

        case ADD_CASH:{
            return{
                ...state,
                clients: action.payload
            }
        }

        case ADD_SEARCH:{
            return{
                ...state,
                search: action.payload
            }
        }

        case GET_USER:{
            return{
                ...state,
                user: action.payload
            }
        }
    
        default:{
            return state
        }
    }
}

export default userReducer