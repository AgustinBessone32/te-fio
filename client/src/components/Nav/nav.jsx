import React , {useState}  from 'react'
import './nav.css'
import { SiCashapp } from "react-icons/si";
import { AiOutlineUserAdd } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import {GrSearch} from "react-icons/gr"
import Modal from 'react-modal'
import {connect} from 'react-redux'
import {addClient , setSearch} from '../../redux/users/actions'
import { useHistory } from 'react-router';

 
const Nav = ({ addClient , setSearch}) => {
    const [modal , setModal] = useState(false)
    const [newClient , setNewClient] = useState('')
    const userR = localStorage.getItem("uss")
    const history = useHistory()

    function addNewClient(user , client) {
        addClient(client,user)
        setModal(false)
        setNewClient('')
    }


    return(
        <>
            <div className='content-nav'>
                <p className='title-nav'>TE-FIO <SiCashapp /></p>
                <div className='search-nav'>
                    <form>
                        <div className='content-search'>
                            <GrSearch className='icon-search'/>
                            <input type="text" name='fiad' placeholder='Ingrese la persona'
                                onChange={(e) => setSearch(e.target.value)}/>
                        </div>

                    </form>
                </div>
                <div className='content-add-client'>
                            <AiOutlineUserAdd onClick={() => setModal(true)}/>
                            <BiLogOut className='icn-nav' onClick={() => history.push('/')} />
                </div>

            </div>
            <div className='content-modal'>
                <Modal isOpen={modal} className='in-modal'>
                    <h2>Agregar cliente</h2>
                    <h4>Ingrese el nombre del nuevo cliente</h4>
                    <input name='newClient' type='text' onChange={(e) => setNewClient(e.target.value)}></input>
                    <div className='content-buttons'>
                        <button onClick={() =>addNewClient(newClient, userR)} className='btn-modal-agg'>Agregar</button>
                        <button onClick={() => setModal(false)} className='btn-modal-close'>
                            Cerrar</button>
                    </div>
                </Modal>
            </div>
        </>
    )
}


const mapStateToProps = (state) => {
    return{
        userR: state.user,
        clients : state.clients
    }
} 

export default connect(mapStateToProps, {addClient , setSearch})(Nav)