import React , {useEffect , useState} from 'react'
import './clients.css'
import Client from '../Client/client'
import {connect} from 'react-redux'

function Clients({clients , search}){
    if(search !== '') clients = clients.filter(client => client.name.toLowerCase().includes(search.toLowerCase()))
    
    return(
        <div className='content-all-clients'>
            {
                search !== '' && clients?.length === 0 ?  <p className='msg-clients'>No se encontro 
                ningún cliente con ese nombre</p>
              : 
            
                clients?.length > 0 ? clients.map(cl => 
                    <Client key={cl._id} client={cl}/>)
                    : <p className='msg-clients'>Aún no tienes clientes</p>
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