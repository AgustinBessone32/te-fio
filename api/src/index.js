const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
// connect bd

const url = `mongodb+srv://tito:${process.env.PASS}@cluster0.qf6tz.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`


mongoose.connect(url)
    .then(() => console.log("BD conectada"))
    .catch(err => console.log(err))


//setings
app.set('port', process.env.PORT || 4001)

//middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

//routes
app.use(require('./routes/index'))

app.listen(app.get('port'), () => {
    console.log("Corriendo en el 4001")
})