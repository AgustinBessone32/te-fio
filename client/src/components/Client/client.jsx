import React, { useEffect, useState } from 'react'
import './client.css'
import { MdDelete } from 'react-icons/md';
import { BiAddToQueue , BiPencil } from 'react-icons/bi';
import {connect} from 'react-redux'
import {deleteFiad , deleteClient , addFiad, addCash} from '../../redux/users/actions'
import Modal from 'react-modal'
 
function Client({client, userR , deleteClient, addFiad, deleteFiad, addCash}){
    const [modal , setModal ] = useState(false)
    const [raz , setRaz] = useState('')
    const [cash , setCash] =useState(0)
    const [newFiad , setNewFiad] =useState(false)
    let dinner = 0;
    let fecha ;

    function type(type) {
        if(type === 'recharge') return 'green'
        else return 'red'
    }

    function addFi(user,client,razon,amount){
        addFiad(user,client,razon,amount)
        setCash(0)
        setRaz('')
        setModal(false)
        setNewFiad(false)
    }

    function addMoney(user,client,id){
        addCash(user,client,id)
        setNewFiad(false)
        setCash(0)
        setRaz('')
        setModal(false)
    }
    
    
    client.fiads.map(fiad => {fiad.type === 'fiado' ? dinner+=fiad.amount : dinner-=fiad.amount
        fecha= fiad.date.split("T")
        fecha = fecha[0].split("-")})
 

    return(
        <div className='content-client'>
            <h1>{client.name}</h1>
            <h2 className='cash'>Debe ${dinner}</h2>
            <h2 className='cash'>Historial de fiados</h2>
            {
                client.fiads.map(fiad => 
                    <div className='content-fiads'>
                        <p className={`fiad ${type(fiad.type)}`}>
                        {fiad.name}<br/>{"Fecha: "+fecha[2]+"-"+fecha[1]+"-"+fecha[0]}</p>
                        <p className={`fiad ${type(fiad.type)}`}>${fiad.amount} 
                        <MdDelete onClick={() => deleteFiad(userR, client.name , fiad._id)} className='icn-del'/></p>
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
                    <div className='content-inp'>
                        <BiPencil className='icn-modal'/>
                        <input  type='text' onChange={(e) => setRaz(e.target.value)}></input>
                    </div>
                    <h4>Ingrese el dinero</h4>
                    <div className='content-inp'>
                        <p>$</p>
                        <input  type='text' onChange={(e) => setCash(e.target.value)}></input>
                    </div>
                    <h4>Ingrese el tipo de transaccion</h4>
                    <div className='content-checks'>
                            <div className='content-check'>
                                <input type='checkbox' onClick={() => setNewFiad(!newFiad)}/>
                                <h3>Fiado</h3>
                            </div>
                            <div className='content-check'>
                                <input type='checkbox'/>
                                <h3>Agrega saldo</h3>
                            </div>
                    </div>
                    <div className='content-buttons'>
                        <button onClick={() => newFiad === true ? addFi(userR,client.name,raz,cash) :
                                        addMoney(userR,client.name,cash)} className='btn-modal-agg'>Agregar</button>
                        <button onClick={() => setModal(false)} className='btn-modal-close'>
                            Cerrar</button>
                    </div>
            </Modal>

        </div>
    )
}

const mapStateToProps = (state)=> {
    return{
        userR : state.user
    }
}

export default connect(mapStateToProps, {deleteClient, addFiad, deleteFiad , addCash} )(Client)