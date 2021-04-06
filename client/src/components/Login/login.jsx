import React ,{useState, useEffect} from 'react'
import './login.css'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {newUser, loginUser} from '../../redux/users/actions'
import { useToasts } from 'react-toast-notifications'

const Login = ({newUser, userR , loginUser}) => {
    const [user , setUser] = useState('')
    const history = useHistory()
    const { addToast } = useToasts()
    
    const login = (name) => {
        loginUser(name)
        localStorage.setItem("uss", name)
        history.push('/te-fio/home')
    } 
    
    const register = (name) => {
        newUser(name)
        addToast('Registro exitoso! Por favor inicie sesión', {
                appearance: 'success',
                autoDismiss: true,
              })
    }


    return(
        <div className='content-login'>
            <p>Ingrese el nombre de usuario</p>
            <input name='user' onChange={(e) => setUser(e.target.value.toLocaleLowerCase())}></input>
            <button onClick={() => login(user)} className='blue'>Ingresar</button>
            <button onClick={() => register(user)} className='green'>Registrarse</button>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
      userR: state.user,
    };
  };
  
  export default connect(mapStateToProps, {newUser , loginUser})(Login);