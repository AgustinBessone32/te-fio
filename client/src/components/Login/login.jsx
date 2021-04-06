import React ,{useState, useEffect} from 'react'
import './login.css'
import axios from 'axios'
import {URL} from '../../config' 
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {newUser, loginUser, getUser} from '../../redux/users/actions'
import { useToasts } from 'react-toast-notifications'

const Login = ({newUser, userR , loginUser,getUser}) => {
    const [user , setUser] = useState('')
    const [data , setData] = useState(null)
    const history = useHistory()
    const { addToast } = useToasts()
    const [userLogin , setUserLogin] = useState(false)

    
    const login = (name) => {
        loginUser(name)
        localStorage.setItem("uss", name)
        history.push('/te-fio/home')
        addToast('Bienvenid@!!', {
            appearance: 'success',
            autoDismiss: true,
          })
    } 
    
    const obtUser =(name) =>{
        setUserLogin(true)
        axios.get(URL + `/api/getUser/${name}`)
            .then(() => {
                setUserLogin(false)
                addToast('Usuario ya existente', {
                    appearance: 'error',
                    autoDismiss: true,
                  })
                })
            .catch(()=>{
                newUser(name)
                addToast('Usuario registrado correctamente, por favor inicia sesión', {
                    appearance: 'success',
                    autoDismiss: true,
                  })

            })
            
    }
        if(userLogin  && data !== null){

     
    }

    

    return(
        <div className='content-login'>
            <p>Ingrese el nombre de usuario</p>
            <input name='user' onChange={(e) => setUser(e.target.value.toLocaleLowerCase())}></input>
            <button onClick={() => login(user)} className='blue'>Ingresar</button>
            <button onClick={() => obtUser(user)} className='green'>Registrarse</button>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userR: state.user,
    };
  };
  
  export default connect(mapStateToProps, {newUser , loginUser, getUser})(Login);