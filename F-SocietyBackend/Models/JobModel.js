import mongoose from "mongoose";

    const JobSchema = mongoose.Schema({
        title : String,
        location : String,
        description : String,
        file : String,
        salary : Number

    },{
        timestamps : true 
    })

    module.exports = mongoose.model('Job', JobSchema)