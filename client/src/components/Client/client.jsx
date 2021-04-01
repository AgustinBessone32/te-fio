import React, { useEffect, useState } from 'react'
import './client.css'
import { MdDelete } from 'react-icons/md';
import { BiAddToQueue } from 'react-icons/bi';
import {connect} from 'react-redux'
import {getAmount , deleteClient , addFiad} from '../../redux/users/actions'
import Modal from 'react-modal'
 
function Client({client , amount , getAmount , userR , deleteClient, addFiad}){
    const [modal , setModal ] = useState(false)
    const [raz , setRaz ] = useState('')
    const [cash , setCash ] = useState(0)

    function type(type) {
        if(type === 'recharge') return 'green'
        else return 'red'
    }

    function addFi(user,client,razon,amount){
        addFiad(user,client,razon,amount)
        setCash(0)
        setRaz('')
        setModal(false)
    }

    useEffect(() => {
        getAmount(userR , client.name)
    },[])

    return(
        <div className='content-client'>
            <h1>{client.name}</h1>
            <h2 className='cash'>Debe ${amount}</h2>
            <h2 className='cash'>Historial de fiados</h2>
            {
                client.fiads.map(fiad => 
                    <div className='content-fiads'>
                        <p className={`fiad ${type(fiad.type)}`}>
                        {fiad.name}</p>
                        <p className={`fiad ${type(fiad.type)}`}>${fiad.amount} <MdDelete className='icn-del'/></p>
                    </div>
                )
            }

            <div className='content-icons'>
                <MdDelete onClick={() => deleteClient(userR,client.name)} className='icn-down'/>
                <BiAddToQueue onClick={() => setModal(true)} className='icn-down'/>
            </div>

            <Modal isOpen={modal} className='in-modal'>
                    <h2>Agregar fiado</h2>
                    <h4>Ingrese el motivo del fiado</h4>
                    <input  type='text' onChange={(e) => setRaz(e.target.value)}></input>
                    <h4>Ingrese el dinero</h4>
                    <input  type='text' onChange={(e) => setCash(e.target.value)}></input>
                    <div className='content-buttons'>
                        <button onClick={() => addFi(userR,client.name,raz,cash)} className='btn-modal-agg'>Agregar</button>
                        <button onClick={() => setModal(false)} className='btn-modal-close'>
                            Cerrar</button>
                    </div>
            </Modal>

        </div>
    )
}

const mapStateToProps = (state)=> {
    return{
        amount: state.amount,
        userR : state.user
    }
}

export default connect(mapStateToProps, {getAmount, deleteClient, addFiad} )(Client)