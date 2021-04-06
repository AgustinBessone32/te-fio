import React ,{useState, useEffect} from 'react'
import './login.css'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
import {newUser, loginUser} from '../../redux/users/actions'

const Login = ({newUser, userR , loginUser}) => {
    const [user , setUser] = useState('')
    const history = useHistory()
    
    const login = (name) => {
        loginUser(name)
        localStorage.setItem("uss", name)
        history.push('/te-fio/home')
    } 
    
    const register = (name) => {
        newUser(name)
    }

    //if(userR !== null) history.push('/home')

    return(
        <div className='content-login'>
            <p>Ingrese el nombre de usuario</p>
            <input name='user' onChange={(e) => setUser(e.target.value)}></input>
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