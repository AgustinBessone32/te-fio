import React,{useEffect} from 'react'
import './home.css'
import {connect} from 'react-redux'
import {getAllClients} from '../../redux/users/actions'
import Clients from '../Clients/clients.jsx'
import { useHistory } from 'react-router'

function Home({getAllClients, userR}){
    let history = useHistory()

    useEffect(() => {
        userR === null ? history.push('/') : getAllClients(userR)
    }, [])

    
    
    return(
    <div className='content-all-home'>
         <Clients/>
    </div>)
}

const mapStateToProps = (state) => {
    return{
        clients : state.clients,
        userR: state.user,
        search : state.search
    }
}

export default connect(mapStateToProps , {getAllClients})(Home)