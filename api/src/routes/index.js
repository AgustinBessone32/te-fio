const {Router} = require('express')
const router = Router()
const User = require('../models/user')

router.get('/', (req,res) => {
    res.status(200).send("todo ok")
})

router.post('/api/newUser/:user', (req,res) => {
    const user = {email : req.params.user}
    
    const newUser = new User(user)
    newUser.save()

    res.status(200).send({message: 'Usuario creado correctamente',
                           user: user})

})

router.get('/api/getUser/:user/', (req,res) => {
    const user = req.params.user

    User.findOne({email:user})
        .then(user => res.status(200).send(user.email))
        .catch(err => res.status(400).send(err))
})

router.get('/api/getAllClients/:user', (req,res) => {
    const user = req.params.user
        
    User.findOne({email : user})
            .then(user => res.status(200).send(user.clients))
            .catch(err => console.log(err))
    
})


router.put('/api/:user/newClient/:client', (req,res) => {
    const user = req.params.user
    const newClient = req.params.client

    User.findOne({email : user})
        .then(user => {
            user.clients.push({name : newClient})
            user.save()
            res.status(200).send({message: 'Cliente agregado exitosamente',
                                  client : user.clients})})
        .catch(err => res.status(400).send({message: 'Error al agregar al cliente',
                                            error : err}))

})

router.put('/api/:user/newFiad/:client/:name/:cash', (req,res)=> {
    const user = req.params.user
    const clientName = req.params.client
    const razon = req.params.name
    const cash = req.params.cash
    let client = [];
    
    User.findOne({email: user})
        .then(user => {
           client =  user.clients.filter(client => client.name === clientName)
           client[0].fiads.push({name : razon, amount: cash , type: 'fiado'})
           user.save()
           res.status(200).send({message: 'Fiado agregado correctamente',
                                                client : user.clients})
        .catch(err => res.status(400).send({message: 'Error al añadir al cliente',
                                                error : err}))
        })  

})

router.get('/api/:user/getFiads/:name', (req,res) => {
    const user = req.params.user
    const clientName = req.params.name
    
    User.findOne({email : user})
    .then(user => {return user.clients })
    .then(clients => clients.filter(client =>client.name === clientName))
    .then(client => {
        res.status(200).send(client[0].fiads)
    })
})


router.put('/api/:user/addCash/:name/:cash', (req,res) => {
    const user = req.params.user
    const clientName = req.params.name
    const amount = req.params.cash

    User.findOne({email : user})
        .then(user => {
            const client = user.clients.filter(client => client.name === clientName)
            client[0].fiads.push({name: 'agrego saldo', amount: amount, type:'recharge'})
            user.save()
            res.status(200).send({message: 'Saldo agregado',
                                  user : user.clients})
        })
        .catch(err => res.status(400).send({message: 'Error al agregar dinero',
                                            error: err}))
})


router.get('/api/:user/getAmount/:name', (req,res) => {
    const user = req.params.user
    const clientName = req.params.name

    User.findOne({email : user})
        .then(user => {
            let total = 0
            const clien = user.clients.filter(client => client.name === clientName )
            clien[0].fiads.forEach(fiad => fiad.type === 'recharge' ? total-=fiad.amount : total+=fiad.amount )
            res.status(200).send({message: 'Saldos obtenidos correctamete',
                                 total: total})
        })
        .catch(err => res.status(400).send({message: 'Error al obtener los saldos',
                                            error : err}))
})

router.delete('/api/:user/deleteFiad/:name/:id', (req,res) => {
    const user = req.params.user
    const idFiad = req.params.id
    const clientName = req.params.name
    
    User.findOne({email : user})
        .then(user => {
            const clien = user.clients.filter(client => client.name === clientName)
            clien[0].fiads= clien[0].fiads.filter(fiad => fiad._id != idFiad)
            user.save()
            res.status(200).send({message: 'Fiado borrado correctamente',
                                  user: user.clients})
        })
        .catch(err => res.status(400).send({message: 'Error al borrar el fiado',
                                            error : err}))
})

router.delete('/api/:user/deleteClient/:name' , (req, res) => {
    const user = req.params.user
    const client = req.params.name
    
    User.findOne({email: user})
        .then(user => {
            user.clients = user.clients.filter(clien => clien.name != client)
            user.save()
            res.status(200).send(user.clients)
        }) 
        .catch(err => res.status(400).send(err))
})

module.exports = router