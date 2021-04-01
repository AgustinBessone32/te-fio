import React,{useEffect} from 'react'
import './home.css'
import {connect} from 'react-redux'
import {getAllClients} from '../../redux/users/actions'
import Clients from '../Clients/clients.jsx'

function Home({getAllClients, search , userR}){

    useEffect(() => {
    getAllClients(userR)
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