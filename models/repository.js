const mongoose = require("mongoose")

//crear una instancia de la clase Schema en una constante
const repositorySchema = new mongoose.Schema({

    title : {
        type        : String,
        required    : true
    },
    url : {
        type        : String,
        required    : true
    },
    description : {
        type        : String,
        required    : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Repository",repositorySchema)