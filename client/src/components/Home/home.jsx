import React,{useEffect} from 'react'
import './home.css'
import {connect} from 'react-redux'
import {getAllClients} from '../../redux/users/actions'
import Clients from '../Clients/clients.jsx'
import { useHistory } from 'react-router'

function Home({getAllClients}){
    let history = useHistory()
    const userL = localStorage.getItem("uss")

    useEffect(() => {
         userL === null ? history.push('/te-fio/') : getAllClients(userL)
    }, [])

    
    
    return(
    <div className='content-all-home'>
         <Clients/>
    </div>)
}

const mapStateToProps = (state) => {
    return{
        clients : state.clients,
        search : state.search
    }
}

export default connect(mapStateToProps , {getAllClients})(Home)