
const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')

const internSchema= new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
    },

    mobile: {
        type: String,
        required: true
    },

    collegeId:{
        type:ObjectId,
        ref:'college'
    },

    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

module.exports=mongoose.model('intern',internSchema)  
