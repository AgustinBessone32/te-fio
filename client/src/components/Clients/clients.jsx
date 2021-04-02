import React , {useEffect , useState} from 'react'
import './clients.css'
import Client from '../Client/client'
import {connect} from 'react-redux'

function Clients({clients , search}){
    console.log(clients)
    if(search !== '') clients = clients.filter(client => client.name.includes(search))
    return(
        <div className='content-all-clients'>
            {
             clients?.length > 0 ? clients.map(cl => 
                    <Client key={cl._id} client={cl}/>)
                    : <p className='msg-clients'>Aun no tienes clientes</p>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        clients: state.clients,
        search : state.search
    }
} 

export default connect(mapStateToProps)(Clients)