const {Schema , model} = require('mongoose')

const UserSchema = new Schema ({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },

    clients: [
        {
            name: {
                type: String
            },
            cash: {
                type: Number,
                default : 0
            },
            fiads:[
                {
                    name:{
                        type: String,
                    },
                    amount:{
                        type: Number,
                    },
                    type:{
                        type: String
                    },
                    date:{
                        type: Date,
                        default: Date.now
                    }
                }
      
            ]
        }
    ]
 

})


module.exports = model('user', UserSchema)